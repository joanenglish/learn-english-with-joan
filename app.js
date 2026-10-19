import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://ggdrcklhyzmacpwctblv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_L-kS8DGmd07cfw-UZdBvSg_G_OWhQUK";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
const $ = id => document.getElementById(id);

const COURSES = [
  {
    code: "CHUNKS",
    title: "1000 English Chunks",
    description: "1,000 chunks, significados, ejemplos y flashcards.",
    file: "english_chunks.html",
    badge: "American English"
  },
  {
    code: "CONNECTORS",
    title: "English Connectors in Context",
    description: "100 conectores · 1,000 ejemplos · traducción · pronunciación americana · uso real.",
    file: "english_connectors.html",
    badge: "A2–C1"
  }
];

let currentProfile = null;

function setAuthTab(mode) {
  const login = mode === "login";
  $("loginForm").classList.toggle("hidden", !login);
  $("signupForm").classList.toggle("hidden", login);
  $("loginTab").classList.toggle("active", login);
  $("signupTab").classList.toggle("active", !login);
}

$("loginTab").onclick = () => setAuthTab("login");
$("signupTab").onclick = () => setAuthTab("signup");

function showOnly(view) {
  ["authView", "pendingView", "portalView"].forEach(id => $(id).classList.add("hidden"));
  $(view).classList.remove("hidden");
}

async function getProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id,email,display_name,is_admin,is_active")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}

async function loadSession() {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    currentProfile = null;
    $("logoutBtn").classList.add("hidden");
    showOnly("authView");
    return;
  }

  $("logoutBtn").classList.remove("hidden");

  try {
    currentProfile = await getProfile(session.user.id);
  } catch (err) {
    console.error(err);
    await supabase.auth.signOut();
    showOnly("authView");
    return;
  }

  if (!currentProfile.is_active) {
    showOnly("pendingView");
    return;
  }

  showOnly("portalView");

  $("roleBadge").textContent = currentProfile.is_admin ? "Administrador" : "Estudiante";
  $("roleBadge").className = "status " + (currentProfile.is_admin ? "admin" : "active");
  $("welcomeTitle").textContent = "Hola, " + (currentProfile.display_name || currentProfile.email);
  $("welcomeEmail").textContent = currentProfile.email;

  await renderCourses();

  if (currentProfile.is_admin) {
    $("adminPanel").classList.remove("hidden");
    await loadUsers();
  } else {
    $("adminPanel").classList.add("hidden");
  }
}

$("loginForm").addEventListener("submit", async e => {
  e.preventDefault();
  $("loginMsg").textContent = "Entrando...";

  const { error } = await supabase.auth.signInWithPassword({
    email: $("loginEmail").value.trim(),
    password: $("loginPassword").value
  });

  if (error) {
    $("loginMsg").textContent = "Correo o contraseña incorrectos.";
    return;
  }

  $("loginMsg").textContent = "";
  await loadSession();
});

$("signupForm").addEventListener("submit", async e => {
  e.preventDefault();

  $("signupMsg").className = "msg";
  $("signupMsg").textContent = "Creando cuenta...";

  const { error } = await supabase.auth.signUp({
    email: $("signupEmail").value.trim(),
    password: $("signupPassword").value,
    options: {
      data: {
        display_name: $("signupName").value.trim()
      }
    }
  });

  if (error) {
    $("signupMsg").textContent = error.message;
    return;
  }

  $("signupMsg").className = "msg ok";
  $("signupMsg").textContent = "Cuenta creada. Joan debe activarla y darte acceso al curso.";
});

$("logoutBtn").onclick = async () => {
  await supabase.auth.signOut();
  location.reload();
};

async function getMyCourseAccess() {
  const { data, error } = await supabase
    .from("course_access")
    .select("course_code")
    .eq("user_id", currentProfile.id);

  if (error) {
    console.error(error);
    return new Set();
  }

  return new Set((data || []).map(x => x.course_code));
}

async function renderCourses() {
  const accessSet = await getMyCourseAccess();

  $("courseGrid").innerHTML = COURSES.map(course => {
    const allowed = accessSet.has(course.code);

    return `
      <article class="course-card">
        <span class="status active">${escapeHtml(course.badge)}</span>
        <h3>${escapeHtml(course.title)}</h3>
        <p>${escapeHtml(course.description)}</p>
        ${
          allowed
            ? `<button class="primary open-course" data-code="${course.code}">Abrir curso</button>`
            : `<span class="status pending">Sin acceso asignado</span>`
        }
      </article>
    `;
  }).join("");

  document.querySelectorAll(".open-course").forEach(btn => {
    btn.onclick = () => openCourse(btn.dataset.code);
  });
}

