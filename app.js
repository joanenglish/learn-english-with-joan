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
let courseBlobUrl = null;


// ===============================
// LOGIN / REGISTRO
// ===============================

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


// ===============================
// PERFIL
// ===============================

async function getProfile(userId) {

  const { data, error } = await supabase
    .from("profiles")
    .select("id,email,display_name,is_admin,is_active")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}


// ===============================
// SESIÓN
// ===============================

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

    currentProfile = await getProfile(
      session.user.id
    );

  } catch (err) {

    console.error(err);

    await supabase.auth.signOut();

    showOnly("authView");

    return;
  }


  // CUENTA NO AUTORIZADA
  if (!currentProfile.is_active) {

    showOnly("pendingView");

    return;
  }


  // CUENTA AUTORIZADA
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


// ===============================
// INICIAR SESIÓN
// ===============================

$("loginForm").addEventListener(
  "submit",
  async e => {

    e.preventDefault();

    $("loginMsg").textContent =
      "Entrando...";


    const { error } =
      await supabase.auth.signInWithPassword({

        email:
          $("loginEmail").value.trim(),

        password:
          $("loginPassword").value

      });


    $("loginMsg").textContent =
      error
        ? "Correo o contraseña incorrectos."
        : "";


    if (!error) {

      await loadSession();

    }

  }
);


// ===============================
// CREAR CUENTA
// ===============================

$("signupForm").addEventListener(
  "submit",
  async e => {

    e.preventDefault();


    $("signupMsg").className = "msg";

    $("signupMsg").textContent =
      "Creando cuenta...";


    const { data, error } =
      await supabase.auth.signUp({

        email:
          $("signupEmail").value.trim(),

        password:
          $("signupPassword").value,

        options: {

          data: {

            display_name:
              $("signupName").value.trim()

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
      data.session
        ? "Cuenta creada. Joan debe activarla y asignarte el curso."
        : "Cuenta creada. Revisa tu correo si te pide confirmación; luego Joan debe activarla.";

  }
);


// ===============================
// CERRAR SESIÓN
// ===============================

$("logoutBtn").onclick =
  async () => {

    await supabase.auth.signOut();


    if (courseBlobUrl) {

      URL.revokeObjectURL(
        courseBlobUrl
      );

    }


    location.reload();

  };


// ===============================
// CURSOS DEL USUARIO
// ===============================

async function renderCourses() {

  const { data: access, error } =
    await supabase
      .from("course_access")
      .select("course_code")
      .eq(
        "user_id",
        currentProfile.id
      );


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


// ===============================
// ABRIR CURSO PRIVADO
// ===============================

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

    console.error(error);

    $("courseStatus").textContent =
      "No se pudo abrir el curso.";

    return;

  }


  try {

    // Convertimos el archivo descargado
    // explícitamente a HTML.

    const htmlText =
      await data.text();


    const htmlBlob =
      new Blob(

        [htmlText],

        {
          type:
            "text/html;charset=utf-8"
        }

      );


    if (courseBlobUrl) {

      URL.revokeObjectURL(
        courseBlobUrl
      );

    }


    courseBlobUrl =
      URL.createObjectURL(
        htmlBlob
      );


    $("courseFrame").src =
      courseBlobUrl;


    $("courseStatus").textContent =
      "Curso cargado";


  } catch (err) {

    console.error(err);


    $("courseStatus").textContent =
      "Error al preparar el curso.";

  }

}


// ===============================
// VOLVER AL PORTAL
// ===============================

$("backToPortal").onclick =
  () => {

    $("courseView")
      .classList
      .add("hidden");


    $("courseFrame").src =
      "about:blank";

  };


// ===============================
// PANEL ADMINISTRADOR
// ===============================

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
      "<p>No se pudieron cargar los usuarios.</p>";

    return;

  }


  const {
    data: accessRows
  } =
    await supabase
      .from("course_access")
      .select(
        "user_id,course_code"
      );


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


  // ESTADÍSTICAS
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


  // LISTA DE USUARIOS
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


// ===============================
// BOTONES ADMIN
// ===============================

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


            // ACTIVAR / BLOQUEAR
            if (
              btn.dataset.action ===
              "toggle"
            ) {

              const next =
                btn.dataset.active !==
                "true";


              await supabase
                .from("profiles")
                .update({
                  is_active: next
                })
                .eq(
                  "id",
                  id
                );

            }


            // DAR / QUITAR CURSO
            if (
              btn.dataset.action ===
              "course"
            ) {

              const has =
                btn.dataset.has ===
                "true";


              if (has) {

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


              } else {


                await supabase
                  .from(
                    "course_access"
                  )
                  .insert({

                    user_id: id,

                    course_code:
                      COURSE_CODE

                  });

              }

            }


            await loadUsers();

          };

      }
    );

}


// ===============================
// ACTUALIZAR USUARIOS
// ===============================

$("refreshUsers").onclick =
  loadUsers;


// ===============================
// SEGURIDAD HTML
// ===============================

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


// ===============================
// CAMBIOS DE AUTENTICACIÓN
// ===============================

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


// ===============================
// INICIAR PORTAL
// ===============================

await loadSession();
