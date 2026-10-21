import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL =
  "https://ggdrcklhyzmacpwctblv.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_L-kS8DGmd07cfw-UZdBvSg_G_OWhQUK";

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const $ = id =>
  document.getElementById(id);


/* ============================================================
   ESTILOS RESPONSIVE
   ============================================================ */

const responsiveStyle =
  document.createElement("style");

responsiveStyle.textContent = `

  .student-overview-layout {
    width: 100%;
  }

  #dailyGoalCard,
  #motivationCard,
  #courseProgressCard {
    box-sizing: border-box;
  }

  .progress-course-row {
    padding: 12px;
    border-radius: 13px;
    border: 1px solid rgba(148,163,184,.15);
    background: rgba(15,23,42,.18);
    margin-top: 8px;
  }

  .progress-track {
    width: 100%;
    height: 8px;
    border-radius: 999px;
    background: rgba(148,163,184,.15);
    overflow: hidden;
    margin-top: 8px;
  }

  .progress-fill {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      #3b82f6,
      #22c55e
    );
  }

  @media (max-width: 700px) {

    .student-overview-layout {
      display: block !important;
      grid-template-columns: 1fr !important;
      width: 100% !important;
    }

    #dailyGoalCard,
    #motivationCard,
    #courseProgressCard {
      display: block !important;
      width: 100% !important;
      max-width: 100% !important;
      min-width: 0 !important;
      margin: 16px 0 !important;
      padding: 18px !important;
      grid-column: 1 / -1 !important;
      box-sizing: border-box !important;
    }

    #dailyGoalContent,
    #streakContent,
    #rankingContent,
    #courseProgressContent {
      width: 100% !important;
      min-width: 0 !important;
      box-sizing: border-box !important;
    }

    #dailyGoalCard *,
    #motivationCard *,
    #courseProgressCard * {
      max-width: 100%;
      box-sizing: border-box;
    }

    #dailyGoalCard,
    #motivationCard,
    #courseProgressCard {
      font-size: 15px !important;
    }

  }

`;

document.head.appendChild(
  responsiveStyle
);


/* ============================================================
   CONFIGURACIÓN
   ============================================================ */

const DAILY_GOAL_SECONDS =
  20 * 60;

const SAFETY_WINDOW_HOURS =
  24;

const SAFETY_WINDOW_MS =
  SAFETY_WINDOW_HOURS *
  60 *
  60 *
  1000;

const STUDY_HEARTBEAT_MS =
  15000;

const STUDY_IDLE_LIMIT_MS =
  3 * 60 * 1000;


/* ============================================================
   CURSOS
   ============================================================ */

const COURSES = [

  {
    code: "CHUNKS",
    title: "1000 English Chunks",
    shortTitle: "English Chunks",
    description:
      "1,000 chunks, significados, ejemplos y flashcards.",
    file: "english_chunks.html",
    badge: "American English",
    type: "extra"
  },

  {
    code: "CONNECTORS",
    title: "English Connectors in Context",
    shortTitle: "English Connectors",
    description:
      "100 conectores · 1,000 ejemplos · traducción · pronunciación americana · uso real.",
    file: "english_connectors.html",
    badge: "A2–C1",
    type: "extra"
  },

  {
    code: "COLLOCATIONS",
    title: "1000 English Collocations",
    shortTitle: "English Collocations",
    description:
      "1,000 collocations · flashcards · ejemplos · pronunciación americana · modo automático.",
    file: "english_collocations.html",
    badge: "American English",
    type: "extra"
  },

  {
    code: "LISTENING",
    title: "American Listening Lab",
    shortTitle: "Listening Lab",
    description:
      "7,000 ejercicios de listening organizados por niveles A1, A2, B1 y B2.",
    file: "listening_index.html",
    badge: "A1–B2",
    type: "extra"
  },

  {
    code: "IRREGULARS",
    title: "Irregular Verbs — American English",
    shortTitle: "Irregular Verbs",
    description:
      "200 verbos irregulares · base, pasado y participio · audio · ejemplos · traducción · flashcards.",
    file: "english_irregular_verbs.html",
    badge: "American English",
    type: "extra"
  },

  {
    code: "VERBS5000",
    title: "5000 Most Common English Verbs",
    shortTitle: "5000 English Verbs",
    description:
      "5,000 verbos · base · past · past participle · pronunciación americana · Auto Flashcards.",
    file: "5000_most_common_english_verbs.html",
    badge: "American English",
    type: "extra"
  },

  {
    code: "A1",
    title: "A1 — Beginner",
    shortTitle: "A1 — Beginner",
    description:
      "Gramática A1 completa · explicaciones · ejemplos · audio · práctica · Final Review de 120 ejercicios.",
    file: "a1_grammar.html",
    badge: "A1",
    type: "grammar"
  },

  {
    code: "A2",
    title: "A2 — Elementary",
    shortTitle: "A2 — Elementary",
    description:
      "Gramática A2 completa · explicaciones · ejemplos · audio · práctica · Final Review de 110 ejercicios.",
    file: "a2_grammar.html",
    badge: "A2",
    type: "grammar"
  }

];


/* ============================================================
   LISTENING
   ============================================================ */

const LISTENING_FILES =
  new Set([
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

  "listening_index.html":
    "American Listening Lab",

  "listening_a1_v1.html":
    "Listening A1 — Volumen 1",

  "listening_a1_v2.html":
    "Listening A1 — Volumen 2",

  "listening_a2_v1.html":
    "Listening A2 — Volumen 1",

  "listening_a2_v2.html":
    "Listening A2 — Volumen 2",

  "listening_b1_v1.html":
    "Listening B1 — Volumen 1",

  "listening_b1_v2.html":
    "Listening B1 — Volumen 2",

  "listening_b2_v1.html":
    "Listening B2 — Volumen 1"

};


/* ============================================================
   ESTADO GLOBAL
   ============================================================ */

let currentProfile =
  null;

let studySessionId =
  null;

let studyActiveSeconds =
  0;

let studyLastTick =
  Date.now();

let studyLastInteraction =
  Date.now();

let studyCourseCode =
  null;

let studySectionName =
  null;


/* ============================================================
   PROGRESO
   ============================================================ */

let currentCourseCode =
  null;

let currentCourseFile =
  null;

let currentCourseTitle =
  null;

let currentCourseProgress =
  null;

let progressCache =
  new Map();

let pendingProgressUpdate =
  null;

let progressSaveBusy =
  false;


/* ============================================================
   UTILIDADES
   ============================================================ */

function escapeHtml(value) {

  return String(
    value ?? ""
  )
  .replace(
    /[&<>"']/g,
    character =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      }[character])
  );
}


function clampPercent(value) {

  return Math.max(
    0,
    Math.min(
      100,
      Number(value) || 0
    )
  );
}


function formatPercent(value) {

  const number =
    clampPercent(value);

  if (
    Math.abs(
      number -
      Math.round(number)
    ) < 0.05
  ) {

    return `${Math.round(number)}%`;
  }

  return `${number.toFixed(1)}%`;
}


function formatStudyTime(
  totalSeconds
) {

  const seconds =
    Math.max(
      0,
      Number(totalSeconds) || 0
    );

  const hours =
    Math.floor(
      seconds / 3600
    );

  const minutes =
    Math.floor(
      (seconds % 3600) / 60
    );

  if (hours > 0) {

    return `${hours} h ${minutes} min`;
  }

  if (minutes > 0) {

    return `${minutes} min`;
  }

  return `${seconds} s`;
}


function formatGoalMinutes(
  seconds
) {

  const value =
    Math.max(
      0,
      Number(seconds) || 0
    );

  const minutes =
    Math.floor(
      value / 60
    );

  const remainingSeconds =
    Math.floor(
      value % 60
    );

  if (minutes <= 0) {

    return `${remainingSeconds} s`;
  }

  if (
    remainingSeconds === 0
  ) {

    return `${minutes} min`;
  }

  return `${minutes} min ${remainingSeconds} s`;
}


function formatRankingMinutes(
  seconds
) {

  const value =
    Math.max(
      0,
      Number(seconds) || 0
    );

  const minutes =
    Math.floor(
      value / 60
    );

  if (
    minutes < 1 &&
    value > 0
  ) {

    return "< 1 min";
  }

  return `${minutes} min`;
}


function formatRemainingInitialTime(
  milliseconds
) {

  const ms =
    Math.max(
      0,
      milliseconds
    );

  const totalMinutes =
    Math.ceil(
      ms / 60000
    );

  const hours =
    Math.floor(
      totalMinutes / 60
    );

  const minutes =
    totalMinutes % 60;

  if (hours > 0) {

    return `${hours} h ${minutes} min`;
  }

  return `${minutes} min`;
}


function formatDateTime(
  value
) {

  if (!value) {

    return "Sin actividad";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return "Sin actividad";
  }

  return new Intl.DateTimeFormat(
    "es-DO",
    {
      dateStyle: "medium",
      timeStyle: "short"
    }
  ).format(date);
}


function startOfToday() {

  const d =
    new Date();

  d.setHours(
    0,
    0,
    0,
    0
  );

  return d;
}


function startOfLast7Days() {

  const d =
    startOfToday();

  d.setDate(
    d.getDate() - 6
  );

  return d;
}


