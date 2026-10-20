import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://ggdrcklhyzmacpwctblv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_L-kS8DGmd07cfw-UZdBvSg_G_OWhQUK";

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const $ = id => document.getElementById(id);

/* ============================================================
   CURSOS
   ============================================================ */

const COURSES = [
  {
    code: "CHUNKS",
    title: "1000 English Chunks",
    shortTitle: "English Chunks",
    description: "1,000 chunks, significados, ejemplos y flashcards.",
    file: "english_chunks.html",
    badge: "American English"
  },
  {
    code: "CONNECTORS",
    title: "English Connectors in Context",
    shortTitle: "English Connectors",
    description: "100 conectores · 1,000 ejemplos · traducción · pronunciación americana · uso real.",
    file: "english_connectors.html",
    badge: "A2–C1"
  },
  {
    code: "COLLOCATIONS",
    title: "1000 English Collocations",
    shortTitle: "English Collocations",
    description: "1,000 collocations · flashcards · ejemplos · pronunciación americana · modo automático.",
    file: "english_collocations.html",
    badge: "American English"
  },
  {
    code: "LISTENING",
    title: "American Listening Lab",
    shortTitle: "Listening Lab",
    description: "7,000 ejercicios de listening organizados por niveles A1, A2, B1 y B2.",
    file: "listening_index.html",
    badge: "A1–B2"
  }
];

const LISTENING_FILES = new Set([
  "listening_index.html",
  "listening_a1_v1.html",
  "listening_a1_v2.html",
  "listening_a2_v1.html",
  "listening_a2_v2.html",
  "listening_b1_v1.html",
  "listening_b1_v2.html",
  "listening_b2_v1.html"
]);

const LISTENING_TITLES = {
  "listening_index.html": "American Listening Lab",
  "listening_a1_v1.html": "American Listening Lab — A1 — Volumen 1",
  "listening_a1_v2.html": "American Listening Lab — A1 — Volumen 2",
  "listening_a2_v1.html": "American Listening Lab — A2 — Volumen 1",
  "listening_a2_v2.html": "American Listening Lab — A2 — Volumen 2",
  "listening_b1_v1.html": "American Listening Lab — B1 — Volumen 1",
  "listening_b1_v2.html": "American Listening Lab — B1 — Volumen 2",
  "listening_b2_v1.html": "American Listening Lab — B2 — Volumen 1"
};

let currentProfile = null;

/* ============================================================
   VISTAS / AUTENTICACIÓN
   ============================================================ */

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
  ["authView", "pendingView", "portalView"].forEach(id => {
    $(id).classList.add("hidden");
  });

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
  } catch (error) {
    console.error(error);

    await supabase.auth.signOut();

    showOnly("authView");

    return;
  }

  if (!currentProfile.is_active) {
    showOnly("pendingView");
    return;
  }

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

/* ============================================================
   LOGIN
   ============================================================ */

$("loginForm").addEventListener(
  "submit",
  async event => {
    event.preventDefault();

    $("loginMsg").textContent =
      "Entrando...";

    const { error } =
      await supabase.auth
        .signInWithPassword({
          email:
            $("loginEmail")
              .value
              .trim(),

          password:
            $("loginPassword")
              .value
        });

    if (error) {
      $("loginMsg").textContent =
        "Correo o contraseña incorrectos.";

      return;
    }

    $("loginMsg").textContent = "";

    await loadSession();
  }
);

/* ============================================================
   REGISTRO
   ============================================================ */

