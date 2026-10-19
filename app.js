import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://ggdrcklhyzmacpwctblv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_L-kS8DGmd07cfw-UZdBvSg_G_OWhQUK";

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const COURSE_CODE = "CHUNKS";
const COURSE_FILE = "english_chunks.html";

const $ = id => document.getElementById(id);

let currentProfile = null;


// ==================================================
// LOGIN / CREAR CUENTA
// ==================================================

function setAuthTab(mode) {
  const login = mode === "login";

  $("loginForm").classList.toggle("hidden", !login);
  $("signupForm").classList.toggle("hidden", login);

  $("loginTab").classList.toggle("active", login);
  $("signupTab").classList.toggle("active", !login);
}

$("loginTab").onclick = () => setAuthTab("login");
$("signupTab").onclick = () => setAuthTab("signup");


// ==================================================
// CAMBIAR ENTRE PANTALLAS
// ==================================================

function showOnly(view) {
  ["authView", "pendingView", "portalView"].forEach(id => {
    $(id).classList.add("hidden");
  });

  $(view).classList.remove("hidden");
}


// ==================================================
// OBTENER PERFIL
// ==================================================

async function getProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id,email,display_name,is_admin,is_active")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error leyendo perfil:", error);
    throw error;
  }

  return data;
}


// ==================================================
// CARGAR SESIÓN
// ==================================================

async function loadSession() {
  const {
    data: { session }
  } = await supabase.auth.getSession();

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

  // Usuario todavía no autorizado
  if (!currentProfile.is_active) {
    showOnly("pendingView");

    return;
  }

  // Usuario autorizado
  showOnly("portalView");

  $("roleBadge").textContent =
    currentProfile.is_admin
      ? "Administrador"
      : "Estudiante";

  $("roleBadge").className =
    "status " +
    (
      currentProfile.is_admin
        ? "admin"
        : "active"
    );

  $("welcomeTitle").textContent =
    "Hola, " +
    (
      currentProfile.display_name ||
      currentProfile.email
    );

  $("welcomeEmail").textContent =
    currentProfile.email;

  await renderCourses();

  if (currentProfile.is_admin) {
    $("adminPanel").classList.remove("hidden");

    await loadUsers();
  } else {
    $("adminPanel").classList.add("hidden");
  }
}


// ==================================================
// INICIAR SESIÓN
// ==================================================

$("loginForm").addEventListener(
  "submit",
  async e => {
    e.preventDefault();

    $("loginMsg").textContent = "Entrando...";

    const { error } =
      await supabase.auth.signInWithPassword({
        email: $("loginEmail").value.trim(),
        password: $("loginPassword").value
      });

    if (error) {
      console.error(error);

      $("loginMsg").textContent =
        "Correo o contraseña incorrectos.";

      return;
    }

    $("loginMsg").textContent = "";

    await loadSession();
  }
);


// ==================================================
// CREAR CUENTA
// ==================================================

$("signupForm").addEventListener(
  "submit",
  async e => {
    e.preventDefault();

    $("signupMsg").className = "msg";

    $("signupMsg").textContent =
      "Creando cuenta...";

    const { data, error } =
      await supabase.auth.signUp({
        email: $("signupEmail").value.trim(),

        password: $("signupPassword").value,

        options: {
          data: {
            display_name:
              $("signupName").value.trim()
          }
        }
      });

    if (error) {
      console.error(error);

      $("signupMsg").textContent =
        error.message;

      return;
    }

    $("signupMsg").className =
      "msg ok";

    $("signupMsg").textContent =
      "Cuenta creada. Joan debe activarla y darte acceso al curso.";
  }
);


// ==================================================
// CERRAR SESIÓN
// ==================================================

$("logoutBtn").onclick =
  async () => {
    await supabase.auth.signOut();

    location.reload();
  };


// ==================================================
// MOSTRAR CURSOS
// ==================================================