async function openCourse(courseCode) {
  const course = COURSES.find(c => c.code === courseCode);
  if (!course) return;

  $("courseView").classList.remove("hidden");
  $("courseStatus").textContent = "Cargando contenido privado...";

  const { data, error } = await supabase.storage
    .from("courses")
    .download(course.file);

  if (error) {
    console.error(error);
    $("courseStatus").textContent = "No se pudo abrir el curso.";
    return;
  }

  try {
    const htmlText = await data.text();

    $("courseFrame").removeAttribute("src");
    $("courseFrame").srcdoc = htmlText;

    const titleNode = document.querySelector(".course-toolbar strong");
    if (titleNode) titleNode.textContent = course.title;

    $("courseStatus").textContent = "Curso cargado";
  } catch (err) {
    console.error(err);
    $("courseStatus").textContent = "Error al preparar el curso.";
  }
}

$("backToPortal").onclick = () => {
  $("courseView").classList.add("hidden");
  $("courseFrame").removeAttribute("srcdoc");
  $("courseFrame").src = "about:blank";
};

async function loadUsers() {
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id,email,display_name,is_admin,is_active,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    $("usersList").innerHTML = "<p>No se pudieron cargar los usuarios.</p>";
    return;
  }

  const { data: accessRows } = await supabase
    .from("course_access")
    .select("user_id,course_code");

  const accessMap = new Map();

  for (const row of accessRows || []) {
    if (!accessMap.has(row.user_id)) accessMap.set(row.user_id, new Set());
    accessMap.get(row.user_id).add(row.course_code);
  }

  const students = profiles.filter(p => !p.is_admin);

  $("adminStats").innerHTML = `
    <div class="stat"><strong>${students.length}</strong><span>Estudiantes</span></div>
    <div class="stat"><strong>${students.filter(x => x.is_active).length}</strong><span>Activos</span></div>
    <div class="stat"><strong>${students.filter(x => (accessMap.get(x.id)?.size || 0) > 0).length}</strong><span>Con cursos</span></div>
  `;

  $("usersList").innerHTML = profiles.map(p => {
    const userCourses = accessMap.get(p.id) || new Set();

    const courseButtons = COURSES.map(course => {
      const has = userCourses.has(course.code);
      return `
        <button
          data-action="course"
          data-id="${p.id}"
          data-code="${course.code}"
          data-has="${has}">
          ${has ? "Quitar" : "Dar"} ${escapeHtml(course.title)}
        </button>
      `;
    }).join("");

    return `
      <div class="user-row">
        <div class="user-meta">
          <strong>${escapeHtml(p.display_name || "Sin nombre")}</strong>
          <span>${escapeHtml(p.email)}</span>
        </div>

        <div>
          <span class="status ${p.is_active ? "active" : "blocked"}">
            ${p.is_active ? "Activo" : "Bloqueado"}
          </span>
        </div>

        <div>
          ${[...userCourses].length ? [...userCourses].map(x => "✅ " + x).join("<br>") : "— Sin curso"}
        </div>

        <div class="row-actions">
          ${
            p.is_admin
              ? '<span class="small">Administrador</span>'
              : `
                <button
                  data-action="toggle"
                  data-id="${p.id}"
                  data-active="${p.is_active}">
                  ${p.is_active ? "Bloquear" : "Activar"}
                </button>
                ${courseButtons}
              `
          }
        </div>
      </div>
    `;
  }).join("");

  document.querySelectorAll("[data-action]").forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;

      if (btn.dataset.action === "toggle") {
        const next = btn.dataset.active !== "true";
        await supabase.from("profiles").update({ is_active: next }).eq("id", id);
      }

      if (btn.dataset.action === "course") {
        const code = btn.dataset.code;
        const has = btn.dataset.has === "true";

        if (has) {
          await supabase
            .from("course_access")
            .delete()
            .eq("user_id", id)
            .eq("course_code", code);
        } else {
          await supabase
            .from("course_access")
            .insert({ user_id: id, course_code: code });
        }
      }

      await loadUsers();
    };
  });
}

$("refreshUsers").onclick = loadUsers;

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[c]));
}

supabase.auth.onAuthStateChange((_event, session) => {
  if (!session) {
    currentProfile = null;
    $("logoutBtn").classList.add("hidden");
    showOnly("authView");
  }
});

await loadSession();
