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
  #motivationCard {
    box-sizing: border-box;
  }

  .course-last-place {
    margin-top: 12px;
    padding: 10px 12px;
    border-radius: 12px;
    background: rgba(59,130,246,.08);
    border: 1px solid rgba(59,130,246,.18);
    font-size: 13px;
    line-height: 1.5;
  }

  .course-last-place strong {
    display: block;
    margin-bottom: 2px;
  }

  .course-buttons {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 12px;
  }

  .course-buttons button {
    flex: 1 1 150px;
  }

  @media (max-width: 700px) {

    .student-overview-layout {
      display: block !important;
      grid-template-columns: 1fr !important;
      width: 100% !important;
    }

    #dailyGoalCard,
    #motivationCard {
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
    #rankingContent {
      width: 100% !important;
      min-width: 0 !important;
    }

    #dailyGoalCard *,
    #motivationCard * {
      max-width: 100%;
      box-sizing: border-box;
    }

    .course-buttons {
      display: grid;
      grid-template-columns: 1fr;
    }

    .course-buttons button {
      width: 100%;
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

const SAFETY_WINDOW_MS =
  24 * 60 * 60 * 1000;

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
    code: "CHUNKS10000",
    title: "American English Chunks — 10,000 Flashcards",
    shortTitle: "American English Chunks",
    description:
      "10,000 expresiones organizadas por niveles A1–C2: collocations, phrasal verbs y estructuras del inglés americano.",
    file: "American_English_Chunks_10000_By_Level.html",
    badge: "A1–C2",
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
    type: "lab"
  },

  {
    code: "SPEAKING",
    title: "American Speaking Lab",
    shortTitle: "Speaking Lab",
    description:
      "Práctica interactiva de speaking por niveles A1, A2, B1, B2 y C1.",
    file: "speaking_index.html",
    badge: "A1–C1",
    type: "lab"
  },

  {
    code: "PRONUNCIATION",
    title: "American Pronunciation Lab",
    shortTitle: "Pronunciation Lab",
    description:
      "15 módulos para practicar los sonidos y la pronunciación del inglés americano.",
    file: "American_Pronunciation_Lab_Module_01.html",
    badge: "American English",
    type: "lab"
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
  },

  {
    code: "B1",
    title: "B1 — Intermediate",
    shortTitle: "B1 — Intermediate",
    description:
      "Gramática B1 · explicaciones claras · ejemplos · pronunciación y práctica.",
    file: "B1_Grammar_Topic_01_AINT+(1).html",
    badge: "B1",
    type: "grammar"
  },

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
   SPEAKING LAB
   ============================================================ */

const SPEAKING_FILES =
  new Set([
    "speaking_index.html",

    "American_Speaking_Lab_A1_Volumen_1_Final.html",
    "American_Speaking_Lab_A1_Volumen_2_Final.html",
    "American_Speaking_Lab_A1_Volumen_3_Final.html",

    "American_Speaking_Lab_A2_Volumen_1_Final.html",
    "American_Speaking_Lab_A2_Volumen_2_Final.html",
    "American_Speaking_Lab_A2_Volumen_3_Final.html",

    "American_Speaking_Lab_B1_Volumen_1_Final.html",
    "American_Speaking_Lab_B1_Volumen_2_Final.html",
    "American_Speaking_Lab_B1_Volumen_3_Final.html",

    "American_Speaking_Lab_B2_Volumen_1_Final.html",
    "American_Speaking_Lab_B2_Volumen_2_Final.html",
    "American_Speaking_Lab_B2_Volumen_3_Final.html",

    "American_Speaking_Lab_C1_Volumen_1_Final.html",
    "American_Speaking_Lab_C1_Volumen_2_Final.html",
    "American_Speaking_Lab_C1_Volumen_3_Final.html"
  ]);