async function renderCourses() {
  const { data: access, error } =
    await supabase
      .from("course_access")
      .select("course_code")
      .eq(
        "user_id",
        currentProfile.id
      );

  if (error) {
    console.error(
      "Error leyendo acceso:",
      error
    );
  }

  const allowed =
    !error &&
    (access || []).some(
      r =>
        r.course_code ===
        COURSE_CODE
    );

  $("courseGrid").innerHTML = `

    <article class="course-card">

      <span class="status active">
        American English
      </span>

      <h3>
        1000 English Chunks
      </h3>

      <p>
        1,000 chunks, significados,
        ejemplos y flashcards.
      </p>

      ${
        allowed

          ? `
            <button
              class="primary"
              id="openChunks">
              Abrir curso
            </button>
          `

          : `
            <span class="status pending">
              Sin acceso asignado
            </span>
          `
      }

    </article>
  `;

  if (allowed) {
    $("openChunks").onclick =
      openCourse;
  }
}


// ==================================================
// ABRIR CURSO PRIVADO
// ==================================================

async function openCourse() {
  $("courseView")
    .classList
    .remove("hidden");

  $("courseStatus").textContent =
    "Cargando contenido privado...";

  const { data, error } =
    await supabase.storage
      .from("courses")
      .download(COURSE_FILE);

  if (error) {
    console.error(
      "Error descargando curso:",
      error
    );

    $("courseStatus").textContent =
      "No se pudo abrir el curso.";

    return;
  }

  try {
    const htmlText =
      await data.text();

    /*
      IMPORTANTE:
      usamos srcdoc en vez de blob/src.

      Esto obliga al navegador a interpretar
      el contenido como HTML real y evita
      que aparezca todo el código en pantalla.
    */

    const iframe =
      $("courseFrame");

    iframe.removeAttribute("src");

    iframe.srcdoc =
      htmlText;

    $("courseStatus").textContent =
      "Curso cargado";

  } catch (err) {
    console.error(
      "Error preparando curso:",
      err
    );

    $("courseStatus").textContent =
      "Error al preparar el curso.";
  }
}


// ==================================================
// VOLVER AL PORTAL
// ==================================================

$("backToPortal").onclick =
  () => {
    $("courseView")
      .classList
      .add("hidden");

    $("courseFrame").removeAttribute(
      "srcdoc"
    );

    $("courseFrame").src =
      "about:blank";
  };


// ==================================================
// PANEL DE ADMINISTRADOR
// ==================================================

