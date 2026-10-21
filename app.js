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
   ESTILOS RESPONSIVE PARA CELULAR
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
      box-sizing: border-box !important;
    }

    #dailyGoalCard * ,
    #motivationCard * {
      max-width: 100%;
      box-sizing: border-box;
    }

    #dailyGoalCard {
      font-size: 15px !important;
    }

    #motivationCard {
      font-size: 15px !important;
    }

    #dailyGoalCard strong,
    #motivationCard strong {
      word-break: normal !important;
      overflow-wrap: normal !important;
    }

    #dailyGoalCard > div,
    #motivationCard > div {
      min-width: 0 !important;
    }

    #dailyGoalContent > div:first-child {
      display: block !important;
    }

    #dailyGoalContent > div:first-child > strong {
      display: block !important;
      margin-top: 12px !important;
      text-align: left !important;
      font-size: 18px !important;
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

  if (remainingSeconds === 0) {

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
   FECHAS REPÚBLICA DOMINICANA
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
        year:
          "numeric",
        month:
          "2-digit",
        day:
          "2-digit"
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
        12,
        0,
        0
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
   CERRAR SESIONES ANTIGUAS
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


/* ============================================================
   INICIAR SESIÓN DE ESTUDIO
   ============================================================ */

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
      "No se pudo iniciar la sesión de estudio:",
      error
    );

    studySessionId =
      null;

    return;
  }


  studySessionId =
    data.id;
}


/* ============================================================
   GUARDAR TIEMPO
   ============================================================ */

async function saveStudyTime() {

  if (
    !studySessionId ||
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


  if (error) {

    console.error(
      "No se pudo guardar el tiempo:",
      error
    );
  }
}


/* ============================================================
   FINALIZAR SESIÓN
   ============================================================ */

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


  const {
    error
  } =
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


  if (error) {

    console.error(
      "No se pudo finalizar la sesión:",
      error
    );
  }


  studyActiveSeconds =
    0;

  studyCourseCode =
    null;

  studySectionName =
    null;
}