$("signupForm").addEventListener(
  "submit",
  async event => {
    event.preventDefault();

    $("signupMsg").className =
      "msg";

    $("signupMsg").textContent =
      "Creando cuenta...";

    const { error } =
      await supabase.auth
        .signUp({
          email:
            $("signupEmail")
              .value
              .trim(),

          password:
            $("signupPassword")
              .value,

          options: {
            data: {
              display_name:
                $("signupName")
                  .value
                  .trim()
            }
          }
        });

    if (error) {
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

/* ============================================================
   LOGOUT
   ============================================================ */

$("logoutBtn").onclick =
  async () => {
    await supabase.auth
      .signOut();

    location.reload();
  };

/* ============================================================
   ACCESO A CURSOS
   ============================================================ */

async function getMyCourseAccess() {
  const { data, error } =
    await supabase
      .from("course_access")
      .select("course_code")
      .eq(
        "user_id",
        currentProfile.id
      );

  if (error) {
    console.error(error);
    return new Set();
  }

  return new Set(
    (data || [])
      .map(
        item =>
          item.course_code
      )
  );
}

/* ============================================================
   MOSTRAR CURSOS
   ============================================================ */

async function renderCourses() {
  const accessSet =
    await getMyCourseAccess();

  $("courseGrid").innerHTML =
    COURSES.map(course => {
      const allowed =
        accessSet.has(
          course.code
        );

      return `
        <article class="course-card">

          <span class="status active">
            ${escapeHtml(course.badge)}
          </span>

          <h3>
            ${escapeHtml(course.title)}
          </h3>

          <p>
            ${escapeHtml(course.description)}
          </p>

          ${
            allowed
              ? `
                  <button
                    class="primary open-course"
                    data-code="${escapeHtml(course.code)}"
                  >
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
    }).join("");

  document
    .querySelectorAll(
      ".open-course"
    )
    .forEach(button => {
      button.onclick =
        () =>
          openCourse(
            button.dataset.code
          );
    });
}

/* ============================================================
   REVISAR CUENTA ACTIVA
   ============================================================ */

async function ensureCurrentAccountIsActive() {
  const {
    data: freshProfile,
    error
  } =
    await supabase
      .from("profiles")
      .select("is_active")
      .eq(
        "id",
        currentProfile.id
      )
      .single();

  if (
    error ||
    !freshProfile?.is_active
  ) {
    $("courseView")
      .classList
      .add("hidden");

    showOnly(
      "pendingView"
    );

    return false;
  }

  return true;
}

/* ============================================================
   ABRIR CURSO
   ============================================================ */

async function openCourse(courseCode) {
  const course =
    COURSES.find(
      item =>
        item.code === courseCode
    );

  if (!course) {
    return;
  }

  const active =
    await ensureCurrentAccountIsActive();

  if (!active) {
    return;
  }

  $("courseView")
    .classList
    .remove("hidden");

  await loadPrivateCourseFile(
    course.file,
    course.title,
    course.code
  );
}

/* ============================================================
   DESCARGAR ARCHIVO PRIVADO
   ============================================================ */

async function loadPrivateCourseFile(
  fileName,
  titleText,
  courseCode = null
) {
  $("courseStatus").textContent =
    "Cargando contenido privado...";

  const {
    data,
    error
  } =
    await supabase.storage
      .from("courses")
      .download(fileName);

  if (error) {
    console.error(error);

    $("courseStatus").textContent =
      "No se pudo abrir el contenido.";

    return;
  }

  try {
    let htmlText =
      await data.text();

    if (
      courseCode === "LISTENING" ||
      LISTENING_FILES.has(fileName)
    ) {
      htmlText =
        prepareListeningHtml(
          htmlText
        );
    }

    $("courseFrame")
      .removeAttribute("src");

    $("courseFrame").srcdoc =
      htmlText;

    const title =
      document.querySelector(
        ".course-toolbar strong"
      );

    if (title) {
      title.textContent =
        titleText;
    }

    $("courseStatus").textContent =
      "Curso cargado";

  } catch (error) {
    console.error(error);

    $("courseStatus").textContent =
      "Error al preparar el curso.";
  }
}

/* ============================================================
   LISTENING LAB PRIVADO
   ============================================================ */

function prepareListeningHtml(htmlText) {
  const parser =
    new DOMParser();

  const doc =
    parser.parseFromString(
      htmlText,
      "text/html"
    );

  doc
    .querySelectorAll(
      "a[href]"
    )
    .forEach(link => {

      const rawHref =
        (
          link.getAttribute("href") ||
          ""
        )
          .trim()
          .replace(
            /^\.\//,
            ""
          );

      if (
        LISTENING_FILES.has(
          rawHref
        )
      ) {
        link.setAttribute(
          "href",
          "#"
        );

        link.dataset.privateListeningFile =
          rawHref;
      }
    });

  const navigationScript =
    doc.createElement(
      "script"
    );

  navigationScript.textContent = `
    document.addEventListener(
      "click",
      event => {

        const link =
          event.target.closest(
            "a[data-private-listening-file]"
          );

        if (!link) {
          return;
        }

        event.preventDefault();

        parent.postMessage(
          {
            type:
              "OPEN_PRIVATE_LISTENING_FILE",

            file:
              link.dataset.privateListeningFile
          },
          "*"
        );
      }
    );
  `;

  (
    doc.body ||
    doc.documentElement
  )
    .appendChild(
      navigationScript
    );

  return (
    "<!doctype html>\n" +
    doc.documentElement.outerHTML
  );
}

/* ============================================================
   ESCUCHAR CLICS DEL LISTENING
   ============================================================ */

window.addEventListener(
  "message",
  async event => {

    const frame =
      $("courseFrame");

    if (
      !frame ||
      event.source !==
        frame.contentWindow
    ) {
      return;
    }

    const message =
      event.data;

    if (
      !message ||
      message.type !==
        "OPEN_PRIVATE_LISTENING_FILE"
    ) {
      return;
    }

    const fileName =
      String(
        message.file ||
        ""
      );

    if (
      !LISTENING_FILES.has(
        fileName
      )
    ) {
      return;
    }

    const active =
      await ensureCurrentAccountIsActive();

    if (!active) {
      return;
    }

    await loadPrivateCourseFile(
      fileName,
      LISTENING_TITLES[fileName] ||
        "American Listening Lab",
      "LISTENING"
    );
  }
);

/* ============================================================
   VOLVER AL PORTAL
   ============================================================ */

$("backToPortal").onclick =
  () => {

    $("courseView")
      .classList
      .add("hidden");

    $("courseFrame")
      .removeAttribute(
        "srcdoc"
      );

    $("courseFrame").src =
      "about:blank";
  };

/* ============================================================
   PANEL ADMINISTRADOR
   ============================================================ */

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
    console.error(error);

    $("usersList").innerHTML =
      "<p>No se pudieron cargar los estudiantes.</p>";

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
      accessError
    );
  }

  const accessMap =
    new Map();

  for (
    const row
    of accessRows || []
  ) {
    if (
      !accessMap.has(
        row.user_id
      )
    ) {
      accessMap.set(
        row.user_id,
        new Set()
      );
    }

    accessMap
      .get(
        row.user_id
      )
      .add(
        row.course_code
      );
  }

  const students =
    profiles.filter(
      profile =>
        !profile.is_admin
    );

  /* ============================================================
     ESTADÍSTICAS
     ============================================================ */

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
            student =>
              student.is_active
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
            student =>
              !student.is_active
          ).length
        }
      </strong>

      <span>
        Bloqueados
      </span>

    </div>
  `;

  /* ============================================================
     TARJETAS DE USUARIOS
     ============================================================ */

  $("usersList").innerHTML =
    profiles.map(profile => {

      const userCourses =
        accessMap.get(
          profile.id
        ) ||
        new Set();

      const courseSwitches =
        COURSES.map(course => {

          const hasAccess =
            userCourses.has(
              course.code
            );

          return `

            <div class="course-switch-row">

              <div class="course-switch-copy">

                <strong>
                  ${escapeHtml(
                    course.shortTitle
                  )}
                </strong>

                <span>
                  ${
                    hasAccess
                      ? "Acceso permitido"
                      : "Sin acceso"
                  }
                </span>

              </div>

              <label class="switch">

                <input
                  type="checkbox"
                  class="course-access-switch"
                  data-id="${escapeHtml(profile.id)}"
                  data-code="${escapeHtml(course.code)}"
                  ${
                    hasAccess
                      ? "checked"
                      : ""
                  }
                  ${
                    profile.is_admin
                      ? "disabled"
                      : ""
                  }
                >

                <span class="slider"></span>

              </label>

            </div>
          `;

        }).join("");

      return `

        <div class="student-admin-card">

          <div class="student-admin-head">

            <div class="user-meta">

              <strong>
                ${escapeHtml(
                  profile.display_name ||
                  "Sin nombre"
                )}
              </strong>

              <span>
                ${escapeHtml(
                  profile.email
                )}
              </span>

            </div>

            <span
              class="status ${
                profile.is_active
                  ? "active"
                  : "blocked"
              }"
            >
              ${
                profile.is_active
                  ? "Activo"
                  : "Bloqueado"
              }
            </span>

          </div>

          ${
            profile.is_admin

              ? `

                <div class="admin-account-note">

                  Cuenta de administrador

                </div>

              `

              : `

                <div class="student-account-control">

                  <div>

                    <strong>
                      Cuenta del estudiante
                    </strong>

                    <div class="small">

                      ${
                        profile.is_active
                          ? "Puede entrar a la plataforma"
                          : "Cuenta bloqueada"
                      }

                    </div>

                  </div>

                  <label class="switch">

                    <input
                      type="checkbox"
                      class="student-active-switch"
                      data-id="${escapeHtml(profile.id)}"
                      ${
                        profile.is_active
                          ? "checked"
                          : ""
                      }
                    >

                    <span class="slider"></span>

                  </label>

                </div>

                <div class="course-access-list">

                  ${courseSwitches}

                </div>

              `
          }

        </div>
      `;

    }).join("");

  /* ============================================================
     BLOQUEAR / DESBLOQUEAR
     ============================================================ */

  document
    .querySelectorAll(
      ".student-active-switch"
    )
    .forEach(input => {

      input.addEventListener(
        "change",
        async () => {

          const userId =
            input.dataset.id;

          const newStatus =
            input.checked;

          input.disabled =
            true;

          const {
            error
          } =
            await supabase.rpc(
              "set_student_active",
              {
                p_target_user:
                  userId,

                p_active:
                  newStatus
              }
            );

          if (error) {
            console.error(
              error
            );

            input.checked =
              !newStatus;

            input.disabled =
              false;

            alert(
              "No se pudo bloquear o desbloquear la cuenta."
            );

            return;
          }

          input.disabled =
            false;

          await loadUsers();
        }
      );
    });

  /* ============================================================
     DAR / QUITAR ACCESO A CURSOS
     ============================================================ */

  document
    .querySelectorAll(
      ".course-access-switch"
    )
    .forEach(input => {

      input.addEventListener(
        "change",
        async () => {

          const userId =
            input.dataset.id;

          const courseCode =
            input.dataset.code;

          const giveAccess =
            input.checked;

          input.disabled =
            true;

          let error =
            null;

          if (
            giveAccess
          ) {

            const result =
              await supabase
                .from(
                  "course_access"
                )
                .insert({
                  user_id:
                    userId,

                  course_code:
                    courseCode
                });

            error =
              result.error;

          } else {

            const result =
              await supabase
                .from(
                  "course_access"
                )
                .delete()
                .eq(
                  "user_id",
                  userId
                )
                .eq(
                  "course_code",
                  courseCode
                );

            error =
              result.error;
          }

          if (error) {
            console.error(
              error
            );

            input.checked =
              !giveAccess;

            alert(
              "No se pudo cambiar el acceso al curso."
            );
          }

          input.disabled =
            false;

          await loadUsers();
        }
      );
    });
}

/* ============================================================
   BOTÓN ACTUALIZAR
   ============================================================ */

$("refreshUsers").onclick =
  loadUsers;

/* ============================================================
   ESCAPAR HTML
   ============================================================ */

function escapeHtml(value) {

  return String(
    value ?? ""
  ).replace(
    /[&<>"']/g,

    character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[character])
  );
}

/* ============================================================
   CAMBIO DE SESIÓN
   ============================================================ */

supabase.auth
  .onAuthStateChange(
    (_event, session) => {

      if (!session) {

        currentProfile =
          null;

        $("logoutBtn")
          .classList
          .add("hidden");

        showOnly(
          "authView"
        );
      }

    }
  );

/* ============================================================
   REVISAR BLOQUEO
   ============================================================ */

setInterval(

  async () => {

    const {
      data: {
        session
      }
    } =
      await supabase.auth
        .getSession();

    if (!session) {
      return;
    }

    if (
      currentProfile?.is_admin
    ) {
      return;
    }

    const {
      data: profile,
      error
    } =
      await supabase
        .from(
          "profiles"
        )
        .select(
          "is_active"
        )
        .eq(
          "id",
          session.user.id
        )
        .single();

    if (error) {
      return;
    }

    if (
      !profile.is_active
    ) {

      $("courseView")
        .classList
        .add("hidden");

      $("courseFrame")
        .removeAttribute(
          "srcdoc"
        );

      $("courseFrame").src =
        "about:blank";

      showOnly(
        "pendingView"
      );
    }

  },

  5000
);

/* ============================================================
   INICIAR
   ============================================================ */

await loadSession();