async function loadUsers() {
  const {
    data: profiles,
    error
  } =
    await supabase
      .from("profiles")
      .select(
        "id,email,display_name,is_admin,is_active,created_at"
      )
      .order(
        "created_at",
        {
          ascending: false
        }
      );

  if (error) {
    console.error(
      "Error cargando usuarios:",
      error
    );

    $("usersList").innerHTML =
      "<p>No se pudieron cargar los usuarios.</p>";

    return;
  }

  const {
    data: accessRows,
    error: accessError
  } =
    await supabase
      .from("course_access")
      .select(
        "user_id,course_code"
      );

  if (accessError) {
    console.error(
      "Error cargando accesos:",
      accessError
    );
  }

  const accessSet =
    new Set(
      (accessRows || [])
        .filter(
          x =>
            x.course_code ===
            COURSE_CODE
        )
        .map(
          x =>
            x.user_id
        )
    );

  const students =
    profiles.filter(
      p =>
        !p.is_admin
    );


// ==================================================
// ESTADÍSTICAS
// ==================================================

  $("adminStats").innerHTML = `

    <div class="stat">

      <strong>
        ${students.length}
      </strong>

      <span>
        Estudiantes
      </span>

    </div>


    <div class="stat">

      <strong>
        ${
          students.filter(
            x =>
              x.is_active
          ).length
        }
      </strong>

      <span>
        Activos
      </span>

    </div>


    <div class="stat">

      <strong>
        ${
          students.filter(
            x =>
              accessSet.has(
                x.id
              )
          ).length
        }
      </strong>

      <span>
        Con curso
      </span>

    </div>
  `;


// ==================================================
// LISTA DE USUARIOS
// ==================================================

  $("usersList").innerHTML =

    profiles.map(
      p => `

      <div class="user-row">

        <div class="user-meta">

          <strong>

            ${
              escapeHtml(
                p.display_name ||
                "Sin nombre"
              )
            }

          </strong>

          <span>

            ${
              escapeHtml(
                p.email
              )
            }

          </span>

        </div>


        <div>

          <span
            class="status ${
              p.is_active
                ? "active"
                : "blocked"
            }">

            ${
              p.is_active
                ? "Activo"
                : "Bloqueado"
            }

          </span>

        </div>


        <div>

          ${
            accessSet.has(
              p.id
            )

              ? "✅ English Chunks"

              : "— Sin curso"
          }

        </div>


        <div class="row-actions">

          ${
            p.is_admin

              ? `
                <span class="small">
                  Administrador
                </span>
              `

              : `

                <button

                  data-action="toggle"

                  data-id="${p.id}"

                  data-active="${p.is_active}">

                  ${
                    p.is_active
                      ? "Bloquear"
                      : "Activar"
                  }

                </button>


                <button

                  data-action="course"

                  data-id="${p.id}"

                  data-has="${
                    accessSet.has(
                      p.id
                    )
                  }">

                  ${
                    accessSet.has(
                      p.id
                    )

                      ? "Quitar curso"

                      : "Dar curso"
                  }

                </button>

              `
          }

        </div>

      </div>
    `
    ).join("");


// ==================================================
// BOTONES DEL ADMIN
// ==================================================

  document
    .querySelectorAll(
      "[data-action]"
    )
    .forEach(
      btn => {

        btn.onclick =
          async () => {

            const id =
              btn.dataset.id;


// ==================================================
// ACTIVAR / BLOQUEAR
// ==================================================

            if (
              btn.dataset.action ===
              "toggle"
            ) {

              const next =
                btn.dataset.active !==
                "true";

              const {
                error
              } =
                await supabase
                  .from("profiles")
                  .update({
                    is_active: next
                  })
                  .eq(
                    "id",
                    id
                  );

              if (error) {
                console.error(
                  error
                );
              }
            }


// ==================================================
// DAR / QUITAR CURSO
// ==================================================

            if (
              btn.dataset.action ===
              "course"
            ) {

              const has =
                btn.dataset.has ===
                "true";

              if (has) {

                const {
                  error
                } =
                  await supabase
                    .from(
                      "course_access"
                    )
                    .delete()
                    .eq(
                      "user_id",
                      id
                    )
                    .eq(
                      "course_code",
                      COURSE_CODE
                    );

                if (error) {
                  console.error(
                    error
                  );
                }

              } else {

                const {
                  error
                } =
                  await supabase
                    .from(
                      "course_access"
                    )
                    .insert({
                      user_id: id,
                      course_code:
                        COURSE_CODE
                    });

                if (error) {
                  console.error(
                    error
                  );
                }
              }
            }

            await loadUsers();
          };
      }
    );
}


// ==================================================
// BOTÓN ACTUALIZAR USUARIOS
// ==================================================

$("refreshUsers").onclick =
  loadUsers;


// ==================================================
// PROTEGER TEXTO HTML
// ==================================================

function escapeHtml(s) {
  return String(
    s ?? ""
  ).replace(
    /[&<>"']/g,

    c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[c])
  );
}


// ==================================================
// CAMBIOS DE AUTENTICACIÓN
// ==================================================

supabase.auth.onAuthStateChange(
  (_event, session) => {

    if (!session) {
      currentProfile = null;

      $("logoutBtn")
        .classList
        .add("hidden");

      showOnly(
        "authView"
      );
    }
  }
);


// ==================================================
// INICIAR PORTAL
// ==================================================

await loadSession();