function localDayKey(
  value
) {

  const d =
    new Date(value);

  return [
    d.getFullYear(),
    String(
      d.getMonth() + 1
    ).padStart(2, "0"),
    String(
      d.getDate()
    ).padStart(2, "0")
  ].join("-");
}


function courseDisplayName(
  code
) {

  if (
    code === "PORTAL"
  ) {

    return "Portal";
  }

  const course =
    COURSES.find(
      item =>
        item.code === code
    );

  return course
    ? course.shortTitle
    : code;
}


/* ============================================================
   FECHAS RD
   ============================================================ */

function getDominicanDateParts(
  date = new Date()
) {

  const formatter =
    new Intl.DateTimeFormat(
      "en-CA",
      {
        timeZone:
          "America/Santo_Domingo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }
    );

  const parts =
    formatter.formatToParts(
      date
    );

  const result = {};

  for (
    const part
    of parts
  ) {

    if (
      part.type === "year" ||
      part.type === "month" ||
      part.type === "day"
    ) {

      result[
        part.type
      ] =
        Number(
          part.value
        );
    }
  }

  return result;
}


function dominicanDateKey(
  date
) {

  const parts =
    getDominicanDateParts(
      date
    );

  return [
    parts.year,
    String(
      parts.month
    ).padStart(2, "0"),
    String(
      parts.day
    ).padStart(2, "0")
  ].join("-");
}


function dominicanDateKeyOffset(
  offsetDays
) {

  const parts =
    getDominicanDateParts();

  const date =
    new Date(
      Date.UTC(
        parts.year,
        parts.month - 1,
        parts.day + offsetDays,
        12
      )
    );

  return [
    date.getUTCFullYear(),
    String(
      date.getUTCMonth() + 1
    ).padStart(2, "0"),
    String(
      date.getUTCDate()
    ).padStart(2, "0")
  ].join("-");
}


function getDominicanWeekdayIndex() {

  const key =
    dominicanDateKeyOffset(
      0
    );

  const [
    year,
    month,
    day
  ] =
    key
      .split("-")
      .map(Number);

  const date =
    new Date(
      Date.UTC(
        year,
        month - 1,
        day,
        12
      )
    );

  return date.getUTCDay();
}


/* ============================================================
   ACTIVIDAD
   ============================================================ */

function markStudyActivity() {

  studyLastInteraction =
    Date.now();
}


[
  "mousedown",
  "mousemove",
  "keydown",
  "touchstart",
  "scroll",
  "click"
]
.forEach(
  eventName => {

    document.addEventListener(
      eventName,
      markStudyActivity,
      {
        passive: true
      }
    );

  }
);


document.addEventListener(
  "visibilitychange",
  () => {

    studyLastTick =
      Date.now();

    if (
      !document.hidden
    ) {

      markStudyActivity();
    }

  }
);


/* ============================================================
   SESIONES DE ESTUDIO
   ============================================================ */

async function closeOldStudySessions() {

  if (
    !currentProfile ||
    currentProfile.is_admin
  ) {

    return;
  }

  const {
    error
  } =
    await supabase
      .from(
        "study_activity"
      )
      .update({
        ended_at:
          new Date()
            .toISOString()
      })
      .eq(
        "user_id",
        currentProfile.id
      )
      .is(
        "ended_at",
        null
      );

  if (error) {

    console.error(
      "No se pudieron cerrar sesiones anteriores:",
      error
    );
  }
}


async function startStudySession(
  courseCode,
  sectionName
) {

  if (
    !currentProfile ||
    currentProfile.is_admin
  ) {

    return;
  }

  await finishStudySession();

  studyCourseCode =
    courseCode;

  studySectionName =
    sectionName;

  studyActiveSeconds =
    0;

  studyLastTick =
    Date.now();

  studyLastInteraction =
    Date.now();

  const {
    data,
    error
  } =
    await supabase
      .from(
        "study_activity"
      )
      .insert({
        user_id:
          currentProfile.id,

        course_code:
          courseCode,

        section_name:
          sectionName,

        active_seconds:
          0
      })
      .select(
        "id"
      )
      .single();

  if (error) {

    console.error(
      "No se pudo iniciar la sesión:",
      error
    );

    studySessionId =
      null;

    return;
  }

  studySessionId =
    data.id;
}


async function saveStudyTime() {

  if (
    !studySessionId ||
    !currentProfile ||
    currentProfile.is_admin
  ) {

    return;
  }

  await supabase
    .from(
      "study_activity"
    )
    .update({
      active_seconds:
        studyActiveSeconds
    })
    .eq(
      "id",
      studySessionId
    )
    .eq(
      "user_id",
      currentProfile.id
    );
}


async function finishStudySession() {

  if (
    !studySessionId ||
    !currentProfile ||
    currentProfile.is_admin
  ) {

    studySessionId =
      null;

    return;
  }

  const sessionToClose =
    studySessionId;

  studySessionId =
    null;

  await supabase
    .from(
      "study_activity"
    )
    .update({
      active_seconds:
        studyActiveSeconds,

      ended_at:
        new Date()
          .toISOString()
    })
    .eq(
      "id",
      sessionToClose
    )
    .eq(
      "user_id",
      currentProfile.id
    );

  studyActiveSeconds =
    0;

  studyCourseCode =
    null;

  studySectionName =
    null;
}


setInterval(
  async () => {

    const now =
      Date.now();

    const elapsedSeconds =
      Math.max(
        0,
        Math.floor(
          (
            now -
            studyLastTick
          ) /
          1000
        )
      );

    studyLastTick =
      now;

    if (
      !studySessionId
    ) {

      return;
    }

    const pageVisible =
      !document.hidden;

    const recentlyActive =
      (
        now -
        studyLastInteraction
      ) <=
      STUDY_IDLE_LIMIT_MS;

    if (
      pageVisible &&
      recentlyActive
    ) {

      studyActiveSeconds +=
        Math.min(
          elapsedSeconds,
          20
        );
    }

    await saveStudyTime();

  },

  STUDY_HEARTBEAT_MS
);


/* ============================================================
   PROGRESO — LEER
   ============================================================ */

async function loadProgressCache() {

  if (
    !currentProfile ||
    currentProfile.is_admin
  ) {

    progressCache =
      new Map();

    return;
  }

  const {
    data,
    error
  } =
    await supabase
      .from(
        "course_progress"
      )
      .select(
        "user_id,course_code,completed_items,total_items,progress_percent,last_section,last_file,last_position,updated_at"
      )
      .eq(
        "user_id",
        currentProfile.id
      );

  if (error) {

    console.error(
      "No se pudo cargar el progreso:",
      error
    );

    return;
  }

  progressCache =
    new Map();

  for (
    const row
    of data || []
  ) {

    progressCache.set(
      row.course_code,
      row
    );
  }
}


async function getCourseProgress(
  courseCode
) {

  if (
    progressCache.has(
      courseCode
    )
  ) {

    return progressCache.get(
      courseCode
    );
  }

  const {
    data,
    error
  } =
    await supabase
      .from(
        "course_progress"
      )
      .select(
        "user_id,course_code,completed_items,total_items,progress_percent,last_section,last_file,last_position,updated_at"
      )
      .eq(
        "user_id",
        currentProfile.id
      )
      .eq(
        "course_code",
        courseCode
      )
      .maybeSingle();

  if (error) {

    console.error(error);

    return null;
  }

  if (data) {

    progressCache.set(
      courseCode,
      data
    );
  }

  return data;
}


/* ============================================================
   PROGRESO — GUARDAR
   ============================================================ */

function queueCourseProgress(
  update
) {

  if (
    !currentProfile ||
    currentProfile.is_admin ||
    !update?.courseCode
  ) {

    return;
  }

  pendingProgressUpdate = {
    ...update
  };
}


async function flushCourseProgress() {

  if (
    progressSaveBusy ||
    !pendingProgressUpdate ||
    !currentProfile ||
    currentProfile.is_admin
  ) {

    return;
  }

  progressSaveBusy =
    true;

  const update =
    pendingProgressUpdate;

  pendingProgressUpdate =
    null;

  try {

    const existing =
      progressCache.get(
        update.courseCode
      ) ||
      await getCourseProgress(
        update.courseCode
      );

    const lastPosition =
      clampPercent(
        update.position
      );

    const reportedItems =
      Math.max(
        0,
        Number(
          update.completedItems
        ) || 0
      );

    const reportedTotal =
      Math.max(
        0,
        Number(
          update.totalItems
        ) || 0
      );

    let calculatedProgress =
      lastPosition;

    if (
      reportedTotal > 0
    ) {

      calculatedProgress =
        clampPercent(
          (
            reportedItems /
            reportedTotal
          ) *
          100
        );
    }

    const previousProgress =
      Number(
        existing
          ?.progress_percent
      ) || 0;

    const previousItems =
      Number(
        existing
          ?.completed_items
      ) || 0;

    const previousTotal =
      Number(
        existing
          ?.total_items
      ) || 0;

    const payload = {

      user_id:
        currentProfile.id,

      course_code:
        update.courseCode,

      completed_items:
        Math.max(
          previousItems,
          reportedItems
        ),

      total_items:
        Math.max(
          previousTotal,
          reportedTotal
        ),

      progress_percent:
        Math.max(
          previousProgress,
          calculatedProgress
        ),

      last_position:
        lastPosition,

      last_section:
        update.section ||
        existing?.last_section ||
        null,

      last_file:
        update.file ||
        existing?.last_file ||
        null,

      updated_at:
        new Date()
          .toISOString()

    };

    const {
      data,
      error
    } =
      await supabase
        .from(
          "course_progress"
        )
        .upsert(
          payload,
          {
            onConflict:
              "user_id,course_code"
          }
        )
        .select()
        .single();

    if (error) {

      console.error(
        "No se pudo guardar progreso:",
        error
      );

      return;
    }

    progressCache.set(
      update.courseCode,
      data
    );

    currentCourseProgress =
      data;

  } finally {

    progressSaveBusy =
      false;
  }
}


setInterval(
  flushCourseProgress,
  5000
);


/* ============================================================
   PANEL CONTINUAR + MI PROGRESO
   ============================================================ */

function ensureCourseProgressCard() {

  if (
    $("courseProgressCard")
  ) {

    return;
  }

  const card =
    document.createElement(
      "section"
    );

  card.id =
    "courseProgressCard";

  card.style.cssText = `
    margin:18px 0 22px;
    padding:20px;
    border-radius:20px;
    border:1px solid rgba(139,92,246,.25);
    background:
      linear-gradient(
        135deg,
        rgba(124,58,237,.10),
        rgba(59,130,246,.07)
      );
  `;

  card.innerHTML = `
    <div id="courseProgressContent">
      Cargando progreso...
    </div>
  `;

  const motivationCard =
    $("motivationCard");

  if (
    motivationCard &&
    motivationCard.parentElement
  ) {

    motivationCard.insertAdjacentElement(
      "afterend",
      card
    );

    return;
  }

  const dailyCard =
    $("dailyGoalCard");

  if (
    dailyCard &&
    dailyCard.parentElement
  ) {

    dailyCard.insertAdjacentElement(
      "afterend",
      card
    );

    return;
  }

  $("portalView")
    ?.prepend(
      card
    );
}


async function loadCourseProgressPanel() {

  if (
    !currentProfile ||
    currentProfile.is_admin
  ) {

    $("courseProgressCard")
      ?.remove();

    return;
  }

  ensureCourseProgressCard();

  await loadProgressCache();

  const accessSet =
    await getMyCourseAccess();

  const allowedCourses =
    COURSES.filter(
      course =>
        accessSet.has(
          course.code
        )
    );

  const rows =
    allowedCourses
      .map(
        course => ({
          course,
          progress:
            progressCache.get(
              course.code
            ) ||
            null
        })
      );

  const latest =
    rows
      .filter(
        item =>
          item.progress
            ?.updated_at
      )
      .sort(
        (a, b) =>
          new Date(
            b.progress.updated_at
          ) -
          new Date(
            a.progress.updated_at
          )
      )[0] ||
    null;

  const container =
    $("courseProgressContent");

  let continueHtml = `

    <div
      style="
        font-size:21px;
        font-weight:900;
      "
    >
      ▶ Continuar donde me quedé
    </div>

  `;

  if (latest) {

    const {
      course,
      progress
    } =
      latest;

    const detail =
      progress.last_section ||
      course.shortTitle;

    let extra =
      formatPercent(
        progress.progress_percent
      );

    if (
      course.code ===
        "VERBS5000" &&
      Number(
        progress.total_items
      ) > 0
    ) {

      extra =
        `${progress.completed_items} / ${progress.total_items}`;
    }

    continueHtml += `

      <div
        style="
          margin-top:12px;
          padding:15px;
          border-radius:14px;
          background:rgba(59,130,246,.10);
          border:1px solid rgba(59,130,246,.20);
        "
      >

        <strong
          style="
            display:block;
            font-size:17px;
          "
        >
          ${escapeHtml(
            course.title
          )}
        </strong>

        <div
          style="
            margin-top:5px;
            opacity:.8;
          "
        >
          📍 ${escapeHtml(
            detail
          )}
        </div>

        <div
          style="
            margin-top:5px;
            font-weight:800;
          "
        >
          Progreso: ${escapeHtml(
            extra
          )}
        </div>

        <button
          id="continueLastCourseBtn"
          class="primary"
          style="
            margin-top:12px;
          "
        >
          ▶ Continuar estudiando
        </button>

      </div>

    `;

  } else {

    continueHtml += `

      <div
        style="
          margin-top:10px;
          opacity:.72;
        "
      >
        Cuando empieces un curso, aquí aparecerá
        el botón para continuar donde estabas.
      </div>

    `;
  }


  const progressRows =
    rows
      .map(
        ({
          course,
          progress
        }) => {

          const percent =
            clampPercent(
              progress
                ?.progress_percent ||
              0
            );

          let progressText =
            formatPercent(
              percent
            );

          if (
            course.code ===
              "VERBS5000" &&
            Number(
              progress
                ?.total_items
            ) > 0
          ) {

            progressText =
              `${progress.completed_items} / ${progress.total_items}`;
          }

          const sectionText =
            progress
              ?.last_section
              ? escapeHtml(
                  progress.last_section
                )
              : "Todavía no iniciado";

          return `

            <div class="progress-course-row">

              <div
                style="
                  display:flex;
                  justify-content:space-between;
                  align-items:center;
                  gap:10px;
                  flex-wrap:wrap;
                "
              >

                <strong>
                  ${escapeHtml(
                    course.shortTitle
                  )}
                </strong>

                <strong>
                  ${escapeHtml(
                    progressText
                  )}
                </strong>

              </div>

              <div class="progress-track">

                <div
                  class="progress-fill"
                  style="
                    width:${percent}%;
                  "
                ></div>

              </div>

              <div
                style="
                  margin-top:7px;
                  font-size:12px;
                  opacity:.72;
                "
              >
                📍 ${sectionText}
              </div>

            </div>

          `;
        }
      )
      .join("");


  container.innerHTML = `

    ${continueHtml}

    <div
      style="
        margin:22px 0 18px;
        border-top:
          1px solid rgba(148,163,184,.18);
      "
    ></div>

    <div
      style="
        font-size:20px;
        font-weight:900;
      "
    >
      📊 Mi progreso
    </div>

    <div
      style="
        margin-top:5px;
        opacity:.78;
      "
    >
      Tu avance se guarda automáticamente.
    </div>

    <div
      style="
        margin-top:12px;
      "
    >
      ${
        progressRows ||
        `
          <div style="opacity:.7;">
            No tienes cursos asignados.
          </div>
        `
      }
    </div>

  `;


  if (
    latest &&
    $("continueLastCourseBtn")
  ) {

    $("continueLastCourseBtn")
      .onclick =
        () => {

          resumeCourse(
            latest.course.code,
            latest.progress
          );

        };
  }
}


/* ============================================================
   META DIARIA
   ============================================================ */

function ensureDailyGoalCard() {

  if (
    $("dailyGoalCard")
  ) {

    return;
  }

  const portalView =
    $("portalView");

  if (!portalView) {

    return;
  }

  const card =
    document.createElement(
      "section"
    );

  card.id =
    "dailyGoalCard";

  card.style.cssText = `
    margin:18px 0 22px;
    padding:20px;
    border-radius:20px;
    border:1px solid rgba(96,165,250,.25);
    background:
      linear-gradient(
        135deg,
        rgba(37,99,235,.13),
        rgba(16,185,129,.08)
      );
  `;

  card.innerHTML = `
    <div
      id="dailyGoalContent"
      class="small"
    >
      Cargando progreso...
    </div>
  `;

  const welcomeArea =
    $("welcomeTitle")
      ?.parentElement;

  if (
    welcomeArea &&
    welcomeArea.parentElement
  ) {

    welcomeArea.parentElement
      .classList
      .add(
        "student-overview-layout"
      );

    welcomeArea.parentElement
      .insertBefore(
        card,
        welcomeArea.nextSibling
      );

  } else {

    portalView.prepend(
      card
    );
  }
}


async function loadDailyGoal() {

  if (
    !currentProfile ||
    currentProfile.is_admin ||
    !currentProfile.is_active
  ) {

    $("dailyGoalCard")
      ?.remove();

    return;
  }

  ensureDailyGoalCard();

  const content =
    $("dailyGoalContent");

  const todayStart =
    new Date();

  todayStart.setHours(
    0,
    0,
    0,
    0
  );

  const last24h =
    new Date(
      Date.now() -
      SAFETY_WINDOW_MS
    );

  const {
    data,
    error
  } =
    await supabase
      .from(
        "study_activity"
      )
      .select(
        "active_seconds,started_at,course_code"
      )
      .eq(
        "user_id",
        currentProfile.id
      )
      .neq(
        "course_code",
        "PORTAL"
      )
      .gte(
        "started_at",
        last24h.toISOString()
      );

  if (error) {

    return;
  }

  let secondsToday =
    0;

  let seconds24h =
    0;

  for (
    const row
    of data || []
  ) {

    const seconds =
      Math.max(
        0,
        Number(
          row.active_seconds
        ) || 0
      );

    const started =
      new Date(
        row.started_at
      );

    seconds24h +=
      seconds;

    if (
      started >=
      todayStart
    ) {

      secondsToday +=
        seconds;
    }
  }

  const todayPercent =
    Math.min(
      100,
      Math.round(
        (
          secondsToday /
          DAILY_GOAL_SECONDS
        ) *
        100
      )
    );

  const safetyPercent =
    Math.min(
      100,
      Math.round(
        (
          seconds24h /
          DAILY_GOAL_SECONDS
        ) *
        100
      )
    );

  const missingToday =
    Math.max(
      0,
      DAILY_GOAL_SECONDS -
      secondsToday
    );

  const missing24h =
    Math.max(
      0,
      DAILY_GOAL_SECONDS -
      seconds24h
    );

  const dailyDone =
    secondsToday >=
    DAILY_GOAL_SECONDS;

  const safe24h =
    seconds24h >=
    DAILY_GOAL_SECONDS;

  let initialPeriod =
    false;

  let initialRemainingMs =
    0;

  if (
    currentProfile.activated_at
  ) {

    const activated =
      new Date(
        currentProfile.activated_at
      );

    const elapsed =
      Date.now() -
      activated.getTime();

    if (
      elapsed <
      SAFETY_WINDOW_MS
    ) {

      initialPeriod =
        true;

      initialRemainingMs =
        SAFETY_WINDOW_MS -
        elapsed;
    }
  }

  let safetyIcon;
  let safetyTitle;
  let safetyMessage;

  if (safe24h) {

    safetyIcon =
      "✅";

    safetyTitle =
      "Cuenta al día";

    safetyMessage =
      "Ya completaste el mínimo de 20 minutos dentro de las últimas 24 horas.";

  } else if (
    initialPeriod
  ) {

    safetyIcon =
      "🟡";

    safetyTitle =
      "Período inicial";

    safetyMessage =
      `Te faltan ${formatGoalMinutes(
        missing24h
      )}. ⏱ ${formatRemainingInitialTime(
        initialRemainingMs
      )} restantes.`;

  } else {

    safetyIcon =
      "⚠️";

    safetyTitle =
      "Riesgo de bloqueo";

    safetyMessage =
      `Te faltan ${formatGoalMinutes(
        missing24h
      )} para volver a estar al día.`;
  }

  content.innerHTML = `

    <div
      style="
        display:flex;
        justify-content:space-between;
        gap:12px;
        flex-wrap:wrap;
      "
    >

      <div>

        <div
          style="
            font-size:20px;
            font-weight:800;
          "
        >
          🎯 Meta de hoy
        </div>

        <div
          style="
            margin-top:4px;
            opacity:.8;
          "
        >
          Estudia al menos 20 minutos cada día.
        </div>

      </div>

      <strong
        style="
          font-size:18px;
          white-space:nowrap;
        "
      >
        ${formatGoalMinutes(
          secondsToday
        )}
        / 20 min
      </strong>

    </div>

    <div
      style="
        margin-top:14px;
        height:12px;
        border-radius:999px;
        background:rgba(148,163,184,.18);
        overflow:hidden;
      "
    >

      <div
        style="
          width:${todayPercent}%;
          height:100%;
          background:
            linear-gradient(
              90deg,
              #3b82f6,
              #22c55e
            );
        "
      ></div>

    </div>

    <div
      style="
        margin-top:10px;
      "
    >

      ${
        dailyDone
          ? `
              <strong>
                ✅ Meta de hoy completada.
              </strong>
            `
          : `
              Te faltan
              <strong>
                ${formatGoalMinutes(
                  missingToday
                )}
              </strong>
              para completar tu meta.
            `
      }

    </div>

    <div
      style="
        margin-top:20px;
        padding-top:18px;
        border-top:
          1px solid rgba(148,163,184,.18);
      "
    >

      <div
        style="
          display:flex;
          justify-content:space-between;
          gap:12px;
          flex-wrap:wrap;
        "
      >

        <strong>
          🛡️ Últimas 24 horas
        </strong>

        <strong>
          ${formatGoalMinutes(
            seconds24h
          )}
          / 20 min
        </strong>

      </div>

      <div
        style="
          margin-top:10px;
          height:9px;
          border-radius:999px;
          background:rgba(148,163,184,.18);
          overflow:hidden;
        "
      >

        <div
          style="
            width:${safetyPercent}%;
            height:100%;
            background:${
              safe24h
                ? "#22c55e"
                : "#f59e0b"
            };
          "
        ></div>

      </div>

      <div
        style="
          margin-top:12px;
          padding:12px 14px;
          border-radius:12px;
          background:${
            safe24h
              ? "rgba(34,197,94,.08)"
              : initialPeriod
                ? "rgba(245,158,11,.08)"
                : "rgba(239,68,68,.08)"
          };
        "
      >

        <strong>
          ${safetyIcon}
          ${safetyTitle}
        </strong>

        <div
          style="
            margin-top:5px;
          "
        >
          ${safetyMessage}
        </div>

      </div>

    </div>

  `;
}


/* ============================================================
   RACHA + RANKING
   ============================================================ */

function ensureMotivationCard() {

  if (
    $("motivationCard")
  ) {

    return;
  }

  const card =
    document.createElement(
      "section"
    );

  card.id =
    "motivationCard";

  card.style.cssText = `
    margin:18px 0 22px;
    padding:20px;
    border-radius:20px;
    border:1px solid rgba(251,191,36,.22);
    background:
      linear-gradient(
        135deg,
        rgba(245,158,11,.08),
        rgba(59,130,246,.08)
      );
  `;

  card.innerHTML = `

    <div id="streakContent">
      Cargando racha...
    </div>

    <div
      style="
        margin:22px 0;
        border-top:
          1px solid rgba(148,163,184,.18);
      "
    ></div>

    <div id="rankingContent">
      Cargando ranking...
    </div>

  `;

  const dailyCard =
    $("dailyGoalCard");

  if (
    dailyCard &&
    dailyCard.parentElement
  ) {

    dailyCard.insertAdjacentElement(
      "afterend",
      card
    );

  } else {

    $("portalView")
      ?.prepend(
        card
      );
  }
}


async function loadStreak() {

  if (
    !currentProfile ||
    currentProfile.is_admin
  ) {

    return;
  }

  ensureMotivationCard();

  const container =
    $("streakContent");

  const since =
    new Date(
      Date.now() -
      (
        120 *
        24 *
        60 *
        60 *
        1000
      )
    );

  const {
    data,
    error
  } =
    await supabase
      .from(
        "study_activity"
      )
      .select(
        "started_at,active_seconds,course_code"
      )
      .eq(
        "user_id",
        currentProfile.id
      )
      .neq(
        "course_code",
        "PORTAL"
      )
      .gte(
        "started_at",
        since.toISOString()
      );

  if (error) {

    return;
  }

  const studiedDays =
    new Set();

  for (
    const row
    of data || []
  ) {

    if (
      Number(
        row.active_seconds
      ) > 0
    ) {

      studiedDays.add(
        dominicanDateKey(
          new Date(
            row.started_at
          )
        )
      );
    }
  }

  const todayKey =
    dominicanDateKeyOffset(
      0
    );

  let streak =
    0;

  let offset =
    studiedDays.has(
      todayKey
    )
      ? 0
      : -1;

  while (
    studiedDays.has(
      dominicanDateKeyOffset(
        offset
      )
    )
  ) {

    streak += 1;
    offset -= 1;
  }

  const weekday =
    getDominicanWeekdayIndex();

  const mondayDistance =
    (
      weekday + 6
    ) % 7;

  const labels =
    [
      "L",
      "M",
      "X",
      "J",
      "V",
      "S",
      "D"
    ];

  let completedThisWeek =
    0;

  const weekHtml =
    labels
      .map(
        (
          label,
          index
        ) => {

          const dayOffset =
            index -
            mondayDistance;

          const key =
            dominicanDateKeyOffset(
              dayOffset
            );

          const studied =
            studiedDays.has(
              key
            );

          if (
            studied &&
            dayOffset <= 0
          ) {

            completedThisWeek += 1;
          }

          const future =
            dayOffset > 0;

          return `

            <div
              style="
                text-align:center;
                min-width:36px;
                flex:1;
              "
            >

              <div
                style="
                  font-size:12px;
                  opacity:.72;
                  margin-bottom:6px;
                "
              >
                ${label}
              </div>

              <div
                style="
                  width:34px;
                  height:34px;
                  margin:0 auto;
                  border-radius:50%;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  background:${
                    studied
                      ? "rgba(34,197,94,.18)"
                      : "rgba(148,163,184,.08)"
                  };
                "
              >
                ${
                  studied
                    ? "✅"
                    : future
                      ? "·"
                      : "—"
                }
              </div>

            </div>

          `;
        }
      )
      .join("");

  container.innerHTML = `

    <div
      style="
        display:flex;
        justify-content:space-between;
        gap:14px;
        flex-wrap:wrap;
      "
    >

      <div>

        <div
          style="
            font-size:20px;
            font-weight:800;
          "
        >
          🔥 Tu racha
        </div>

        <div
          style="
            margin-top:5px;
            opacity:.8;
          "
        >
          Cada día que estudias mantiene tu racha.
        </div>

      </div>

      <div
        style="
          text-align:right;
        "
      >

        <div
          style="
            font-size:28px;
            font-weight:900;
          "
        >
          ${streak}
        </div>

        <div
          style="
            font-size:12px;
            opacity:.75;
          "
        >
          ${
            streak === 1
              ? "día seguido"
              : "días seguidos"
          }
        </div>

      </div>

    </div>

    <div
      style="
        margin-top:18px;
        display:flex;
        gap:4px;
      "
    >
      ${weekHtml}
    </div>

    <div
      style="
        margin-top:12px;
        font-size:13px;
      "
    >
      📅 Esta semana:
      <strong>
        ${completedThisWeek} días
      </strong>
      con estudio.
    </div>

  `;
}


async function loadWeeklyRanking() {

  if (
    !currentProfile ||
    currentProfile.is_admin
  ) {

    return;
  }

  ensureMotivationCard();

  const container =
    $("rankingContent");

  const {
    data,
    error
  } =
    await supabase.rpc(
      "get_weekly_study_ranking"
    );

  if (error) {

    container.innerHTML =
      "No se pudo cargar el ranking.";

    return;
  }

  const ranking =
    (data || [])
      .map(
        (
          row,
          index
        ) => ({
          ...row,
          position:
            index + 1
        })
      );

  const me =
    ranking.find(
      row =>
        row.user_id ===
        currentProfile.id
    );

  const medal =
    position => {

      if (
        position === 1
      ) {

        return "🥇";
      }

      if (
        position === 2
      ) {

        return "🥈";
      }

      if (
        position === 3
      ) {

        return "🥉";
      }

      return `${position}.`;
    };

  const rankingRows =
    ranking
      .slice(
        0,
        10
      )
      .map(
        row => {

          const isMe =
            row.user_id ===
            currentProfile.id;

          return `

            <div
              style="
                display:grid;
                grid-template-columns:
                  42px minmax(0,1fr) auto;
                gap:8px;
                align-items:center;
                padding:11px 10px;
                margin-top:7px;
                border-radius:12px;
                background:${
                  isMe
                    ? "rgba(59,130,246,.15)"
                    : "rgba(15,23,42,.20)"
                };
              "
            >

              <strong>
                ${medal(
                  row.position
                )}
              </strong>

              <div
                style="
                  overflow:hidden;
                  text-overflow:ellipsis;
                  white-space:nowrap;
                "
              >

                ${escapeHtml(
                  row.display_name ||
                  "Estudiante"
                )}

                ${
                  isMe
                    ? `
                        <small>
                          ← Tú
                        </small>
                      `
                    : ""
                }

              </div>

              <strong>
                ${formatRankingMinutes(
                  row.active_seconds
                )}
              </strong>

            </div>

          `;
        }
      )
      .join("");

  container.innerHTML = `

    <div
      style="
        display:flex;
        justify-content:space-between;
        gap:12px;
      "
    >

      <div>

        <div
          style="
            font-size:20px;
            font-weight:800;
          "
        >
          🏆 Ranking semanal
        </div>

        <div
          style="
            margin-top:5px;
            opacity:.8;
          "
        >
          Ranking por minutos de estudio.
        </div>

      </div>

      ${
        me
          ? `
              <strong
                style="
                  font-size:22px;
                "
              >
                #${me.position}
              </strong>
            `
          : ""
      }

    </div>

    <div
      style="
        margin-top:14px;
      "
    >
      ${rankingRows}
    </div>

  `;
}


async function loadMotivationPanel() {

  if (
    !currentProfile ||
    currentProfile.is_admin
  ) {

    return;
  }

  ensureMotivationCard();

  await Promise.all([
    loadStreak(),
    loadWeeklyRanking()
  ]);
}


/* ============================================================
   AUTH
   ============================================================ */

function setAuthTab(
  mode
) {

  const login =
    mode === "login";

  $("loginForm")
    .classList
    .toggle(
      "hidden",
      !login
    );

  $("signupForm")
    .classList
    .toggle(
      "hidden",
      login
    );

  $("loginTab")
    .classList
    .toggle(
      "active",
      login
    );

  $("signupTab")
    .classList
    .toggle(
      "active",
      !login
    );
}


$("loginTab").onclick =
  () =>
    setAuthTab(
      "login"
    );

$("signupTab").onclick =
  () =>
    setAuthTab(
      "signup"
    );


function showOnly(
  view
) {

  [
    "authView",
    "pendingView",
    "portalView"
  ]
  .forEach(
    id => {

      $(id)
        .classList
        .add(
          "hidden"
        );

    }
  );

  $(view)
    .classList
    .remove(
      "hidden"
    );
}


/* ============================================================
   PERFIL
   ============================================================ */

async function getProfile(
  userId
) {

  const {
    data,
    error
  } =
    await supabase
      .from(
        "profiles"
      )
      .select(
        "id,email,display_name,is_admin,is_active,activated_at,auto_blocked,blocked_at,blocked_reason"
      )
      .eq(
        "id",
        userId
      )
      .single();

  if (error) {

    throw error;
  }

  return data;
}


function showInactiveAccount(
  profile
) {

  showOnly(
    "pendingView"
  );

  if (
    !profile?.auto_blocked
  ) {

    return;
  }

  $("pendingView").innerHTML = `

    <div
      class="panel"
      style="
        max-width:720px;
        margin:40px auto;
        text-align:center;
        padding:32px;
      "
    >

      <div
        style="
          font-size:52px;
        "
      >
        🔴
      </div>

      <h2>
        Cuenta bloqueada por inactividad
      </h2>

      <p>
        No completaste al menos
        <strong>20 minutos de estudio activo</strong>
        dentro de las últimas
        <strong>24 horas</strong>.
      </p>

      <p>
        Comunícate con tu profesor para
        recuperar el acceso.
      </p>

    </div>

  `;
}


/* ============================================================
   SESIÓN
   ============================================================ */

async function loadSession() {

  const {
    data: {
      session
    }
  } =
    await supabase.auth
      .getSession();

  if (!session) {

    currentProfile =
      null;

    $("logoutBtn")
      .classList
      .add(
        "hidden"
      );

    showOnly(
      "authView"
    );

    return;
  }

  $("logoutBtn")
    .classList
    .remove(
      "hidden"
    );

  try {

    currentProfile =
      await getProfile(
        session.user.id
      );

  } catch (
    error
  ) {

    await supabase.auth
      .signOut();

    showOnly(
      "authView"
    );

    return;
  }

  if (
    !currentProfile.is_active
  ) {

    showInactiveAccount(
      currentProfile
    );

    return;
  }

  showOnly(
    "portalView"
  );

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

  if (
    currentProfile.is_admin
  ) {

    $("dailyGoalCard")
      ?.remove();

    $("motivationCard")
      ?.remove();

    $("courseProgressCard")
      ?.remove();

    $("adminPanel")
      .classList
      .remove(
        "hidden"
      );

    await loadUsers();

  } else {

    $("adminPanel")
      .classList
      .add(
        "hidden"
      );

    await closeOldStudySessions();

    await loadProgressCache();

    await startStudySession(
      "PORTAL",
      "Portal principal"
    );

    await loadDailyGoal();

    await loadMotivationPanel();

    await loadCourseProgressPanel();
  }
}


/* ============================================================
   LOGIN / REGISTRO
   ============================================================ */

$("loginForm")
  .addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      $("loginMsg").textContent =
        "Entrando...";

      const {
        error
      } =
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

      $("loginMsg").textContent =
        "";

      await loadSession();
    }
  );