/* ============================================================
   HEARTBEAT
   ============================================================ */

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


  if (
    !portalView
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

    const parent =
      welcomeArea.parentElement;


    parent.classList.add(
      "student-overview-layout"
    );


    parent.insertBefore(
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

    const card =
      $("dailyGoalCard");


    if (card) {

      card.remove();
    }


    return;
  }


  ensureDailyGoalCard();


  const content =
    $("dailyGoalContent");


  if (
    !content
  ) {

    return;
  }


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

    console.error(
      "Error cargando meta diaria:",
      error
    );

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


  if (
    safe24h
  ) {

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
      )} de estudio. ⏱ ${formatRemainingInitialTime(
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
        align-items:flex-start;
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
        overflow:hidden;
        border-radius:999px;
        background:rgba(148,163,184,.18);
      "
    >

      <div
        style="
          width:${todayPercent}%;
          height:100%;
          background:linear-gradient(
            90deg,
            #3b82f6,
            #22c55e
          );
          border-radius:999px;
        "
      ></div>

    </div>


    <div
      style="
        margin-top:10px;
        line-height:1.5;
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
        border-top:1px solid rgba(148,163,184,.18);
      "
    >

      <div
        style="
          display:flex;
          justify-content:space-between;
          gap:12px;
          flex-wrap:wrap;
          align-items:center;
        "
      >

        <strong
          style="
            font-size:17px;
          "
        >
          🛡️ Últimas 24 horas
        </strong>

        <strong
          style="
            white-space:nowrap;
          "
        >

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
          background:rgba(148,163,184,.18);
          border-radius:999px;
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
            border-radius:999px;
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
          line-height:1.5;
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

    dailyCard.parentElement
      .classList
      .add(
        "student-overview-layout"
      );


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


/* ============================================================
   RACHA
   ============================================================ */

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

    console.error(
      "Error cargando racha:",
      error
    );

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

    streak +=
      1;

    offset -=
      1;
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

            completedThisWeek +=
              1;
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
                      : future
                        ? "rgba(148,163,184,.07)"
                        : "rgba(148,163,184,.12)"
                  };
                  border:1px solid ${
                    studied
                      ? "rgba(34,197,94,.35)"
                      : "rgba(148,163,184,.18)"
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
        align-items:center;
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
        justify-content:space-between;
        gap:4px;
        width:100%;
      "
    >

      ${weekHtml}

    </div>


    <div
      style="
        margin-top:12px;
        font-size:13px;
        opacity:.85;
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


/* ============================================================
   RANKING SEMANAL
   ============================================================ */

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


  if (
    error
  ) {

    console.error(
      "Error cargando ranking:",
      error
    );


    container.innerHTML = `

      <strong>
        🏆 Ranking semanal
      </strong>

      <div
        style="
          margin-top:8px;
          opacity:.7;
        "
      >
        No se pudo cargar el ranking.
      </div>

    `;


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


  const top10 =
    ranking.slice(
      0,
      10
    );


  const rankingRows =
    top10
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
                border:1px solid ${
                  isMe
                    ? "rgba(59,130,246,.30)"
                    : "rgba(148,163,184,.12)"
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
                  min-width:0;
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
                        <span
                          style="
                            margin-left:5px;
                            font-size:11px;
                            opacity:.75;
                          "
                        >
                          ← Tú
                        </span>
                      `
                    : ""
                }

              </div>


              <strong
                style="
                  white-space:nowrap;
                  font-size:14px;
                "
              >

                ${formatRankingMinutes(
                  row.active_seconds
                )}

              </strong>

            </div>

          `;
        }
      )
      .join("");


  let myExtraRow =
    "";


  if (
    me &&
    me.position > 10
  ) {

    myExtraRow = `

      <div
        style="
          margin-top:12px;
          padding-top:12px;
          border-top:
            1px solid rgba(148,163,184,.18);
        "
      >

        <div
          style="
            display:grid;
            grid-template-columns:
              42px minmax(0,1fr) auto;
            gap:8px;
            align-items:center;
            padding:11px 10px;
            border-radius:12px;
            background:rgba(59,130,246,.15);
            border:1px solid rgba(59,130,246,.30);
          "
        >

          <strong>
            ${me.position}.
          </strong>

          <div
            style="
              min-width:0;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
            "
          >

            ${escapeHtml(
              me.display_name ||
              "Estudiante"
            )}

            <span
              style="
                margin-left:5px;
                font-size:11px;
                opacity:.75;
              "
            >
              ← Tú
            </span>

          </div>

          <strong
            style="
              white-space:nowrap;
              font-size:14px;
            "
          >
            ${formatRankingMinutes(
              me.active_seconds
            )}
          </strong>

        </div>

      </div>

    `;
  }


  container.innerHTML = `

    <div
      style="
        display:flex;
        justify-content:space-between;
        align-items:flex-start;
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
              <div
                style="
                  text-align:right;
                "
              >

                <div
                  style="
                    font-size:22px;
                    font-weight:900;
                  "
                >
                  #${me.position}
                </div>

                <div
                  style="
                    font-size:12px;
                    opacity:.75;
                  "
                >
                  Tu posición
                </div>

              </div>
            `
          : ""
      }

    </div>


    <div
      style="
        margin-top:14px;
      "
    >

      ${
        rankingRows ||
        `
          <div
            style="
              opacity:.7;
            "
          >
            Todavía no hay tiempo de estudio registrado.
          </div>
        `
      }

      ${myExtraRow}

    </div>

  `;
}


async function loadMotivationPanel() {

  if (
    !currentProfile ||
    currentProfile.is_admin ||
    !currentProfile.is_active
  ) {

    $("motivationCard")
      ?.remove();

    return;
  }


  ensureMotivationCard();


  await Promise.all([
    loadStreak(),
    loadWeeklyRanking()
  ]);
}


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
   LOGIN / REGISTRO
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


/* ============================================================
   CUENTA BLOQUEADA
   ============================================================ */

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


  const pendingView =
    $("pendingView");


  const blockedDate =
    profile.blocked_at
      ? formatDateTime(
          profile.blocked_at
        )
      : null;


  const reason =
    profile.blocked_reason ||
    "Bloqueado automáticamente por inactividad.";


  pendingView.innerHTML = `

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
          margin-bottom:12px;
        "
      >
        🔴
      </div>

      <h2>
        Cuenta bloqueada por inactividad
      </h2>

      <p
        style="
          margin-top:14px;
          font-size:16px;
          line-height:1.6;
        "
      >

        Tu cuenta fue bloqueada automáticamente porque
        no completaste al menos
        <strong>20 minutos de estudio activo</strong>
        dentro de las últimas
        <strong>24 horas</strong>.

      </p>

      <p>
        Para recuperar el acceso,
        comunícate con tu profesor.
      </p>

      <p>
        <strong>
          Solo el profesor puede reactivar tu cuenta.
        </strong>
      </p>

      <div
        style="
          margin-top:22px;
          padding:14px;
          border-radius:12px;
          background:rgba(239,68,68,.08);
          text-align:left;
        "
      >

        <strong>
          Motivo:
        </strong>

        ${escapeHtml(reason)}

        ${
          blockedDate
            ? `
                <div
                  style="
                    margin-top:8px;
                  "
                >
                  <strong>
                    Bloqueado:
                  </strong>
                  ${escapeHtml(
                    blockedDate
                  )}
                </div>
              `
            : ""
        }

      </div>

    </div>

  `;
}


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


  if (
    !session
  ) {

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

    console.error(error);


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


      $("signupMsg").className =
        "msg";


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


      $("signupMsg").className =
        "msg ok";


      $("signupMsg").textContent =
        "Cuenta creada. Joan debe activarla y darte acceso al curso.";
    }
  );


/* ============================================================
   CERRAR SESIÓN
   ============================================================ */

$("logoutBtn").onclick =
  async () => {

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
   TARJETAS DE CURSO
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
        course.type === "grammar"
    );


  const extraCourses =
    COURSES.filter(
      course =>
        course.type !== "grammar"
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
   REVISAR CUENTA
   ============================================================ */

async function ensureCurrentAccountIsActive() {

  const {
    data,
    error
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
    error ||
    !data?.is_active
  ) {

    $("courseView")
      .classList
      .add(
        "hidden"
      );


    if (data) {

      currentProfile = {
        ...currentProfile,
        ...data
      };


      showInactiveAccount(
        currentProfile
      );

    } else {

      showOnly(
        "pendingView"
      );
    }


    return false;
  }


  currentProfile = {
    ...currentProfile,
    ...data
  };


  return true;
}


/* ============================================================
   ABRIR CURSO
   ============================================================ */

async function openCourse(
  courseCode
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


  const active =
    await ensureCurrentAccountIsActive();


  if (!active) {

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


  $("courseView")
    .classList
    .remove(
      "hidden"
    );


  await startStudySession(
    course.code,
    course.title
  );


  await loadPrivateCourseFile(
    course.file,
    course.title,
    course.code
  );
}


/* ============================================================
   CARGAR ARCHIVO PRIVADO
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
      .from(
        "courses"
      )
      .download(
        fileName
      );


  if (error) {

    console.error(error);


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
        fileName
      );


    const frame =
      $("courseFrame");


    frame.removeAttribute(
      "src"
    );


    frame.srcdoc =
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

  } catch (
    error
  ) {

    console.error(error);


    $("courseStatus").textContent =
      "Error al preparar el curso.";
  }
}


/* ============================================================
   PREPARAR CURSO
   ============================================================ */

function preparePrivateCourseHtml(
  htmlText,
  currentFile
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
            ).trim();


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


  const activityScript =
    doc.createElement(
      "script"
    );


  activityScript.textContent = `

    (function () {

      function notifyActivity() {

        parent.postMessage(
          {
            type:
              "STUDY_ACTIVITY_PING"
          },
          "*"
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
        function (eventName) {

          document.addEventListener(
            eventName,
            notifyActivity,
            {
              passive: true
            }
          );

        }
      );


      document.addEventListener(
        "click",
        function (event) {

          var link =
            event.target.closest(
              "a[data-private-listening-file]"
            );

          if (!link) {
            return;
          }

          event.preventDefault();
          event.stopPropagation();

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
    activityScript
  );


  return (
    "<!doctype html>\n" +
    doc.documentElement.outerHTML
  );
}


/* ============================================================
   MENSAJES DEL CURSO
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


    const active =
      await ensureCurrentAccountIsActive();


    if (!active) {

      return;
    }


    const sectionName =
      LISTENING_TITLES[
        fileName
      ] ||
      "American Listening Lab";


    await startStudySession(
      "LISTENING",
      sectionName
    );


    await loadPrivateCourseFile(
      fileName,
      sectionName,
      "LISTENING"
    );
  }
);


/* ============================================================
   VOLVER AL PORTAL
   ============================================================ */

$("backToPortal").onclick =
  async () => {

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
    }
  };


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


  const perCourse =
    new Map();


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


    perCourse.set(
      row.course_code,
      (
        perCourse.get(
          row.course_code
        ) || 0
      ) +
      seconds
    );
  }


  let topCourseCode =
    null;

  let topCourseSeconds =
    0;


  for (
    const [
      code,
      seconds
    ]
    of perCourse
  ) {

    if (
      seconds >
      topCourseSeconds
    ) {

      topCourseCode =
        code;

      topCourseSeconds =
        seconds;
    }
  }


  return {
    lastEntry,
    todaySeconds,
    weekSeconds,
    totalSeconds,
    activeDays:
      activeDays.size,
    topCourseCode,
    topCourseSeconds,
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

  const recentHtml =
    summary.recent.length

      ? summary.recent
          .map(
            row => `

              <div
                style="
                  display:flex;
                  justify-content:space-between;
                  gap:12px;
                  padding:8px 0;
                  border-top:
                    1px solid rgba(148,163,184,.18);
                "
              >

                <div>

                  <strong>
                    ${escapeHtml(
                      row.section_name ||
                      courseDisplayName(
                        row.course_code
                      )
                    )}
                  </strong>

                  <div class="small">
                    ${escapeHtml(
                      formatDateTime(
                        row.started_at
                      )
                    )}
                  </div>

                </div>


                <strong>
                  ${escapeHtml(
                    formatStudyTime(
                      row.active_seconds
                    )
                  )}
                </strong>

              </div>

            `
          )
          .join("")

      : `
          <div class="small">
            Todavía no hay sesiones.
          </div>
        `;


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


      <div
        style="
          margin-top:12px;
        "
      >

        <strong>
          Actividad reciente
        </strong>

        ${recentHtml}

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


  searchWrap.id =
    "studentSearchWrap";


  searchWrap.style.cssText = `
    margin:18px 0 14px;
    display:flex;
    gap:10px;
    align-items:center;
  `;


  searchWrap.innerHTML = `

    <input
      id="studentSearch"
      type="search"
      placeholder="Buscar estudiante por nombre o correo..."
      autocomplete="off"
      style="
        flex:1;
        padding:12px 14px;
        border-radius:12px;
      "
    >

    <span
      id="studentSearchCount"
      class="small"
    ></span>

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


  const cards =
    [
      ...document.querySelectorAll(
        ".student-details-card"
      )
    ];


  let visibleCount =
    0;


  cards.forEach(
    card => {

      const visible =
        !query ||
        String(
          card.dataset.search ||
          ""
        )
        .toLowerCase()
        .includes(
          query
        );


      card.style.display =
        visible
          ? "block"
          : "none";


      if (visible) {

        visibleCount +=
          1;
      }
    }
  );


  if (
    $("studentSearchCount")
  ) {

    $("studentSearchCount").textContent =
      query
        ? `${visibleCount} resultados`
        : `${cards.length} estudiantes`;
  }
}


function setupStudentDropdowns() {

  const detailsList =
    [
      ...document.querySelectorAll(
        ".student-details-card"
      )
    ];


  detailsList.forEach(
    details => {

      const icon =
        details.querySelector(
          ".student-toggle-icon"
        );


      function updateIcon() {

        if (icon) {

          icon.textContent =
            details.open
              ? "▼"
              : "▶";
        }
      }


      updateIcon();


      details.addEventListener(
        "toggle",
        () => {

          updateIcon();


          if (!details.open) {

            return;
          }


          detailsList.forEach(
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
        "id,email,display_name,is_admin,is_active,created_at,activated_at,auto_blocked,blocked_at,blocked_reason"
      )
      .order(
        "created_at",
        {
          ascending: false
        }
      );


  if (error) {

    console.error(error);

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
        "user_id,course_code,section_name,started_at,ended_at,active_seconds"
      )
      .order(
        "started_at",
        {
          ascending: false
        }
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
      <span>
        Estudiantes
      </span>
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
      <span>
        Activos
      </span>
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
      <span>
        Bloqueados
      </span>
    </div>

  `;


  const admins =
    profiles.filter(
      profile =>
        profile.is_admin
    );


  const adminHtml =
    admins
      .map(
        profile => `

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

              <span class="status active">
                Administrador
              </span>

            </div>

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


          const summary =
            buildStudySummary(
              activityMap.get(
                profile.id
              ) || []
            );


          const switches =
            COURSES.map(
              course => {

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
                        data-id="${profile.id}"
                        data-code="${course.code}"
                        ${
                          hasAccess
                            ? "checked"
                            : ""
                        }
                      >

                      <span class="slider"></span>

                    </label>

                  </div>

                `;
              }
            )
            .join("");


          const statusText =
            profile.is_active
              ? "Activo"
              : profile.auto_blocked
                ? "Bloqueado por inactividad"
                : "Bloqueado";


          return `

            <details
              class="student-admin-card student-details-card"
              data-search="${escapeHtml(
                `${
                  profile.display_name || ""
                } ${
                  profile.email || ""
                } ${statusText}`
              )}"
            >

              <summary
                class="student-admin-head student-summary"
                style="
                  cursor:pointer;
                  list-style:none;
                "
              >

                <div
                  style="
                    display:flex;
                    align-items:center;
                    gap:10px;
                  "
                >

                  <span class="student-toggle-icon">
                    ▶
                  </span>

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

                </div>


                <span
                  class="status ${
                    profile.is_active
                      ? "active"
                      : "blocked"
                  }"
                >
                  ${escapeHtml(
                    statusText
                  )}
                </span>

              </summary>


              <div
                style="
                  margin-top:16px;
                  padding-top:14px;
                  border-top:
                    1px solid rgba(148,163,184,.18);
                "
              >

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

        input.addEventListener(
          "change",
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

              console.error(error);


              input.checked =
                !newStatus;


              alert(
                "No se pudo cambiar la cuenta."
              );
            }


            input.disabled =
              false;


            await loadUsers();
          }
        );
      }
    );


  document
    .querySelectorAll(
      ".course-access-switch"
    )
    .forEach(
      input => {

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

              console.error(error);


              input.checked =
                !giveAccess;


              alert(
                "No se pudo cambiar el acceso."
              );
            }


            input.disabled =
              false;


            await loadUsers();
          }
        );
      }
    );
}


$("refreshUsers").onclick =
  loadUsers;


/* ============================================================
   AUTH
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


        $("logoutBtn")
          .classList
          .add(
            "hidden"
          );


        showOnly(
          "authView"
        );
      }
    }
  );


/* ============================================================
   COMPROBAR BLOQUEO
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


    if (
      !session ||
      currentProfile?.is_admin
    ) {

      return;
    }


    const {
      data:
        profile,

      error
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
          session.user.id
        )
        .single();


    if (error) {

      return;
    }


    currentProfile = {
      ...currentProfile,
      ...profile
    };


    if (
      !profile.is_active
    ) {

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
   CERRAR PÁGINA
   ============================================================ */

window.addEventListener(
  "pagehide",
  () => {

    saveStudyTime();
  }
);


/* ============================================================
   INICIAR
   ============================================================ */

await loadSession();