const SPEAKING_TITLES = {

  "speaking_index.html":
    "American Speaking Lab",

  "American_Speaking_Lab_A1_Volumen_1_Final.html":
    "Speaking A1 — Volumen 1",

  "American_Speaking_Lab_A1_Volumen_2_Final.html":
    "Speaking A1 — Volumen 2",

  "American_Speaking_Lab_A1_Volumen_3_Final.html":
    "Speaking A1 — Volumen 3",

  "American_Speaking_Lab_A2_Volumen_1_Final.html":
    "Speaking A2 — Volumen 1",

  "American_Speaking_Lab_A2_Volumen_2_Final.html":
    "Speaking A2 — Volumen 2",

  "American_Speaking_Lab_A2_Volumen_3_Final.html":
    "Speaking A2 — Volumen 3",

  "American_Speaking_Lab_B1_Volumen_1_Final.html":
    "Speaking B1 — Volumen 1",

  "American_Speaking_Lab_B1_Volumen_2_Final.html":
    "Speaking B1 — Volumen 2",

  "American_Speaking_Lab_B1_Volumen_3_Final.html":
    "Speaking B1 — Volumen 3",

  "American_Speaking_Lab_B2_Volumen_1_Final.html":
    "Speaking B2 — Volumen 1",

  "American_Speaking_Lab_B2_Volumen_2_Final.html":
    "Speaking B2 — Volumen 2",

  "American_Speaking_Lab_B2_Volumen_3_Final.html":
    "Speaking B2 — Volumen 3",

  "American_Speaking_Lab_C1_Volumen_1_Final.html":
    "Speaking C1 — Volumen 1",

  "American_Speaking_Lab_C1_Volumen_2_Final.html":
    "Speaking C1 — Volumen 2",

  "American_Speaking_Lab_C1_Volumen_3_Final.html":
    "Speaking C1 — Volumen 3"

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


/* ============================================================
   ESTADO DE PROGRESO / CONTINUAR
   ============================================================ */

let progressCache =
  new Map();

let currentCourseCode =
  null;

let currentCourseFile =
  null;

let currentCourseTitle =
  null;

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


function formatRemainingTime(
  milliseconds
) {

  const totalMinutes =
    Math.max(
      0,
      Math.ceil(
        milliseconds /
        60000
      )
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

  return new Intl.DateTimeFormat(
    "es-DO",
    {
      dateStyle: "medium",
      timeStyle: "short"
    }
  )
  .format(
    new Date(value)
  );
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


/* ============================================================
   FECHAS RD
   ============================================================ */

function getDominicanDateParts(
  date = new Date()
) {

  const parts =
    new Intl.DateTimeFormat(
      "en-CA",
      {
        timeZone:
          "America/Santo_Domingo",

        year:
          "numeric",

        month:
          "2-digit",

        day:
          "2-digit"
      }
    )
    .formatToParts(
      date
    );

  const result = {};

  for (
    const part
    of parts
  ) {

    if (
      [
        "year",
        "month",
        "day"
      ].includes(
        part.type
      )
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

  const [
    year,
    month,
    day
  ] =
    dominicanDateKeyOffset(0)
      .split("-")
      .map(Number);

  return new Date(
    Date.UTC(
      year,
      month - 1,
      day,
      12
    )
  )
  .getUTCDay();
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

  const sessionId =
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
      sessionId
    )
    .eq(
      "user_id",
      currentProfile.id
    );

  studyActiveSeconds =
    0;
}


setInterval(

  async () => {

    const now =
      Date.now();

    const elapsed =
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

    if (
      !document.hidden &&
      (
        now -
        studyLastInteraction
      ) <=
      STUDY_IDLE_LIMIT_MS
    ) {

      studyActiveSeconds +=
        Math.min(
          elapsed,
          20
        );
    }

    await saveStudyTime();

  },

  STUDY_HEARTBEAT_MS

);


/* ============================================================
   CARGAR PUNTOS GUARDADOS
   ============================================================ */

async function loadProgressCache() {

  progressCache =
    new Map();

  if (
    !currentProfile ||
    currentProfile.is_admin
  ) {

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
        "user_id,course_code,completed_items,total_items,last_section,last_file,last_position,updated_at"
      )
      .eq(
        "user_id",
        currentProfile.id
      );

  if (error) {

    console.error(
      "Error cargando puntos guardados:",
      error
    );

    return;
  }

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
        "user_id,course_code,completed_items,total_items,last_section,last_file,last_position,updated_at"
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

    console.error(
      error
    );

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
   GUARDAR ÚLTIMO PUNTO
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
      );

    const payload = {

      user_id:
        currentProfile.id,

      course_code:
        update.courseCode,

      last_section:
        update.section ||
        existing?.last_section ||
        null,

      last_file:
        update.file ||
        existing?.last_file ||
        null,

      last_position:
        Math.max(
          0,
          Math.min(
            100,
            Number(
              update.position
            ) || 0
          )
        ),

      completed_items:
        Math.max(
          0,
          Number(
            update.completedItems
          ) || 0
        ),

      total_items:
        Math.max(
          0,
          Number(
            update.totalItems
          ) || 0
        ),

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
        .select(
          "user_id,course_code,completed_items,total_items,last_section,last_file,last_position,updated_at"
        )
        .single();

    if (error) {

      console.error(
        "No se pudo guardar dónde se quedó:",
        error
      );

      return;
    }

    progressCache.set(
      update.courseCode,
      data
    );

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
   META DIARIA
   ============================================================ */

function ensureDailyGoalCard() {

  if (
    $("dailyGoalCard")
  ) {

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
    <div id="dailyGoalContent">
      Cargando...
    </div>
  `;

  const welcome =
    $("welcomeTitle")
      ?.parentElement;

  if (
    welcome &&
    welcome.parentElement
  ) {

    welcome.parentElement
      .classList
      .add(
        "student-overview-layout"
      );

    welcome.parentElement
      .insertBefore(
        card,
        welcome.nextSibling
      );

  } else {

    $("portalView")
      ?.prepend(
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

    return;
  }

  ensureDailyGoalCard();

  const todayStart =
    startOfToday();

  const last24 =
    new Date(
      Date.now() -
      SAFETY_WINDOW_MS
    );

  const {
    data
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
        last24.toISOString()
      );

  let todaySeconds =
    0;

  let seconds24 =
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

    seconds24 +=
      seconds;

    if (
      new Date(
        row.started_at
      ) >=
      todayStart
    ) {

      todaySeconds +=
        seconds;
    }
  }

  const todayPercent =
    Math.min(
      100,
      (
        todaySeconds /
        DAILY_GOAL_SECONDS
      ) *
      100
    );

  const safePercent =
    Math.min(
      100,
      (
        seconds24 /
        DAILY_GOAL_SECONDS
      ) *
      100
    );

  const todayDone =
    todaySeconds >=
    DAILY_GOAL_SECONDS;

  const safe =
    seconds24 >=
    DAILY_GOAL_SECONDS;

  const missingToday =
    Math.max(
      0,
      DAILY_GOAL_SECONDS -
      todaySeconds
    );

  const missing24 =
    Math.max(
      0,
      DAILY_GOAL_SECONDS -
      seconds24
    );

  let initial =
    false;

  let remaining =
    0;

  if (
    currentProfile.activated_at
  ) {

    const elapsed =
      Date.now() -
      new Date(
        currentProfile.activated_at
      )
      .getTime();

    if (
      elapsed <
      SAFETY_WINDOW_MS
    ) {

      initial =
        true;

      remaining =
        SAFETY_WINDOW_MS -
        elapsed;
    }
  }

  let statusHtml;

  if (safe) {

    statusHtml = `
      <strong>✅ Cuenta al día</strong>
      <div style="margin-top:5px;">
        Ya completaste los 20 minutos requeridos
        dentro de las últimas 24 horas.
      </div>
    `;

  } else if (initial) {

    statusHtml = `
      <strong>🟡 Período inicial</strong>
      <div style="margin-top:5px;">
        Te faltan
        ${formatGoalMinutes(
          missing24
        )}.
        ⏱ ${formatRemainingTime(
          remaining
        )} restantes.
      </div>
    `;

  } else {

    statusHtml = `
      <strong>⚠️ Riesgo de bloqueo</strong>
      <div style="margin-top:5px;">
        Te faltan
        ${formatGoalMinutes(
          missing24
        )}
        para volver a estar al día.
      </div>
    `;
  }

  $("dailyGoalContent").innerHTML = `

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

        <div style="opacity:.8;margin-top:4px;">
          Estudia al menos 20 minutos cada día.
        </div>
      </div>

      <strong>
        ${formatGoalMinutes(
          todaySeconds
        )}
        / 20 min
      </strong>

    </div>

    <div
      style="
        height:12px;
        margin-top:14px;
        border-radius:999px;
        overflow:hidden;
        background:rgba(148,163,184,.18);
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

    <div style="margin-top:9px;">
      ${
        todayDone
          ? "<strong>✅ Meta de hoy completada.</strong>"
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
          gap:10px;
          flex-wrap:wrap;
        "
      >
        <strong>
          🛡️ Últimas 24 horas
        </strong>

        <strong>
          ${formatGoalMinutes(
            seconds24
          )}
          / 20 min
        </strong>
      </div>

      <div
        style="
          height:9px;
          margin-top:10px;
          border-radius:999px;
          overflow:hidden;
          background:rgba(148,163,184,.18);
        "
      >
        <div
          style="
            width:${safePercent}%;
            height:100%;
            background:${
              safe
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
          background:rgba(148,163,184,.07);
        "
      >
        ${statusHtml}
      </div>

    </div>

  `;
}


/* ============================================================
   RACHA
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

  $("dailyGoalCard")
    ?.insertAdjacentElement(
      "afterend",
      card
    );
}


async function loadStreak() {

  if (
    !currentProfile ||
    currentProfile.is_admin
  ) {

    return;
  }

  ensureMotivationCard();

  const since =
    new Date(
      Date.now() -
      120 *
      24 *
      60 *
      60 *
      1000
    );

  const {
    data
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

  const today =
    dominicanDateKeyOffset(
      0
    );

  let streak =
    0;

  let offset =
    studiedDays.has(
      today
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

  let weekDays =
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

          const studied =
            studiedDays.has(
              dominicanDateKeyOffset(
                dayOffset
              )
            );

          if (
            studied &&
            dayOffset <= 0
          ) {

            weekDays += 1;
          }

          return `

            <div
              style="
                flex:1;
                text-align:center;
              "
            >

              <div
                style="
                  font-size:12px;
                  opacity:.7;
                "
              >
                ${label}
              </div>

              <div
                style="
                  width:34px;
                  height:34px;
                  margin:6px auto 0;
                  border-radius:50%;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  background:rgba(148,163,184,.1);
                "
              >
                ${
                  studied
                    ? "✅"
                    : dayOffset > 0
                      ? "·"
                      : "—"
                }
              </div>

            </div>

          `;
        }
      )
      .join("");

  $("streakContent").innerHTML = `

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
            opacity:.8;
            margin-top:5px;
          "
        >
          Cada día que estudias mantiene tu racha.
        </div>
      </div>

      <div style="text-align:right;">
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
        display:flex;
        margin-top:18px;
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
        ${weekDays} días
      </strong>
      con estudio.
    </div>

  `;
}


/* ============================================================
   RANKING
   ============================================================ */

async function loadWeeklyRanking() {

  if (
    !currentProfile ||
    currentProfile.is_admin
  ) {

    return;
  }

  ensureMotivationCard();

  const {
    data,
    error
  } =
    await supabase.rpc(
      "get_weekly_study_ranking"
    );

  if (error) {

    $("rankingContent").innerHTML =
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
    position =>
      position === 1
        ? "🥇"
        : position === 2
          ? "🥈"
          : position === 3
            ? "🥉"
            : `${position}.`;

  let rows =
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
                    ? " ← Tú"
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

  if (
    me &&
    me.position > 10
  ) {

    rows += `

      <div
        style="
          display:grid;
          grid-template-columns:
            42px minmax(0,1fr) auto;
          gap:8px;
          margin-top:12px;
          padding:11px 10px;
          border-radius:12px;
          background:rgba(59,130,246,.15);
        "
      >

        <strong>
          ${me.position}.
        </strong>

        <div>
          ${escapeHtml(
            me.display_name
          )}
          ← Tú
        </div>

        <strong>
          ${formatRankingMinutes(
            me.active_seconds
          )}
        </strong>

      </div>

    `;
  }

  $("rankingContent").innerHTML = `

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
            opacity:.8;
            margin-top:5px;
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

    <div style="margin-top:14px;">
      ${rows}
    </div>

  `;
}


async function loadMotivationPanel() {

  await Promise.all([
    loadStreak(),
    loadWeeklyRanking()
  ]);
}


/* ============================================================
   LOGIN / VISTAS
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
    id =>
      $(id)
        .classList
        .add(
          "hidden"
        )
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

      <div style="font-size:52px;">
        🔴
      </div>

      <h2>
        Cuenta bloqueada por inactividad
      </h2>

      <p>
        No completaste al menos
        <strong>
          20 minutos de estudio activo
        </strong>
        dentro de las últimas
        <strong>24 horas</strong>.
      </p>

      <p>
        Comunícate con tu profesor
        para recuperar el acceso.
      </p>

    </div>

  `;
}


/* ============================================================
   PERMISOS DE CURSOS
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
        row =>
          row.course_code
      )
  );
}


/* ============================================================
   MOSTRAR ÚLTIMO PUNTO EN CADA CURSO
   ============================================================ */

function getSavedPlaceText(
  course,
  progress
) {

  if (!progress) {

    return null;
  }


  if (
    course.code ===
    "VERBS5000" &&
    Number(
      progress.completed_items
    ) > 0
  ) {

    return `Verbo ${progress.completed_items} / 5000`;
  }


  if (
    course.code ===
    "LISTENING" &&
    progress.last_file
  ) {

    return (
      LISTENING_TITLES[
        progress.last_file
      ] ||
      progress.last_section ||
      "Listening"
    );
  }


  if (
    course.code ===
    "SPEAKING" &&
    progress.last_file
  ) {

    return (
      SPEAKING_TITLES[
        progress.last_file
      ] ||
      progress.last_section ||
      "Speaking"
    );
  }


  if (
    progress.last_section
  ) {

    return progress.last_section;
  }


  return null;
}


/* ============================================================
   TARJETAS DE CURSOS
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

  const progress =
    !currentProfile?.is_admin
      ? progressCache.get(
          course.code
        )
      : null;

  const savedPlace =
    getSavedPlaceText(
      course,
      progress
    );

  return `

    <article
      class="course-card"
    >

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
        allowed &&
        savedPlace

          ? `

              <div
                class="course-last-place"
              >

                <strong>
                  📍 Donde te quedaste
                </strong>

                ${escapeHtml(
                  savedPlace
                )}

              </div>

            `

          : ""
      }


      ${
        allowed

          ? `

              <div
                class="course-buttons"
              >

                <button
                  class="
                    primary
                    open-course
                  "
                  data-code="${course.code}"
                >
                  Abrir curso
                </button>

                ${
                  savedPlace

                    ? `

                        <button
                          class="
                            primary
                            continue-course
                          "
                          data-code="${course.code}"
                        >
                          ▶ Continuar
                        </button>

                      `

                    : ""
                }

              </div>

            `

          : `

              <span
                class="status pending"
              >
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

  const grammar =
    COURSES.filter(
      course =>
        course.type ===
        "grammar"
    );

  const extra =
    COURSES.filter(
      course =>
        course.type ===
        "extra"
    );

  const labs =
    COURSES.filter(
      course =>
        course.type ===
        "lab"
    );

  const grammarGrid =
    $("grammarGrid");

  const courseGrid =
    $("courseGrid");

  const labGrid =
    $("labGrid");


  if (grammarGrid) {

    grammarGrid.innerHTML =
      grammar
        .map(
          course =>
            courseCardHtml(
              course,
              accessSet
            )
        )
        .join("");
  }


  if (courseGrid) {

    courseGrid.innerHTML =
      extra
        .map(
          course =>
            courseCardHtml(
              course,
              accessSet
            )
        )
        .join("");
  }


  if (labGrid) {

    labGrid.innerHTML =
      labs
        .map(
          course =>
            courseCardHtml(
              course,
              accessSet
            )
        )
        .join("");

  } else if (
    courseGrid &&
    labs.length
  ) {

    courseGrid.insertAdjacentHTML(
      "beforeend",
      labs
        .map(
          course =>
            courseCardHtml(
              course,
              accessSet
            )
        )
        .join("")
    );
  }


  document
    .querySelectorAll(
      ".open-course"
    )
    .forEach(
      button => {

        button.onclick =
          () =>
            openCourse(
              button.dataset.code,
              false
            );

      }
    );


  document
    .querySelectorAll(
      ".continue-course"
    )
    .forEach(
      button => {

        button.onclick =
          () =>
            openCourse(
              button.dataset.code,
              true
            );

      }
    );
}


/* ============================================================
   ABRIR CURSO / CONTINUAR
   ============================================================ */

const PRONUNCIATION_FILES = new Set(
  Array.from({ length: 15 }, (_, i) =>
    `American_Pronunciation_Lab_Module_${String(i + 1).padStart(2, "0")}.html`
  )
);
const PRONUNCIATION_TITLES = {
  "American_Pronunciation_Lab_Module_01.html": "Meet the Sounds",
  "American_Pronunciation_Lab_Module_02.html": "Short I",
  "American_Pronunciation_Lab_Module_03.html": "Long A",
  "American_Pronunciation_Lab_Module_04.html": "Short E",
  "American_Pronunciation_Lab_Module_05.html": "Short A",
  "American_Pronunciation_Lab_Module_06.html": "Open A",
  "American_Pronunciation_Lab_Module_07.html": "Schwa as in Fun",
  "American_Pronunciation_Lab_Module_08.html": "Open O",
  "American_Pronunciation_Lab_Module_09.html": "Long O",
  "American_Pronunciation_Lab_Module_10.html": "Short U",
  "American_Pronunciation_Lab_Module_11.html": "Long U",
  "American_Pronunciation_Lab_Module_12.html": "R-Controlled Vowels",
  "American_Pronunciation_Lab_Module_13.html": "Diphthong AI",
  "American_Pronunciation_Lab_Module_14.html": "Diphthong AU",
  "American_Pronunciation_Lab_Module_15.html": "Diphthong OI"
};

function ensurePronunciationModuleNav() {
  const courseView = $("courseView");
  const frame = $("courseFrame");
  if (!courseView || !frame) return null;

  let nav = $("pronunciationModuleNav");

  if (!nav) {
    nav = document.createElement("section");
    nav.id = "pronunciationModuleNav";
    nav.style.cssText = "width:100%;max-width:100%;height:auto;max-height:none;overflow:visible;box-sizing:border-box;margin:0 0 16px;padding:0;border:0;background:transparent;";
    nav.innerHTML = `<style>
      #pronunciationModuleNav,
      #pronunciationModuleNav *{box-sizing:border-box}
      #pronunciationModuleNav{--pl-bg:#071225;--pl-panel:#0d1b33;--pl-border:rgba(110,163,255,.2);--pl-blue:#3485ff;--pl-cyan:#59c7ff;--pl-text:#f2f7ff;--pl-muted:#a6b8d3;display:block;width:100%;max-width:100%;height:auto;max-height:none;min-height:0;overflow:visible;padding:clamp(12px,2.5vw,28px)!important;margin:0 0 16px!important;color:var(--pl-text);background:radial-gradient(circle at 90% 0%,rgba(44,120,255,.16),transparent 34%),var(--pl-bg)!important;border:1px solid var(--pl-border)!important;border-radius:22px!important;font-family:inherit;isolation:isolate}
      #pronunciationModuleNav .pl-hero{position:relative;overflow:hidden;padding:clamp(22px,4vw,42px);margin-bottom:22px;border:1px solid rgba(112,169,255,.25);border-radius:22px;background:radial-gradient(circle at 85% 15%,rgba(89,199,255,.2),transparent 30%),linear-gradient(125deg,#10264b,#123d7c 62%,#0758b8);box-shadow:0 16px 40px rgba(0,0,0,.2)}
      #pronunciationModuleNav .pl-eyebrow{display:inline-flex;align-items:center;gap:8px;padding:7px 11px;margin-bottom:16px;border:1px solid rgba(255,255,255,.18);border-radius:999px;background:rgba(255,255,255,.08);color:#c8e8ff;font-size:11px;font-weight:800;letter-spacing:.12em}
      #pronunciationModuleNav .pl-eyebrow:before{content:"";width:7px;height:7px;flex:0 0 7px;border-radius:50%;background:var(--pl-cyan);box-shadow:0 0 12px var(--pl-cyan)}
      #pronunciationModuleNav .pl-hero h3{margin:0 0 12px!important;color:#fff!important;font-size:clamp(25px,4vw,39px);line-height:1.15;font-weight:850;letter-spacing:-.035em}
      #pronunciationModuleNav .pl-hero p{max-width:680px;margin:0!important;color:#d4e5ff!important;font-size:14px;line-height:1.8}
      #pronunciationModuleNav .pl-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:24px;max-width:580px}
      #pronunciationModuleNav .pl-stat{min-width:0;padding:12px;border:1px solid rgba(255,255,255,.15);border-radius:13px;background:rgba(4,19,43,.24)}
      #pronunciationModuleNav .pl-stat strong{display:block;margin-bottom:4px;color:#fff;font-size:20px;line-height:1.25}
      #pronunciationModuleNav .pl-stat span{display:block;color:#c2d9fb;font-size:11px;line-height:1.5}
      #pronunciationModuleNav .pl-guide{display:flex;align-items:flex-start;gap:12px;padding:16px 18px;margin-bottom:26px;border:1px solid var(--pl-border);border-radius:15px;background:var(--pl-panel);color:var(--pl-muted);font-size:13px;line-height:1.75}
      #pronunciationModuleNav .pl-guide-icon{display:flex;align-items:center;justify-content:center;width:35px;height:35px;flex:0 0 35px;border:1px solid rgba(67,145,255,.3);border-radius:11px;background:rgba(52,133,255,.12);color:#79baff;font-size:17px}
      #pronunciationModuleNav .pl-guide strong{display:block;margin-bottom:3px;color:#f2f7ff;font-size:13px}
      #pronunciationModuleNav .pl-library-heading,#pronunciationModuleNav .pl-module-heading{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;margin:0 0 15px}
      #pronunciationModuleNav .pl-library-heading h3,#pronunciationModuleNav .pl-module-heading h3{margin:0 0 5px!important;color:#f2f7ff!important;font-size:21px;font-weight:800}
      #pronunciationModuleNav .pl-library-heading p,#pronunciationModuleNav .pl-module-heading p{margin:0!important;color:var(--pl-muted)!important;font-size:12px;line-height:1.6}
      #pronunciationModuleNav .pl-section-count{padding:7px 11px;border:1px solid var(--pl-border);border-radius:999px;background:rgba(52,133,255,.09);color:#9ccaff;font-size:11px;font-weight:800;white-space:nowrap}
      #pronunciationModuleNav .pl-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:13px;width:100%;height:auto;max-height:none;min-height:0;overflow:visible;padding:0 0 8px;margin:0;touch-action:auto;overscroll-behavior:auto}
      #pronunciationModuleNav .pl-card{position:relative;display:flex;flex-direction:column;align-items:stretch;gap:12px;min-width:0;min-height:190px;padding:17px;overflow:hidden;border:1px solid var(--pl-border);border-radius:17px;background:linear-gradient(155deg,rgba(23,48,83,.98),rgba(12,28,52,.98));box-shadow:0 7px 20px rgba(0,0,0,.12);transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease}
      #pronunciationModuleNav .pl-card:before{position:absolute;top:0;left:17px;right:17px;height:2px;content:"";border-radius:0 0 4px 4px;background:linear-gradient(90deg,#3485ff,#59c7ff);opacity:.75}
      #pronunciationModuleNav .pl-card:hover{transform:translateY(-3px);border-color:rgba(83,157,255,.65);box-shadow:0 14px 28px rgba(0,0,0,.22)}
      #pronunciationModuleNav .pl-card-top{display:flex;align-items:center;justify-content:space-between;gap:8px}
      #pronunciationModuleNav .pl-badge{display:inline-flex;align-items:center;padding:6px 9px;border:1px solid rgba(74,148,255,.24);border-radius:8px;background:rgba(52,133,255,.12);color:#a8d0ff;font-size:10px;font-weight:850;letter-spacing:.06em}
      #pronunciationModuleNav .pl-card-icon{display:flex;align-items:center;justify-content:center;width:34px;height:34px;flex:0 0 34px;border:1px solid rgba(89,199,255,.22);border-radius:11px;background:rgba(37,119,227,.13);color:#72caff;font-size:18px}
      #pronunciationModuleNav .pl-card strong{display:block;color:#f3f7ff;font-size:15px;font-weight:800;line-height:1.4;overflow-wrap:anywhere}
      #pronunciationModuleNav .pl-card .pl-description{display:block;flex:1;color:#a9bbd5;font-size:12px;line-height:1.65}
      #pronunciationModuleNav .pl-open{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:39px;padding:10px 12px;border:1px solid rgba(116,177,255,.28);border-radius:10px;background:linear-gradient(110deg,#2475ed,#1761ce);color:#fff;font-family:inherit;font-size:12px;font-weight:800;cursor:pointer;transition:filter .15s ease,transform .15s ease}
      #pronunciationModuleNav .pl-open:after{content:"→";font-size:16px;line-height:1}
      #pronunciationModuleNav .pl-open:hover{filter:brightness(1.14)}
      #pronunciationModuleNav #closePronunciationModule{padding:10px 14px;border:1px solid rgba(89,163,255,.35);border-radius:10px;background:#143765;color:#e8f3ff;font-family:inherit;font-size:12px;font-weight:800;cursor:pointer}
      #pronunciationModuleNav .pl-open:focus-visible,#pronunciationModuleNav #closePronunciationModule:focus-visible{outline:3px solid #59c7ff;outline-offset:3px}
      #pronunciationModuleNav.pl-in-module .pl-hero,#pronunciationModuleNav.pl-in-module .pl-guide,#pronunciationModuleNav.pl-in-module #pronunciationModuleGrid,#pronunciationModuleNav.pl-in-module .pl-library-heading{display:none!important}
      #pronunciationModuleNav.pl-in-module{padding:14px!important;margin-bottom:12px!important;border-radius:14px!important}
      #pronunciationModuleNav.pl-in-module .pl-module-heading{margin:0!important}
      @media(max-width:1100px){#pronunciationModuleNav .pl-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
      @media(max-width:760px){#pronunciationModuleNav .pl-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}#pronunciationModuleNav .pl-card{min-height:185px;padding:13px}#pronunciationModuleNav .pl-hero{border-radius:17px}}
      @media(max-width:420px){#pronunciationModuleNav{padding:10px!important;border-radius:15px!important}#pronunciationModuleNav .pl-stats{gap:7px}#pronunciationModuleNav .pl-stat{padding:9px 7px}#pronunciationModuleNav .pl-stat strong{font-size:16px}#pronunciationModuleNav .pl-stat span{font-size:10px}#pronunciationModuleNav .pl-grid{grid-template-columns:minmax(0,1fr);gap:10px}#pronunciationModuleNav .pl-card{min-height:0;padding:15px}}
      @media(prefers-reduced-motion:reduce){#pronunciationModuleNav *{transition:none!important}}
      </style>
      <div class="pl-hero">
        <span class="pl-eyebrow">LEARN ENGLISH WITH JOAN</span>
        <h3>🎧 American Pronunciation Lab</h3>
        <p>Train your ear. Master American English sounds. Escucha, practica y mejora tu pronunciación paso a paso.</p>
        <div class="pl-stats">
          <div class="pl-stat"><strong>15</strong><span>Módulos de práctica</span></div>
          <div class="pl-stat"><strong>US English</strong><span>American pronunciation</span></div>
          <div class="pl-stat"><strong>A1–B1</strong><span>Práctica progresiva</span></div>
        </div>
      </div>
      <div class="pl-guide">
        <div class="pl-guide-icon" aria-hidden="true">ⓘ</div>
        <div><strong>¿Cómo utilizar el laboratorio?</strong>Elige un módulo, abre su lección y practica los sonidos. Cuando termines, vuelve a esta pantalla para seleccionar otro módulo.</div>
      </div>
      <div class="pl-library-heading">
        <div><h3>Tu ruta de pronunciación</h3><p>Selecciona un módulo para comenzar a practicar.</p></div>
        <span class="pl-section-count">15 MÓDULOS</span>
      </div>
      <div class="pl-module-heading" style="display:none">
        <div><h3>Módulo abierto</h3><p>Practica la lección y vuelve para elegir otra.</p></div>
        <button type="button" id="closePronunciationModule" style="display:none">← Volver a los módulos</button>
      </div>
      <div id="pronunciationModuleGrid" class="pl-grid" aria-label="Módulos de pronunciación americana"></div>`;
    courseView.insertBefore(nav, frame);
  }

  const grid = $("pronunciationModuleGrid");

  // Botones flotantes para ir al inicio o al final de los módulos.
  let scrollControls = $("plFloatingScrollControls");
  if (!scrollControls) {
    scrollControls = document.createElement("div");
    scrollControls.id = "plFloatingScrollControls";
    scrollControls.setAttribute("aria-label", "Controles de desplazamiento");
    scrollControls.innerHTML = `
      <style>
        #plFloatingScrollControls {
          position: fixed;
          right: max(16px, env(safe-area-inset-right));
          bottom: max(18px, env(safe-area-inset-bottom));
          z-index: 2147483000;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        #plFloatingScrollControls button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border: 1px solid rgba(139, 197, 255, .55);
          border-radius: 50%;
          background: linear-gradient(145deg, #237cff, #0750bb);
          color: #fff;
          box-shadow: 0 8px 24px rgba(0, 0, 0, .35);
          font: 900 25px/1 Arial, sans-serif;
          cursor: pointer;
          touch-action: manipulation;
        }
        #plFloatingScrollControls button:active {
          transform: scale(.94);
        }
        #plFloatingScrollControls button:focus-visible {
          outline: 3px solid #59c7ff;
          outline-offset: 3px;
        }
        @media (max-width: 480px) {
          #plFloatingScrollControls { right: 10px; bottom: 14px; gap: 8px; }
          #plFloatingScrollControls button { width: 44px; height: 44px; }
        }
      </style>
      <button type="button" id="plScrollTop" aria-label="Subir al inicio" title="Subir al inicio">↑</button>
      <button type="button" id="plScrollBottom" aria-label="Bajar al final" title="Bajar al final">↓</button>
    `;
    document.body.appendChild(scrollControls);

    const scrollToTarget = target => {
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    $("plScrollTop").addEventListener("click", () => {
      scrollToTarget($("pronunciationModuleNav"));
    });

    $("plScrollBottom").addEventListener("click", () => {
      const moduleGrid = $("pronunciationModuleGrid");
      const lastCard = moduleGrid && moduleGrid.lastElementChild;
      scrollToTarget(lastCard || moduleGrid);
    });
  }

  scrollControls.style.display = "flex";

  if (!scrollControls.dataset.visibilityBound) {
    scrollControls.dataset.visibilityBound = "true";
    const syncVisibility = () => {
      const view = $("courseView");
      const isHidden = !view || view.classList.contains("hidden") ||
        getComputedStyle(view).display === "none";
      scrollControls.style.display = isHidden ? "none" : "flex";
    };
    const view = $("courseView");
    if (view && window.MutationObserver) {
      new MutationObserver(syncVisibility).observe(view, {
        attributes: true,
        attributeFilter: ["class", "style"]
      });
    }
    syncVisibility();
  }

  if (grid && !grid.dataset.built) {
    const moduleDetails = [
      ["🎧", "Conoce los sonidos básicos y prepara tu oído para el inglés americano."],
      ["ɪ", "Practica la vocal corta de palabras como sit, big y little."],
      ["eɪ", "Aprende a reconocer y producir el sonido de long A."],
      ["ɛ", "Distingue la vocal de palabras como bed, ten y friend."],
      ["æ", "Entrena la vocal de palabras como cat, map y family."],
      ["ɑ", "Practica el sonido abierto de palabras como hot y stop."],
      ["ə", "Reconoce la schwa, una vocal frecuente en el habla natural."],
      ["ɔ", "Trabaja el sonido de la O abierta en ejemplos americanos."],
      ["oʊ", "Practica la vocal larga de palabras como go, home y open."],
      ["ʌ", "Distingue la vocal de palabras como cup, luck y money."],
      ["u", "Practica la vocal de palabras como blue, food y student."],
      ["ɝ", "Entrena las vocales con R en palabras como bird, word y learn."],
      ["aɪ", "Practica el diptongo de palabras como time, my y five."],
      ["aʊ", "Entrena el diptongo de palabras como now, house y about."],
      ["ɔɪ", "Practica el diptongo de palabras como boy, voice y enjoy."]
    ];

    grid.innerHTML = Object.values(PRONUNCIATION_TITLES).map((name, index) => {
      const number = String(index + 1).padStart(2, "0");
      const file = `American_Pronunciation_Lab_Module_${number}.html`;
      const [icon, description] = moduleDetails[index];
      return `<article class="pl-card">
        <div class="pl-card-top"><span class="pl-badge">MÓDULO ${number}</span><span class="pl-card-icon" aria-hidden="true">${icon}</span></div>
        <strong>${name}</strong>
        <span class="pl-description">${description}</span>
        <button type="button" class="pl-open" data-module-file="${file}">Abrir módulo</button>
      </article>`;
    }).join("");

    grid.dataset.built = "true";
    grid.addEventListener("click", async event => {
      const button = event.target.closest("button[data-module-file]");
      if (!button) return;
      const file = button.dataset.moduleFile;
      if (!PRONUNCIATION_FILES.has(file)) return;

      button.disabled = true;
      try {
        await requestCurrentProgressSave();
        currentCourseCode = "PRONUNCIATION";
        currentCourseFile = file;
        currentCourseTitle = PRONUNCIATION_TITLES[file] || "American Pronunciation Lab";
        nav.classList.add("pl-in-module");
        grid.style.display = "none";

        const back = $("closePronunciationModule");
        if (back) back.style.display = "inline-flex";
        const heading = nav.querySelector(".pl-module-heading");
        if (heading) heading.style.display = "flex";
        const title = nav.querySelector(".pl-module-heading h3");
        if (title) title.textContent = currentCourseTitle;
        const description = nav.querySelector(".pl-module-heading p");
        if (description) description.textContent = "Estás dentro de este módulo.";

        frame.style.display = "";
        await loadPrivateCourseFile(file, currentCourseTitle, "PRONUNCIATION");
      } catch (error) {
        console.error("Error al abrir el módulo de pronunciación:", error);
        alert("No se pudo abrir el módulo. Inténtalo de nuevo.");
        button.disabled = false;
      }
    });
  }

  const back = $("closePronunciationModule");
  if (back && !back.dataset.bound) {
    back.dataset.bound = "true";
    back.addEventListener("click", async () => {
      await requestCurrentProgressSave();
      frame.style.display = "none";
      nav.classList.remove("pl-in-module");
      if (grid) grid.style.display = "grid";
      back.style.display = "none";

      const heading = nav.querySelector(".pl-module-heading");
      if (heading) heading.style.display = "none";
      const libraryHeading = nav.querySelector(".pl-library-heading");
      if (libraryHeading) libraryHeading.style.display = "flex";

      currentCourseFile = "";
      currentCourseTitle = "American Pronunciation Lab";
      $("courseStatus").textContent = "Selecciona uno de los 15 módulos para comenzar.";
      nav.scrollIntoView({ behavior: "auto", block: "start" });
    });
  }

  return nav;
}

async function openCourse(
  courseCode,
  resume = false
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
    !currentProfile.is_admin
  ) {

    const access =
      await getMyCourseAccess();

    if (
      !access.has(
        courseCode
      )
    ) {

      alert(
        "No tienes acceso autorizado a este curso."
      );

      return;
    }
  }

  const progress =
    resume
      ? await getCourseProgress(
          courseCode
        )
      : null;

  let fileName =
    course.file;

  if (
    resume &&
    courseCode ===
      "LISTENING" &&
    progress?.last_file &&
    LISTENING_FILES.has(
      progress.last_file
    )
  ) {

    fileName =
      progress.last_file;
  }

  if (
    resume &&
    courseCode ===
      "SPEAKING" &&
    progress?.last_file &&
    SPEAKING_FILES.has(
      progress.last_file
    )
  ) {

    fileName =
      progress.last_file;
  }

  currentCourseCode =
    courseCode;

  currentCourseFile =
    fileName;

  currentCourseTitle =
    course.title;

  $("courseView")
    .classList
    .remove(
      "hidden"
    );

  if (courseCode === "PRONUNCIATION") {
    // Fix: make the Pronunciation Lab view itself scrollable, even if
    // the site's global .course-view/body CSS clips the page.
    const pronunciationView = $("courseView");
    if (pronunciationView) {
      pronunciationView.style.setProperty("height", "100dvh", "important");
      pronunciationView.style.setProperty("max-height", "100dvh", "important");
      pronunciationView.style.setProperty("overflow-y", "auto", "important");
      pronunciationView.style.setProperty("overflow-x", "hidden", "important");
      pronunciationView.style.setProperty("-webkit-overflow-scrolling", "touch", "important");
      pronunciationView.style.setProperty("overscroll-behavior-y", "contain", "important");
      pronunciationView.style.setProperty("touch-action", "pan-y", "important");
    }
    const frame = $("courseFrame");
    if (frame) frame.style.display = "none";
    const nav = ensurePronunciationModuleNav();
    if (nav) {
      nav.classList.remove("pl-in-module");
      const grid = $("pronunciationModuleGrid");
      if (grid) grid.style.display = "grid";
      const back = $("closePronunciationModule");
      if (back) back.style.display = "none";
      const title = nav.querySelector("h3");
      if (title) title.textContent = "American Pronunciation Lab — 15 módulos";
      const description = nav.querySelector("p");
      if (description) description.textContent = "Elige una lección para abrirla. Después puedes volver aquí y seleccionar otra.";
    }
    $("courseStatus").textContent = "Selecciona uno de los 15 módulos para comenzar.";
    return;
  }

  await startStudySession(
    courseCode,
    resume &&
    progress?.last_section
      ? progress.last_section
      : course.title
  );

  await loadPrivateCourseFile(
    fileName,
    course.title,
    courseCode,
    progress
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

  console.log("[PRONUNCIATION DEBUG] Archivo solicitado:", fileName, "| curso:", courseCode);

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

    console.error(
      error
    );

    $("courseStatus").textContent =
      "No se pudo abrir el contenido.";

    return;
  }

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

  frame.setAttribute(
    "allow",
    "microphone"
  );

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

                  section:
                    restoreProgress
                      .last_section ||
                    "",

                  position:
                    Number(
                      restoreProgress
                        .last_position
                    ) || 0,

                  completedItems:
                    Number(
                      restoreProgress
                        .completed_items
                    ) || 0

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
}


/* ============================================================
   SEGUIMIENTO DENTRO DE CADA CURSO
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

          const href =
            (
              link.getAttribute(
                "href"
              ) || ""
            )
            .trim()
            .split("?")[0]
            .split("#")[0]
            .replace(
              /^\.\//,
              ""
            );

          const file =
            href
              .split("/")
              .pop();

          if (
            !LISTENING_FILES.has(
              file
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
            file
          );
        }
      );
  }


  const script =
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


  script.textContent = `

    (function () {

      const COURSE_CODE =
        ${safeCode};

      const CURRENT_FILE =
        ${safeFile};

      let timer =
        null;


      function cleanText(
        element
      ) {

        return String(
          element?.textContent ||
          ""
        )
        .replace(
          /\\s+/g,
          " "
        )
        .trim()
        .slice(
          0,
          160
        );
      }


      function normalize(
        value
      ) {

        return String(
          value || ""
        )
        .replace(
          /\\s+/g,
          " "
        )
        .trim()
        .toLowerCase();
      }


      function lessonCandidates() {

        const topics =
          Array.from(
            document.querySelectorAll(
              "details.topic > summary"
            )
          );

        if (
          topics.length
        ) {

          return topics;
        }


        const summaries =
          Array.from(
            document.querySelectorAll(
              "details > summary"
            )
          );

        if (
          summaries.length
        ) {

          return summaries;
        }


        const headings =
          Array.from(
            document.querySelectorAll(
              "h2,h3"
            )
          );

        if (
          headings.length
        ) {

          return headings;
        }


        return Array.from(
          document.querySelectorAll(
            "h1,h2,h3,h4,h5,h6"
          )
        );
      }


      function currentLesson() {

        const candidates =
          lessonCandidates();

        let current =
          "";


        for (
          const element
          of candidates
        ) {

          const rect =
            element
              .getBoundingClientRect();


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


      function openParents(
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


      function findLesson(
        savedSection
      ) {

        const target =
          normalize(
            savedSection
          );


        if (!target) {

          return null;
        }


        const candidates =
          Array.from(
            document.querySelectorAll(
              "details.topic > summary, details > summary, h1, h2, h3, h4, h5, h6"
            )
          );


        let found =
          candidates.find(
            element =>
              normalize(
                cleanText(
                  element
                )
              ) ===
              target
          );


        if (found) {

          return found;
        }


        return candidates.find(
          element => {

            const text =
              normalize(
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
        ) || null;
      }


      function restoreExactLesson(
        section
      ) {

        const lesson =
          findLesson(
            section
          );


        if (!lesson) {

          return false;
        }


        openParents(
          lesson
        );


        if (
          lesson.tagName ===
          "SUMMARY" &&
          lesson.parentElement
            ?.tagName ===
          "DETAILS"
        ) {

          lesson.parentElement.open =
            true;
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


            window.scrollBy(
              0,
              -90
            );

          },
          250
        );


        return true;
      }


      function sendActivity() {

        parent.postMessage(
          {
            type:
              "STUDY_ACTIVITY_PING"
          },
          "*"
        );
      }


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


        let section =
          currentLesson();


        let completedItems =
          0;


        let totalItems =
          0;


        if (
          COURSE_CODE ===
          "VERBS5000"
        ) {

          let currentIndex =
            0;


          try {

            if (
              typeof index !==
              "undefined"
            ) {

              currentIndex =
                Number(index);

            } else {

              currentIndex =
                Number(
                  localStorage.getItem(
                    "lewjoan_verbs5000_index"
                  ) ||
                  0
                );
            }

          } catch (
            error
          ) {}


          completedItems =
            Math.max(
              1,
              Math.min(
                5000,
                currentIndex + 1
              )
            );


          totalItems =
            5000;


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

            section:
              section,

            position:
              Math.max(
                0,
                Math.min(
                  100,
                  position
                )
              ),

            completedItems:
              completedItems,

            totalItems:
              totalItems
          },
          "*"
        );
      }


      function changed() {

        sendActivity();


        clearTimeout(
          timer
        );


        timer =
          setTimeout(
            sendProgress,
            450
          );
      }


      [
        "mousedown",
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
            changed,
            {
              passive: true
            }
          );

        }
      );


      document.addEventListener(
        "toggle",
        function () {

          setTimeout(
            sendProgress,
            200
          );

        },
        true
      );


      setInterval(
        sendProgress,
        5000
      );


      window.addEventListener(
        "message",
        function (event) {

          const message =
            event.data;


          if (!message) {

            return;
          }


          if (
            message.type ===
            "REQUEST_PROGRESS_SAVE"
          ) {

            sendProgress();

            return;
          }


          if (
            message.type !==
            "RESTORE_COURSE_PROGRESS"
          ) {

            return;
          }


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
                String(
                  targetIndex
                )
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


          const restored =
            restoreExactLesson(
              message.section ||
              ""
            );


          if (
            restored
          ) {

            return;
          }


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
            300
          );

        }
      );


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



  // Tema azul unificado dentro de los contenidos cargados en el iframe.
  // Solo aplica colores; no cambia estructura, tamaños, espaciado ni funciones.
  const internalBlueTheme = doc.createElement("style");
  internalBlueTheme.id = "learn-english-joan-internal-blue-theme";
  internalBlueTheme.textContent = `
    :root {
      color-scheme: dark;
      --bg: #071426;
      --card: #0B1F3A;
      --ink: #F1F6FF;
      --muted: #AFC2DD;
      --line: #203B5F;
      --navy: #0B1F3A;
      --blue: #168BFF;
      --soft: #102B4C;
    }

    html, body {
      background-color: #071426 !important;
      color: #F1F6FF !important;
    }

    main, section, article, aside, nav, header, footer,
    div, ul, ol, li,
    .container, .wrapper, .app, .app-container, .page,
    .panel, .card, .content, .lesson, .topic, .chunk-card,
    .flashcard, .question, .example, .item, .word-card,
    .collocation-card, .chunk, .grammar-card, .exercise,
    .quiz, .result, .option, .answer, .practice-card,
    .lesson-card, .topic-card, .content-card, details,
    .question-card, .example-card, .vocab-card, .entry,
    .phrase-card, .sentence-card, .study-card,
    .chunk-item, .chunk-row, .chunk-content, .chunk-example,
    .chunk-translation, .chunk-entry, .chunk-body, .chunk-details,
    .flashcard-inner, .content-inner, .lesson-content, .example-box {
      background-color: #0B1F3A !important;
      color: #F1F6FF !important;
      border-color: #203B5F !important;
    }

    h1, h2, h3, h4, h5, h6, p, li, label, summary,
    strong, b, small, span, td, th, dt, dd, legend {
      color: #F1F6FF !important;
      border-color: #203B5F !important;
    }

    input, select, textarea {
      background-color: #0D2542 !important;
      color: #F1F6FF !important;
      border-color: #35506F !important;
    }

    input::placeholder, textarea::placeholder {
      color: #AFC2DD !important;
      opacity: 1;
    }

    button, .button, .btn, [role="button"], input[type="button"],
    input[type="submit"], input[type="reset"] {
      border-color: #168BFF !important;
    }

    button.primary, .primary, .btn-primary, .button-primary,
    .btn, .button, input[type="submit"], input[type="button"] {
      background-color: #168BFF !important;
      color: #FFFFFF !important;
    }

    a { color: #69B5FF !important; }
    hr { border-color: #203B5F !important; }

    /* Los fondos blancos y muy claros también pasan al azul, incluidos estilos inline. */
    [style*="background:#fff"], [style*="background: #fff"],
    [style*="background-color:#fff"], [style*="background-color: #fff"],
    [style*="background:#ffffff"], [style*="background: #ffffff"],
    [style*="background-color:#ffffff"], [style*="background-color: #ffffff"],
    [style*="background: white"], [style*="background:white"],
    [style*="background-color: white"], [style*="background-color:white"],
    [style*="background:#f0f0f0"], [style*="background: #f0f0f0"],
    [style*="background-color:#f0f0f0"], [style*="background-color: #f0f0f0"],
    [style*="background:#f8f9fa"], [style*="background: #f8f9fa"],
    [style*="background-color:#f8f9fa"], [style*="background-color: #f8f9fa"] {
      background-color: #0B1F3A !important;
      color: #F1F6FF !important;
      border-color: #203B5F !important;
    }

    /* Texto y ejemplos dentro de tarjetas: legibles sobre el fondo azul. */
    .intro, .instructions, .instruction, .notice, .tip, .method,
    .example p, .example li, .example-card p, .example-card li {
      color: #DCEAFF !important;
    }

    /* Si el HTML usa fondos claros con style inline, fuerza el azul incluso
       cuando el color original fue declarado directamente en el elemento. */
    .internal-blue-card {
      background-color: #0B1F3A !important;
      color: #F1F6FF !important;
      border-color: #203B5F !important;
    }
  `;
  (doc.head || doc.documentElement).appendChild(internalBlueTheme);

  // Sobrescribe tarjetas con fondo blanco/claro declarado inline en el HTML original.
  const recolorLightBackgrounds = root => {
    const elements = [];
    if (root && root.nodeType === 1 && root.matches("[style]")) elements.push(root);
    if (root && root.querySelectorAll) elements.push(...root.querySelectorAll("[style]"));
    elements.forEach(element => {
      const inlineStyle = element.getAttribute("style") || "";
      const bg = (element.style.backgroundColor || "").toLowerCase().replace(/\s+/g, "");
      const match = inlineStyle.match(/background(?:-color)?\s*:\s*(?:white|#([0-9a-f]{3}|[0-9a-f]{6})|rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/i);
      let light = /^(white|#fff|#ffffff|rgb\(255,255,255\))$/.test(bg) || /background(?:-color)?\s*:\s*white/i.test(inlineStyle);
      if (match && match[1]) {
        const h = match[1].length === 3 ? match[1].split("").map(ch => ch + ch).join("") : match[1];
        const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
        light = r > 205 && g > 205 && b > 195;
      } else if (match && match[2]) {
        light = Number(match[2]) > 205 && Number(match[3]) > 205 && Number(match[4]) > 195;
      }
      if (light) {
        element.style.setProperty("background-color", "#0B1F3A", "important");
        element.style.setProperty("color", "#F1F6FF", "important");
        element.style.setProperty("border-color", "#203B5F", "important");
      }
    });
  };
  recolorLightBackgrounds(doc.documentElement);

  // Algunos módulos (por ejemplo, 1000 English Chunks) crean tarjetas después de cargar.
  // Observa cambios nuevos y aplica el mismo tema azul a los fondos claros.
  if (typeof MutationObserver !== "undefined") {
    const blueThemeObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === "attributes" && mutation.target) {
          recolorLightBackgrounds(mutation.target);
        }
        mutation.addedNodes && mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) recolorLightBackgrounds(node);
        });
      });
    });
    blueThemeObserver.observe(doc.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["style", "class"]
    });
  }

  /* Legacy implementation retained below for compatibility. */
  doc.querySelectorAll("[style]").forEach(element => {
    const inlineStyle = element.getAttribute("style") || "";
    const lightHexBackground = inlineStyle.match(/background(?:-color)?\s*:\s*(?:white|#([0-9a-f]{3}|[0-9a-f]{6}))/i);
    const hex = lightHexBackground && lightHexBackground[1] ? lightHexBackground[1] : "";
    let isLightHex = false;
    if (hex) {
      const fullHex = hex.length === 3 ? hex.split("").map(ch => ch + ch).join("") : hex;
      const r = parseInt(fullHex.slice(0, 2), 16), g = parseInt(fullHex.slice(2, 4), 16), b = parseInt(fullHex.slice(4, 6), 16);
      isLightHex = r > 205 && g > 205 && b > 195;
    }
    if (isLightHex || /background(?:-color)?\s*:\s*white/i.test(inlineStyle)) {
      element.style.setProperty("background-color", "#0B1F3A", "important");
      element.style.setProperty("color", "#F1F6FF", "important");
      element.style.setProperty("border-color", "#203B5F", "important");
    }
  });

  (
    doc.body ||
    doc.documentElement
  )
  .appendChild(
    script
  );


  return (
    "<!doctype html>\n" +
    doc.documentElement.outerHTML
  );
}


/* ============================================================
   MENSAJES DESDE LOS CURSOS
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

          section:
            message.section ||
            currentCourseTitle,

          position:
            Number(
              message.position
            ) || 0,

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
      message.type ===
      "OPEN_PRIVATE_LISTENING_FILE"
    ) {

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


      return;
    }


    if (
      message.type ===
      "OPEN_PRIVATE_SPEAKING_FILE"
    ) {

      const fileName =
        String(
          message.file ||
          ""
        );


      if (
        !SPEAKING_FILES.has(
          fileName
        )
      ) {

        return;
      }


      await flushCourseProgress();


      currentCourseCode =
        "SPEAKING";

      currentCourseFile =
        fileName;

      currentCourseTitle =
        SPEAKING_TITLES[
          fileName
        ] ||
        "American Speaking Lab";


      await startStudySession(
        "SPEAKING",
        currentCourseTitle
      );


      await loadPrivateCourseFile(
        fileName,
        currentCourseTitle,
        "SPEAKING",
        null
      );


      return;
    }

  }
);


/* ============================================================
   PEDIR GUARDADO ANTES DE SALIR DEL CURSO
   ============================================================ */

async function requestCurrentProgressSave() {

  const frame =
    $("courseFrame");


  if (
    frame?.contentWindow
  ) {

    frame.contentWindow
      .postMessage(
        {
          type:
            "REQUEST_PROGRESS_SAVE"
        },
        "*"
      );


    await new Promise(
      resolve =>
        setTimeout(
          resolve,
          350
        )
    );
  }


  await flushCourseProgress();
}


/* ============================================================
   VOLVER AL PORTAL
   ============================================================ */

$("backToPortal").onclick =
  async () => {

    await requestCurrentProgressSave();

    await finishStudySession();


    currentCourseCode =
      null;

    currentCourseFile =
      null;

    currentCourseTitle =
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

      await loadProgressCache();


      await renderCourses();


      await startStudySession(
        "PORTAL",
        "Portal principal"
      );


      await loadDailyGoal();


      await loadMotivationPanel();
    }

  };


/* ============================================================
   ESTADÍSTICAS ADMIN
   ============================================================ */

function buildStudySummary(
  rows
) {

  const ordered =
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


  const studyRows =
    ordered.filter(
      row =>
        row.course_code !==
        "PORTAL"
    );


  let todaySeconds =
    0;

  let weekSeconds =
    0;

  let totalSeconds =
    0;


  const activeDays =
    new Set();


  const today =
    startOfToday();


  const week =
    startOfLast7Days();


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


    const started =
      new Date(
        row.started_at
      );


    totalSeconds +=
      seconds;


    if (
      started >= today
    ) {

      todaySeconds +=
        seconds;
    }


    if (
      started >= week
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

    todaySeconds,

    weekSeconds,

    totalSeconds,

    activeDays:
      activeDays.size

  };
}


function renderStudyStats(
  summary
) {

  return `

    <div
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


  const wrapper =
    document.createElement(
      "div"
    );


  wrapper.innerHTML = `

    <input
      id="studentSearch"
      type="search"
      placeholder="Buscar estudiante por nombre o correo..."
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
      wrapper,
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
        ?.value ||
      ""
    )
    .trim()
    .toLowerCase();


  document
    .querySelectorAll(
      ".student-details-card"
    )
    .forEach(
      card => {

        const search =
          String(
            card.dataset.search ||
            ""
          )
          .toLowerCase();


        card.style.display =
          !query ||
          search.includes(
            query
          )
            ? "block"
            : "none";

      }
    );
}


function setupStudentDropdowns() {

  const cards =
    [
      ...document.querySelectorAll(
        ".student-details-card"
      )
    ];


  cards.forEach(
    card => {

      card.addEventListener(
        "toggle",
        () => {

          if (
            !card.open
          ) {

            return;
          }


          cards.forEach(
            other => {

              if (
                other !== card
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
          ascending:
            false
        }
      );


  if (error) {

    console.error(
      error
    );

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
      profile =>
        !profile.is_admin
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
            student =>
              student.is_active
          ).length
        }
      </strong>
      <span>Activos</span>
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
      <span>Bloqueados</span>
    </div>

  `;


  const adminHtml =
    profiles
      .filter(
        profile =>
          profile.is_admin
      )
      .map(
        profile => `

          <div
            class="student-admin-card"
          >

            <strong>
              ${escapeHtml(
                profile.display_name ||
                profile.email
              )}
            </strong>

            <span
              class="status active"
            >
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

                  <div
                    class="course-switch-row"
                  >

                    <div
                      class="course-switch-copy"
                    >
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

                      <span
                        class="slider"
                      ></span>

                    </label>

                  </div>

                `
              )
              .join("");


          const stats =
            buildStudySummary(
              activityMap.get(
                profile.id
              ) ||
              []
            );


          const status =
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
                  profile.display_name ||
                  ""
                } ${
                  profile.email ||
                  ""
                } ${status}`
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
                  ${status}
                </span>

              </summary>


              <div
                style="
                  margin-top:15px;
                "
              >

                <div
                  class="
                    student-account-control
                  "
                >

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

                    <span
                      class="slider"
                    ></span>

                  </label>

                </div>


                <div
                  class="course-access-list"
                >
                  ${switches}
                </div>


                ${renderStudyStats(
                  stats
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
                    input.dataset.id,

                  p_active:
                    newStatus
                }
              );


            if (error) {

              input.checked =
                !newStatus;
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

            const userId =
              input.dataset.id;

            const code =
              input.dataset.code;

            const checked =
              input.checked;


            input.disabled =
              true;


            let error;


            if (checked) {

              ({
                error
              } =
                await supabase
                  .from(
                    "course_access"
                  )
                  .insert({
                    user_id:
                      userId,

                    course_code:
                      code
                  }));

            } else {

              ({
                error
              } =
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
                    code
                  ));
            }


            if (error) {

              input.checked =
                !checked;

              console.error(
                error
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
   CARGAR SESIÓN
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


  if (
    !currentProfile.is_admin
  ) {

    await loadProgressCache();
  }


  await renderCourses();


  if (
    currentProfile.is_admin
  ) {

    $("dailyGoalCard")
      ?.remove();

    $("motivationCard")
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


    await startStudySession(
      "PORTAL",
      "Portal principal"
    );


    await loadDailyGoal();


    await loadMotivationPanel();
  }
}


/* ============================================================
   LOGIN
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


/* ============================================================
   REGISTRO
   ============================================================ */

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


/* ============================================================
   CERRAR SESIÓN
   ============================================================ */

$("logoutBtn").onclick =
  async () => {

    await requestCurrentProgressSave();

    await finishStudySession();


    await supabase.auth
      .signOut();


    location.reload();
  };


/* ============================================================
   ACTUALIZACIONES AUTOMÁTICAS
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
    }

  },
  120000
);


/* ============================================================
   COMPROBAR BLOQUEO EN VIVO
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


    if (!data) {

      return;
    }


    currentProfile = {
      ...currentProfile,
      ...data
    };


    if (
      !data.is_active
    ) {

      await requestCurrentProgressSave();

      await finishStudySession();


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
   CERRAR PÁGINA
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