$("signupForm")
  .addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      $("signupMsg").textContent =
        "Creando cuenta...";

      const {
        error
      } =
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

      $("signupMsg").textContent =
        "Cuenta creada. Joan debe activarla.";
    }
  );


$("logoutBtn").onclick =
  async () => {

    await flushCourseProgress();

    await finishStudySession();

    await supabase.auth
      .signOut();

    location.reload();
  };


/* ============================================================
   PERMISOS
   ============================================================ */

async function getMyCourseAccess() {

  const {
    data,
    error
  } =
    await supabase
      .from(
        "course_access"
      )
      .select(
        "course_code"
      )
      .eq(
        "user_id",
        currentProfile.id
      );

  if (error) {

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
   CURSOS
   ============================================================ */

function courseCardHtml(
  course,
  accessSet
) {

  const allowed =
    currentProfile?.is_admin ||
    accessSet.has(
      course.code
    );

  return `

    <article class="course-card">

      <span class="status active">
        ${escapeHtml(
          course.badge
        )}
      </span>

      <h3>
        ${escapeHtml(
          course.title
        )}
      </h3>

      <p>
        ${escapeHtml(
          course.description
        )}
      </p>

      ${
        allowed
          ? `
              <button
                class="primary open-course"
                data-code="${course.code}"
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
}


async function renderCourses() {

  const accessSet =
    await getMyCourseAccess();

  const grammarCourses =
    COURSES.filter(
      course =>
        course.type ===
        "grammar"
    );

  const extraCourses =
    COURSES.filter(
      course =>
        course.type !==
        "grammar"
    );

  $("grammarGrid").innerHTML =
    grammarCourses
      .map(
        course =>
          courseCardHtml(
            course,
            accessSet
          )
      )
      .join("");

  $("courseGrid").innerHTML =
    extraCourses
      .map(
        course =>
          courseCardHtml(
            course,
            accessSet
          )
      )
      .join("");

  document
    .querySelectorAll(
      ".open-course"
    )
    .forEach(
      button => {

        button.onclick =
          () =>
            openCourse(
              button.dataset.code
            );

      }
    );
}


/* ============================================================
   ABRIR / CONTINUAR
   ============================================================ */

async function resumeCourse(
  courseCode,
  progress
) {

  await openCourse(
    courseCode,
    {
      resume:
        true,

      savedProgress:
        progress
    }
  );
}


async function openCourse(
  courseCode,
  options = {}
) {

  const course =
    COURSES.find(
      item =>
        item.code ===
        courseCode
    );

  if (!course) {

    return;
  }

  if (
    !currentProfile?.is_admin
  ) {

    const accessSet =
      await getMyCourseAccess();

    if (
      !accessSet.has(
        course.code
      )
    ) {

      alert(
        "No tienes acceso autorizado a este curso."
      );

      return;
    }
  }

  const savedProgress =
    options.savedProgress ||
    await getCourseProgress(
      courseCode
    );

  let fileName =
    course.file;

  if (
    options.resume &&
    courseCode ===
      "LISTENING" &&
    savedProgress
      ?.last_file &&
    LISTENING_FILES.has(
      savedProgress.last_file
    )
  ) {

    fileName =
      savedProgress.last_file;
  }

  currentCourseCode =
    course.code;

  currentCourseFile =
    fileName;

  currentCourseTitle =
    course.title;

  currentCourseProgress =
    savedProgress ||
    null;

  $("courseView")
    .classList
    .remove(
      "hidden"
    );

  const section =
    options.resume &&
    savedProgress
      ?.last_section
      ? savedProgress.last_section
      : course.title;

  await startStudySession(
    course.code,
    section
  );

  await loadPrivateCourseFile(
    fileName,
    course.title,
    course.code,
    options.resume
      ? savedProgress
      : null
  );
}


/* ============================================================
   CARGAR CURSO PRIVADO
   ============================================================ */

async function loadPrivateCourseFile(
  fileName,
  titleText,
  courseCode,
  restoreProgress = null
) {

  $("courseStatus").textContent =
    "Cargando contenido privado...";

  const {
    data,
    error
  } =
    await supabase.storage
      .from(
        "courses"
      )
      .download(
        fileName
      );

  if (error) {

    $("courseStatus").textContent =
      "No se pudo abrir el contenido.";

    return;
  }

  try {

    let htmlText =
      await data.text();

    htmlText =
      preparePrivateCourseHtml(
        htmlText,
        fileName,
        courseCode
      );

    const frame =
      $("courseFrame");

    frame.removeAttribute(
      "src"
    );

    frame.onload =
      () => {

        if (
          restoreProgress
        ) {

          setTimeout(
            () => {

              frame.contentWindow
                ?.postMessage(
                  {
                    type:
                      "RESTORE_COURSE_PROGRESS",

                    position:
                      Number(
                        restoreProgress
                          .last_position
                      ) || 0,

                    section:
                      restoreProgress
                        .last_section ||
                      "",

                    completedItems:
                      Number(
                        restoreProgress
                          .completed_items
                      ) || 0,

                    totalItems:
                      Number(
                        restoreProgress
                          .total_items
                      ) || 0,

                    file:
                      fileName
                  },
                  "*"
                );

            },
            500
          );
        }
      };

    frame.srcdoc =
      htmlText;

    $("courseStatus").textContent =
      restoreProgress
        ? "Continuando donde te quedaste"
        : "Curso cargado";

  } catch (
    error
  ) {

    console.error(error);

    $("courseStatus").textContent =
      "Error al preparar el curso.";
  }
}


/* ============================================================
   INYECTAR SEGUIMIENTO DENTRO DEL CURSO
   ============================================================ */

function preparePrivateCourseHtml(
  htmlText,
  currentFile,
  courseCode
) {

  const parser =
    new DOMParser();

  const doc =
    parser.parseFromString(
      htmlText,
      "text/html"
    );


  if (
    LISTENING_FILES.has(
      currentFile
    )
  ) {

    doc
      .querySelectorAll(
        "a[href]"
      )
      .forEach(
        link => {

          const originalHref =
            (
              link.getAttribute(
                "href"
              ) || ""
            )
            .trim();

          const cleanHref =
            originalHref
              .split("?")[0]
              .split("#")[0]
              .replace(
                /^\.\//,
                ""
              );

          const fileName =
            cleanHref
              .split("/")
              .pop();

          if (
            !LISTENING_FILES.has(
              fileName
            )
          ) {

            return;
          }

          link.setAttribute(
            "href",
            "#"
          );

          link.setAttribute(
            "data-private-listening-file",
            fileName
          );

        }
      );
  }


  const trackerScript =
    doc.createElement(
      "script"
    );

  const safeFile =
    JSON.stringify(
      currentFile
    );

  const safeCode =
    JSON.stringify(
      courseCode
    );

  trackerScript.textContent = `

    (function () {

      const CURRENT_FILE =
        ${safeFile};

      const COURSE_CODE =
        ${safeCode};

      let progressTimer =
        null;


      function normalizeText(
        value
      ) {

        return String(
          value || ""
        )
        .replace(
          /\\\\s+/g,
          " "
        )
        .trim()
        .toLowerCase();
      }


      function cleanText(
        element
      ) {

        return String(
          element?.textContent ||
          ""
        )
        .replace(
          /\\\\s+/g,
          " "
        )
        .trim()
        .slice(
          0,
          180
        );
      }


      function notifyActivity() {

        parent.postMessage(
          {
            type:
              "STUDY_ACTIVITY_PING"
          },
          "*"
        );
      }


      /* ======================================================
         BUSCAR LA LECCIÓN PRINCIPAL ACTUAL

         Prioridad:
         1. details.topic > summary
         2. details > summary
         3. h2 / h3
         4. otros headings
         ====================================================== */

      function getLessonCandidates() {

        const preferred =
          Array.from(
            document.querySelectorAll(
              "details.topic > summary"
            )
          );

        if (
          preferred.length
        ) {

          return preferred;
        }


        const details =
          Array.from(
            document.querySelectorAll(
              "details > summary"
            )
          );

        if (
          details.length
        ) {

          return details;
        }


        const mainHeadings =
          Array.from(
            document.querySelectorAll(
              "h2,h3"
            )
          );

        if (
          mainHeadings.length
        ) {

          return mainHeadings;
        }


        return Array.from(
          document.querySelectorAll(
            "h1,h2,h3,h4,h5,h6"
          )
        );
      }


      function findCurrentSection() {

        const candidates =
          getLessonCandidates();

        if (
          !candidates.length
        ) {

          return "";
        }


        let current =
          "";


        for (
          const element
          of candidates
        ) {

          const rect =
            element.getBoundingClientRect();


          /*
            Usamos aproximadamente 180 px desde
            arriba porque el estudiante puede tener
            una barra/header visible.
          */

          if (
            rect.top <= 180
          ) {

            const text =
              cleanText(
                element
              );


            if (text) {

              current =
                text;
            }

          } else {

            break;
          }
        }


        /*
          Si todavía estamos antes de la primera lección,
          usamos la primera.
        */

        if (
          !current &&
          candidates[0]
        ) {

          current =
            cleanText(
              candidates[0]
            );
        }


        return current;
      }


      /* ======================================================
         ABRIR DETAILS PADRES
         ====================================================== */

      function openParentDetails(
        element
      ) {

        let details =
          element.closest(
            "details"
          );


        while (
          details
        ) {

          details.open =
            true;


          details =
            details.parentElement
              ?.closest(
                "details"
              ) ||
            null;
        }
      }


      /* ======================================================
         ENCONTRAR UNA LECCIÓN GUARDADA
         ====================================================== */

      function findSavedLesson(
        savedSection
      ) {

        const target =
          normalizeText(
            savedSection
          );


        if (
          !target
        ) {

          return null;
        }


        const selectors = [

          "details.topic > summary",

          "details > summary",

          "h2",

          "h3",

          "h4",

          "h1",

          "h5",

          "h6"

        ];


        const candidates =
          Array.from(
            document.querySelectorAll(
              selectors.join(",")
            )
          );


        /*
          Primero buscamos coincidencia exacta.
        */

        let match =
          candidates.find(
            element =>
              normalizeText(
                cleanText(
                  element
                )
              ) ===
              target
          );


        if (
          match
        ) {

          return match;
        }


        /*
          Si el título guardado tiene números,
          iconos o pequeñas diferencias,
          intentamos coincidencia parcial.
        */

        match =
          candidates.find(
            element => {

              const text =
                normalizeText(
                  cleanText(
                    element
                  )
                );


              return (
                text &&
                (
                  text.includes(
                    target
                  ) ||
                  target.includes(
                    text
                  )
                )
              );
            }
          );


        return match ||
          null;
      }


      /* ======================================================
         IR A LECCIÓN EXACTA
         ====================================================== */

      function restoreExactLesson(
        savedSection
      ) {

        const lesson =
          findSavedLesson(
            savedSection
          );


        if (
          !lesson
        ) {

          return false;
        }


        openParentDetails(
          lesson
        );


        /*
          Si la propia lección es un summary,
          también abrimos SU details.
        */

        if (
          lesson.tagName ===
          "SUMMARY"
        ) {

          const ownDetails =
            lesson.parentElement;


          if (
            ownDetails?.tagName ===
            "DETAILS"
          ) {

            ownDetails.open =
              true;
          }
        }


        setTimeout(
          function () {

            lesson.scrollIntoView(
              {
                behavior:
                  "auto",

                block:
                  "start"
              }
            );


            /*
              Dejamos un poco de espacio arriba
              para que no quede tapado por header.
            */

            window.scrollBy(
              0,
              -90
            );

          },
          250
        );


        return true;
      }


      /* ======================================================
         ENVIAR PROGRESO
         ====================================================== */

      function sendProgress() {

        const root =
          document.scrollingElement ||
          document.documentElement;


        const maxScroll =
          Math.max(
            0,
            root.scrollHeight -
            window.innerHeight
          );


        let position =
          maxScroll > 0
            ? (
                root.scrollTop /
                maxScroll
              ) * 100
            : 0;


        let completedItems =
          0;


        let totalItems =
          0;


        let section =
          findCurrentSection();


        /* ====================================================
           5000 VERBS
           ==================================================== */

        if (
          COURSE_CODE ===
          "VERBS5000"
        ) {

          try {

            if (
              typeof index !==
              "undefined"
            ) {

              completedItems =
                Number(index) + 1;

            } else {

              completedItems =
                Number(
                  localStorage.getItem(
                    "lewjoan_verbs5000_index"
                  ) || 0
                ) + 1;
            }

          } catch (
            error
          ) {

            completedItems =
              Number(
                localStorage.getItem(
                  "lewjoan_verbs5000_index"
                ) || 0
              ) + 1;
          }


          totalItems =
            5000;


          completedItems =
            Math.max(
              1,
              Math.min(
                5000,
                completedItems
              )
            );


          position =
            (
              completedItems /
              totalItems
            ) * 100;


          section =
            "Verbo " +
            completedItems +
            " / 5000";
        }


        parent.postMessage(
          {
            type:
              "COURSE_PROGRESS_UPDATE",

            courseCode:
              COURSE_CODE,

            file:
              CURRENT_FILE,

            position:
              Math.max(
                0,
                Math.min(
                  100,
                  position
                )
              ),

            section:
              section,

            completedItems:
              completedItems,

            totalItems:
              totalItems
          },
          "*"
        );
      }


      function scheduleProgress() {

        notifyActivity();


        clearTimeout(
          progressTimer
        );


        progressTimer =
          setTimeout(
            sendProgress,
            500
          );
      }


      [
        "mousedown",
        "mousemove",
        "keydown",
        "touchstart",
        "scroll",
        "click"
      ]
      .forEach(
        function (
          eventName
        ) {

          document.addEventListener(
            eventName,
            scheduleProgress,
            {
              passive: true
            }
          );

        }
      );


      /*
        Cuando el estudiante abre/cierra una lección,
        guardamos inmediatamente el nombre.
      */

      document.addEventListener(
        "toggle",
        function () {

          setTimeout(
            sendProgress,
            250
          );

        },
        true
      );


      setInterval(
        sendProgress,
        5000
      );


      window.addEventListener(
        "load",
        function () {

          setTimeout(
            sendProgress,
            700
          );

        }
      );


      /* ======================================================
         RESTAURAR PROGRESO
         ====================================================== */

      window.addEventListener(
        "message",
        function (event) {

          const message =
            event.data;


          if (
            !message ||
            message.type !==
              "RESTORE_COURSE_PROGRESS"
          ) {

            return;
          }


          /* ==================================================
             5000 VERBS
             ================================================== */

          if (
            COURSE_CODE ===
            "VERBS5000" &&
            Number(
              message.completedItems
            ) > 0
          ) {

            const targetIndex =
              Math.max(
                0,
                Math.min(
                  4999,
                  Number(
                    message.completedItems
                  ) - 1
                )
              );


            try {

              localStorage.setItem(
                "lewjoan_verbs5000_index",
                targetIndex
              );


              if (
                typeof index !==
                "undefined"
              ) {

                index =
                  targetIndex;


                if (
                  typeof render ===
                  "function"
                ) {

                  render();
                }
              }

            } catch (
              error
            ) {}


            return;
          }


          /*
            1. PRIMERO intentamos encontrar
               la lección exacta.
          */

          const exactRestored =
            restoreExactLesson(
              message.section ||
              ""
            );


          if (
            exactRestored
          ) {

            return;
          }


          /*
            2. Si no encontramos el título exacto,
               usamos la posición porcentual.
          */

          const position =
            Math.max(
              0,
              Math.min(
                100,
                Number(
                  message.position
                ) || 0
              )
            );


          setTimeout(
            function () {

              const root =
                document.scrollingElement ||
                document.documentElement;


              const maxScroll =
                Math.max(
                  0,
                  root.scrollHeight -
                  window.innerHeight
                );


              window.scrollTo(
                0,
                maxScroll *
                (
                  position /
                  100
                )
              );

            },
            350
          );

        }
      );


      /* ======================================================
         LISTENING PRIVADO
         ====================================================== */

      document.addEventListener(
        "click",
        function (event) {

          const link =
            event.target.closest(
              "a[data-private-listening-file]"
            );


          if (!link) {

            return;
          }


          event.preventDefault();

          event.stopPropagation();


          sendProgress();


          parent.postMessage(
            {
              type:
                "OPEN_PRIVATE_LISTENING_FILE",

              file:
                link.getAttribute(
                  "data-private-listening-file"
                )
            },
            "*"
          );

        },
        true
      );

    })();

  `;

  (
    doc.body ||
    doc.documentElement
  )
  .appendChild(
    trackerScript
  );

  return (
    "<!doctype html>\n" +
    doc.documentElement.outerHTML
  );
}


/* ============================================================
   MENSAJES DESDE CURSOS
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

    if (!message) {

      return;
    }


    if (
      message.type ===
      "STUDY_ACTIVITY_PING"
    ) {

      markStudyActivity();

      return;
    }


    if (
      message.type ===
      "COURSE_PROGRESS_UPDATE"
    ) {

      markStudyActivity();

      if (
        currentCourseCode &&
        message.courseCode ===
          currentCourseCode
      ) {

        queueCourseProgress({

          courseCode:
            currentCourseCode,

          file:
            message.file ||
            currentCourseFile,

          position:
            Number(
              message.position
            ) || 0,

          section:
            message.section ||
            currentCourseTitle,

          completedItems:
            Number(
              message.completedItems
            ) || 0,

          totalItems:
            Number(
              message.totalItems
            ) || 0

        });
      }

      return;
    }


    if (
      message.type !==
      "OPEN_PRIVATE_LISTENING_FILE"
    ) {

      return;
    }

    const fileName =
      String(
        message.file || ""
      );

    if (
      !LISTENING_FILES.has(
        fileName
      )
    ) {

      return;
    }

    await flushCourseProgress();

    currentCourseCode =
      "LISTENING";

    currentCourseFile =
      fileName;

    currentCourseTitle =
      LISTENING_TITLES[
        fileName
      ] ||
      "American Listening Lab";

    await startStudySession(
      "LISTENING",
      currentCourseTitle
    );

    await loadPrivateCourseFile(
      fileName,
      currentCourseTitle,
      "LISTENING",
      null
    );

  }
);


/* ============================================================
   VOLVER AL PORTAL
   ============================================================ */

$("backToPortal").onclick =
  async () => {

    await flushCourseProgress();

    await finishStudySession();

    currentCourseCode =
      null;

    currentCourseFile =
      null;

    currentCourseTitle =
      null;

    currentCourseProgress =
      null;

    $("courseView")
      .classList
      .add(
        "hidden"
      );

    $("courseFrame")
      .removeAttribute(
        "srcdoc"
      );

    $("courseFrame").src =
      "about:blank";

    if (
      currentProfile &&
      !currentProfile.is_admin
    ) {

      await startStudySession(
        "PORTAL",
        "Portal principal"
      );

      await loadDailyGoal();

      await loadMotivationPanel();

      await loadCourseProgressPanel();
    }

  };


/* ============================================================
   ACTUALIZAR PANELES
   ============================================================ */

setInterval(
  async () => {

    if (
      currentProfile &&
      !currentProfile.is_admin &&
      currentProfile.is_active
    ) {

      await loadDailyGoal();
    }

  },
  60000
);


setInterval(
  async () => {

    if (
      currentProfile &&
      !currentProfile.is_admin &&
      currentProfile.is_active
    ) {

      await loadMotivationPanel();

      await loadCourseProgressPanel();
    }

  },
  120000
);


/* ============================================================
   ESTADÍSTICAS ADMIN
   ============================================================ */

function buildStudySummary(
  rows
) {

  const allRows =
    [...rows]
      .sort(
        (a, b) =>
          new Date(
            b.started_at
          ) -
          new Date(
            a.started_at
          )
      );

  const lastEntry =
    allRows[0]
      ?.started_at ||
    null;

  const studyRows =
    allRows.filter(
      row =>
        row.course_code !==
        "PORTAL"
    );

  const todayStart =
    startOfToday();

  const weekStart =
    startOfLast7Days();

  let todaySeconds =
    0;

  let weekSeconds =
    0;

  let totalSeconds =
    0;

  const activeDays =
    new Set();

  for (
    const row
    of studyRows
  ) {

    const seconds =
      Math.max(
        0,
        Number(
          row.active_seconds
        ) || 0
      );

    totalSeconds +=
      seconds;

    const started =
      new Date(
        row.started_at
      );

    if (
      started >=
      todayStart
    ) {

      todaySeconds +=
        seconds;
    }

    if (
      started >=
      weekStart
    ) {

      weekSeconds +=
        seconds;

      activeDays.add(
        localDayKey(
          row.started_at
        )
      );
    }
  }

  return {
    lastEntry,
    todaySeconds,
    weekSeconds,
    totalSeconds,
    activeDays:
      activeDays.size,
    recent:
      studyRows.slice(
        0,
        5
      )
  };
}


function renderStudyStats(
  summary
) {

  return `

    <div
      class="student-study-stats"
      style="
        margin-top:14px;
        padding:14px;
        border:
          1px solid rgba(148,163,184,.22);
        border-radius:14px;
      "
    >

      <strong>
        📊 Estadísticas de estudio
      </strong>

      <div
        style="
          display:grid;
          grid-template-columns:
            repeat(
              auto-fit,
              minmax(120px,1fr)
            );
          gap:8px;
          margin-top:10px;
        "
      >

        <div class="stat">
          <strong>
            ${formatStudyTime(
              summary.todaySeconds
            )}
          </strong>
          <span>Hoy</span>
        </div>

        <div class="stat">
          <strong>
            ${formatStudyTime(
              summary.weekSeconds
            )}
          </strong>
          <span>Últimos 7 días</span>
        </div>

        <div class="stat">
          <strong>
            ${summary.activeDays}
          </strong>
          <span>Días activos</span>
        </div>

        <div class="stat">
          <strong>
            ${formatStudyTime(
              summary.totalSeconds
            )}
          </strong>
          <span>Total</span>
        </div>

      </div>

    </div>

  `;
}


/* ============================================================
   BUSCADOR ADMIN
   ============================================================ */

function ensureStudentSearchControls() {

  if (
    $("studentSearch")
  ) {

    return;
  }

  const usersList =
    $("usersList");

  if (!usersList) {

    return;
  }

  const searchWrap =
    document.createElement(
      "div"
    );

  searchWrap.innerHTML = `

    <input
      id="studentSearch"
      type="search"
      placeholder="Buscar estudiante..."
      style="
        width:100%;
        padding:12px 14px;
        border-radius:12px;
        margin:15px 0;
      "
    >

  `;

  usersList.parentNode
    .insertBefore(
      searchWrap,
      usersList
    );

  $("studentSearch")
    .addEventListener(
      "input",
      filterStudentCards
    );
}


function filterStudentCards() {

  const query =
    String(
      $("studentSearch")
        ?.value || ""
    )
    .trim()
    .toLowerCase();

  document
    .querySelectorAll(
      ".student-details-card"
    )
    .forEach(
      card => {

        card.style.display =
          String(
            card.dataset.search ||
            ""
          )
          .toLowerCase()
          .includes(
            query
          )
            ? "block"
            : "none";

      }
    );
}


function setupStudentDropdowns() {

  const list =
    [
      ...document.querySelectorAll(
        ".student-details-card"
      )
    ];

  list.forEach(
    details => {

      details.addEventListener(
        "toggle",
        () => {

          if (!details.open) {

            return;
          }

          list.forEach(
            other => {

              if (
                other !== details
              ) {

                other.open =
                  false;
              }
            }
          );

        }
      );

    }
  );
}


/* ============================================================
   PANEL ADMIN
   ============================================================ */

async function loadUsers() {

  ensureStudentSearchControls();

  const {
    data: profiles,
    error
  } =
    await supabase
      .from(
        "profiles"
      )
      .select(
        "id,email,display_name,is_admin,is_active,created_at,auto_blocked"
      )
      .order(
        "created_at",
        {
          ascending: false
        }
      );

  if (error) {

    return;
  }

  const {
    data: accessRows
  } =
    await supabase
      .from(
        "course_access"
      )
      .select(
        "user_id,course_code"
      );

  const {
    data: activityRows
  } =
    await supabase
      .from(
        "study_activity"
      )
      .select(
        "user_id,course_code,section_name,started_at,active_seconds"
      );

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

  const activityMap =
    new Map();

  for (
    const row
    of activityRows || []
  ) {

    if (
      !activityMap.has(
        row.user_id
      )
    ) {

      activityMap.set(
        row.user_id,
        []
      );
    }

    activityMap
      .get(
        row.user_id
      )
      .push(
        row
      );
  }

  const students =
    profiles.filter(
      p =>
        !p.is_admin
    );

  $("adminStats").innerHTML = `

    <div class="stat">
      <strong>
        ${students.length}
      </strong>
      <span>Estudiantes</span>
    </div>

    <div class="stat">
      <strong>
        ${
          students.filter(
            s =>
              s.is_active
          ).length
        }
      </strong>
      <span>Activos</span>
    </div>

    <div class="stat">
      <strong>
        ${
          students.filter(
            s =>
              !s.is_active
          ).length
        }
      </strong>
      <span>Bloqueados</span>
    </div>

  `;

  const adminHtml =
    profiles
      .filter(
        p =>
          p.is_admin
      )
      .map(
        p => `

          <div class="student-admin-card">

            <strong>
              ${escapeHtml(
                p.display_name ||
                p.email
              )}
            </strong>

            <span class="status active">
              Administrador
            </span>

          </div>

        `
      )
      .join("");

  const studentHtml =
    students
      .map(
        profile => {

          const userCourses =
            accessMap.get(
              profile.id
            ) ||
            new Set();

          const switches =
            COURSES
              .map(
                course => `

                  <div class="course-switch-row">

                    <div class="course-switch-copy">

                      <strong>
                        ${escapeHtml(
                          course.shortTitle
                        )}
                      </strong>

                    </div>

                    <label class="switch">

                      <input
                        type="checkbox"
                        class="course-access-switch"
                        data-id="${profile.id}"
                        data-code="${course.code}"
                        ${
                          userCourses.has(
                            course.code
                          )
                            ? "checked"
                            : ""
                        }
                      >

                      <span class="slider"></span>

                    </label>

                  </div>

                `
              )
              .join("");

          const summary =
            buildStudySummary(
              activityMap.get(
                profile.id
              ) || []
            );

          const statusText =
            profile.is_active
              ? "Activo"
              : profile.auto_blocked
                ? "Bloqueado por inactividad"
                : "Bloqueado";

          return `

            <details
              class="
                student-admin-card
                student-details-card
              "
              data-search="${escapeHtml(
                `${
                  profile.display_name || ""
                } ${
                  profile.email || ""
                } ${statusText}`
              )}"
            >

              <summary
                class="student-admin-head"
                style="
                  cursor:pointer;
                "
              >

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
                  ${statusText}
                </span>

              </summary>

              <div
                style="
                  margin-top:15px;
                "
              >

                <div class="student-account-control">

                  <strong>
                    Cuenta
                  </strong>

                  <label class="switch">

                    <input
                      type="checkbox"
                      class="student-active-switch"
                      data-id="${profile.id}"
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
                  ${switches}
                </div>

                ${renderStudyStats(
                  summary
                )}

              </div>

            </details>

          `;
        }
      )
      .join("");

  $("usersList").innerHTML =
    adminHtml +
    studentHtml;

  setupStudentDropdowns();

  filterStudentCards();


  document
    .querySelectorAll(
      ".student-active-switch"
    )
    .forEach(
      input => {

        input.onchange =
          async () => {

            const checked =
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
                    input.dataset.id,

                  p_active:
                    checked
                }
              );

            if (error) {

              input.checked =
                !checked;
            }

            input.disabled =
              false;

            await loadUsers();
          };

      }
    );


  document
    .querySelectorAll(
      ".course-access-switch"
    )
    .forEach(
      input => {

        input.onchange =
          async () => {

            const checked =
              input.checked;

            input.disabled =
              true;

            if (checked) {

              await supabase
                .from(
                  "course_access"
                )
                .insert({
                  user_id:
                    input.dataset.id,

                  course_code:
                    input.dataset.code
                });

            } else {

              await supabase
                .from(
                  "course_access"
                )
                .delete()
                .eq(
                  "user_id",
                  input.dataset.id
                )
                .eq(
                  "course_code",
                  input.dataset.code
                );
            }

            input.disabled =
              false;
          };

      }
    );
}


$("refreshUsers").onclick =
  loadUsers;


/* ============================================================
   BLOQUEO EN VIVO
   ============================================================ */

setInterval(
  async () => {

    if (
      !currentProfile ||
      currentProfile.is_admin
    ) {

      return;
    }

    const {
      data
    } =
      await supabase
        .from(
          "profiles"
        )
        .select(
          "is_active,auto_blocked,blocked_at,blocked_reason,activated_at"
        )
        .eq(
          "id",
          currentProfile.id
        )
        .single();

    if (
      !data
    ) {

      return;
    }

    currentProfile = {
      ...currentProfile,
      ...data
    };

    if (
      !data.is_active
    ) {

      await flushCourseProgress();

      await finishStudySession();

      $("courseView")
        .classList
        .add(
          "hidden"
        );

      showInactiveAccount(
        currentProfile
      );
    }

  },
  5000
);


/* ============================================================
   AUTH CHANGE
   ============================================================ */

supabase.auth
  .onAuthStateChange(
    (
      _event,
      session
    ) => {

      if (!session) {

        currentProfile =
          null;

        showOnly(
          "authView"
        );
      }
    }
  );


/* ============================================================
   SALIR / CERRAR PÁGINA
   ============================================================ */

window.addEventListener(
  "pagehide",
  () => {

    flushCourseProgress();

    saveStudyTime();
  }
);


/* ============================================================
   INICIAR
   ============================================================ */

await loadSession();
