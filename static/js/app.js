const telegram = window.Telegram?.WebApp;

if (telegram) {
  telegram.ready();
  telegram.expand();
  telegram.setHeaderColor("#FFF8F4");
  telegram.setBackgroundColor("#FFF8F4");
}


const translations = {
  "Переключить язык": "Switch language",
  "Язык для ваших реальных целей": "A language for your real-life goals",
  "Подберём программу под ваш уровень, ритм и задачу — без давления и страха ошибиться.": "We will match a programme to your level, pace and goals — without pressure or fear of making mistakes.",
  "Подобрать курс": "Find my course",
  "Смотреть программы": "View programmes",
  "«Хочу говорить без страха»": "“I want to speak without fear”",
  "Онлайн по всему миру · Офлайн в Валенсии": "Online worldwide · In person in Valencia",
  "Программы Lingo Space": "Lingo Space programmes",
  "Выберите язык и цель": "Choose a language and goal",
  "Небольшие группы, живая практика и программа, которую можно встроить в обычную жизнь.": "Small groups, real conversation and a programme that fits into everyday life.",
  "Все": "All",
  "Онлайн": "Online",
  "Валенсия + онлайн": "Valencia + online",
  "Разговорная практика": "Conversation practice",
  "Для тех, кто понимает английский, но теряется, когда нужно говорить.": "For learners who understand English but feel stuck when it is time to speak.",
  "2 раза в неделю": "Twice a week",
  "До 6 человек": "Up to 6 learners",
  "Подобрать этот курс": "Choose this course",
  "Жизнь в Испании": "Life in Spain",
  "Испанский для бытовых ситуаций, общения, документов и уверенной адаптации.": "Spanish for everyday situations, communication, paperwork and confident adaptation.",
  "До 8 человек": "Up to 8 learners",
  "Старт с нуля": "Start from zero",
  "Мягкий и понятный старт для путешествий, культуры и первых живых диалогов.": "A clear and supportive start for travel, culture and your first real conversations.",
  "Работа и карьера": "Work and career",
  "Переговоры, встречи, презентации и переписка без шаблонных учебных диалогов.": "Negotiations, meetings, presentations and emails without artificial textbook dialogues.",
  "1–2 раза в неделю": "Once or twice a week",
  "Не уверены в выборе?": "Not sure which course to choose?",
  "Подберём программу за 2 минуты": "Find your programme in two minutes",
  "Начать подбор": "Start matching",
  "Команда Lingo Space": "The Lingo Space team",
  "Наши преподаватели": "Meet our teachers",
  "Поддерживают, вдохновляют и помогают использовать язык в реальной жизни.": "They support, inspire and help you use the language in real life.",
  "Business English, разговорная практика и подготовка к интервью.": "Business English, conversation practice and interview preparation.",
  "10+ лет опыта": "10+ years of experience",
  "Записаться": "Book a lesson",
  "Испанский для жизни, адаптации в Испании и разговорной практики.": "Spanish for everyday life, adapting to Spain and conversation practice.",
  "8+ лет опыта": "8+ years of experience",
  "Итальянский с нуля, живой разговорный язык, культура и путешествия.": "Italian from zero, real conversation, culture and travel.",
  "7+ лет опыта": "7+ years of experience",
  "Как проходят занятия": "How lessons work",
  "Живая практика": "Real practice",
  "Практикуемся с первого занятия": "Practice from the very first lesson",
  "Говорим, слушаем и применяем язык в реальных ситуациях. Ошибаться здесь нормально — важно пробовать.": "We speak, listen and use the language in real situations. Mistakes are welcome — what matters is trying.",
  "Персональный подбор": "Personal course matching",
  "Найдём ваш формат": "Find the format that suits you",
  "Шесть коротких вопросов — и вы получите рекомендацию, с которой удобно начать.": "Answer six quick questions and get a practical recommendation for your first step.",
  "Вы выбрали:": "You selected:",
  "Выберите один вариант, чтобы продолжить.": "Choose one option to continue.",
  "Назад": "Back",
  "Далее": "Next",
  "Ваш результат": "Your result",
  "Лучший старт для вас:": "Your best starting point:",
  "Записаться на пробный урок": "Book a free trial lesson",
  "Пройти ещё раз": "Start again",
  "Ближайшие старты": "Upcoming groups",
  "Выберите удобную группу": "Choose a group that fits your schedule",
  "Время указано по Валенсии. Для онлайн-занятий поможем сверить расписание с вашим часовым поясом.": "Times are shown in Valencia time. For online lessons, we will help you match the schedule to your time zone.",
  "Офлайн": "In person",
  "июля": "July",
  "августа": "August",
  "2 места": "2 places",
  "4 места": "4 places",
  "5 мест": "5 places",
  "3 места": "3 places",
  "Вт и Чт · 19:00": "Tue & Thu · 19:00",
  "Пн и Ср · 18:30": "Mon & Wed · 18:30",
  "Вт и Пт · 17:30": "Tue & Fri · 17:30",
  "Пн и Чт · 20:00": "Mon & Thu · 20:00",
  "Онлайн · 75 минут": "Online · 75 minutes",
  "Офлайн · Валенсия": "In person · Valencia",
  "Преподаватель Emma": "Teacher: Emma",
  "Преподаватель Lucía": "Teacher: Lucía",
  "Преподаватель Marco": "Teacher: Marco",
  "Не нашли подходящее время?": "Could not find a suitable time?",
  "Оставьте заявку — предложим другой вариант": "Send a request and we will suggest another option",
  "Оставить заявку": "Send a request",
  "Мы на связи": "Get in touch",
  "Связаться с Lingo Space": "Contact Lingo Space",
  "Задайте вопрос или оставьте заявку — ответим и поможем выбрать подходящий формат.": "Ask a question or send a request — we will reply and help you choose the right format.",
  "Точный адрес офлайн-занятий сообщим после записи.": "We will share the exact in-person lesson address after booking.",
  "Часы работы": "Opening hours",
  "Пн–Пт: 9:00–21:00": "Mon–Fri: 9:00–21:00",
  "Сб: 10:00–14:00": "Sat: 10:00–14:00",
  "Открыть Валенсию на карте": "Open Valencia on the map",
  "Часто задаваемые вопросы": "Frequently asked questions",
  "Как проходит пробный урок?": "How does the trial lesson work?",
  "Мы знакомимся, определяем текущий уровень, обсуждаем цель и предлагаем подходящий курс и формат.": "We meet, assess your current level, discuss your goal and suggest a suitable course and format.",
  "Можно ли заниматься онлайн?": "Can I study online?",
  "Да. Онлайн-группы и индивидуальные занятия доступны из любой страны.": "Yes. Online groups and one-to-one lessons are available from any country.",
  "Как понять свой уровень?": "How can I determine my level?",
  "Начните с подбора курса в Mini App. На пробном уроке преподаватель дополнительно уточнит уровень.": "Start with the course matcher in the Mini App. The teacher will confirm your level during the trial lesson.",
  "Есть ли офлайн-занятия?": "Are in-person lessons available?",
  "Да, в Валенсии. Точный адрес и инструкции администратор отправит после подтверждения записи.": "Yes, in Valencia. The administrator will send the exact address and instructions after confirming your booking.",
  "Можно ли изменить группу?": "Can I change groups?",
  "Да. Если время или темп не подходят, администратор предложит другую группу или формат.": "Yes. If the time or pace does not work, the administrator will suggest another group or format.",
  "Основная навигация": "Main navigation",
  "Главная": "Home",
  "Курсы": "Courses",
  "Подбор": "Match",
  "Группы": "Groups",
  "Связь": "Contact",
  "Закрыть форму": "Close form",
  "Бесплатный пробный урок": "Free trial lesson",
  "Познакомимся и выберем лучший старт": "Let us meet and choose the best starting point",
  "Оставьте контакт — администратор уточнит детали и предложит удобное время.": "Leave your contact details and the administrator will confirm the details and suggest a convenient time.",
  "Вы выбрали": "You selected",
  "Изменить": "Change",
  "Ваше имя": "Your name",
  "Например, Анна": "For example, Anna",
  "Telegram, WhatsApp или email": "Telegram, WhatsApp or email",
  "Язык": "Language",
  "Выберите язык": "Choose a language",
  "Курс": "Course",
  "Выберите вариант": "Choose an option",
  "Нужна рекомендация": "I need a recommendation",
  "Удобный формат": "Preferred format",
  "Не знаю": "Not sure",
  "Преподаватель": "Teacher",
  "Не важно": "No preference",
  "Удобное время": "Preferred time",
  "Выберите время": "Choose a time",
  "Утром": "Morning",
  "Днём": "Afternoon",
  "Вечером": "Evening",
  "Обсудить": "Discuss it",
  "Согласен(на) на обработку данных для связи по заявке.": "I agree to the processing of my data for contact about this request.",
  "Отправить заявку": "Send request",
  "Отправляем…": "Sending…",
  "Заявка отправлена": "Request sent",
  "Спасибо! Мы скоро свяжемся с вами": "Thank you! We will contact you soon",
  "Администратор уточнит ваш уровень и предложит удобное время пробного урока.": "The administrator will confirm your level and suggest a convenient time for the trial lesson.",
  "Отправить ещё одну заявку": "Send another request"
};

const localeState = {
  current: sessionStorage.getItem("lingo-language") === "en" ? "en" : "ru",
};

const textNodeRegistry = [];
const attributeRegistry = [];

function normalizeText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function registerStaticTranslations() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;

  while ((node = walker.nextNode())) {
    const ru = normalizeText(node.nodeValue || "");
    if (ru && translations[ru]) {
      textNodeRegistry.push({ node, ru, en: translations[ru] });
    }
  }

  document.querySelectorAll("[placeholder], [aria-label]").forEach((element) => {
    ["placeholder", "aria-label"].forEach((attribute) => {
      const ru = element.getAttribute(attribute);
      if (ru && translations[ru]) {
        attributeRegistry.push({ element, attribute, ru, en: translations[ru] });
      }
    });
  });
}

function localized(value) {
  if (typeof value === "string") return value;
  return value?.[localeState.current] || value?.ru || "";
}

function answerLabel(key, value) {
  const question = matchingQuestions.find((item) => item.key === key);
  const option = question?.options.find((item) => item.value === value);
  return option ? localized(option) : value;
}

function updateStaticTranslations() {
  textNodeRegistry.forEach(({ node, ru, en }) => {
    const original = node.nodeValue || "";
    const leading = original.match(/^\s*/)?.[0] || "";
    const trailing = original.match(/\s*$/)?.[0] || "";
    node.nodeValue = `${leading}${localeState.current === "en" ? en : ru}${trailing}`;
  });

  attributeRegistry.forEach(({ element, attribute, ru, en }) => {
    element.setAttribute(attribute, localeState.current === "en" ? en : ru);
  });

  document.documentElement.lang = localeState.current;
  const switcher = document.querySelector(".language-switch");
  switcher.textContent = localeState.current === "ru" ? "EN" : "RU";
  switcher.setAttribute("aria-pressed", localeState.current === "en" ? "true" : "false");
}

function setLanguage(language) {
  localeState.current = language;
  sessionStorage.setItem("lingo-language", language);
  updateStaticTranslations();
  renderMatchingStep();

  if (!matchingResult.hidden && Object.keys(matchingState.answers).length) {
    showMatchingResult(false);
  }
}

function scrollToSection(targetId) {
  document.getElementById(targetId)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

document.querySelectorAll("[data-scroll-to]").forEach((button) => {
  button.addEventListener("click", () => {
    scrollToSection(button.dataset.scrollTo);
  });
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    document
      .querySelectorAll(".filter-button")
      .forEach((item) => item.classList.remove("active"));

    button.classList.add("active");

    document.querySelectorAll(".course-card").forEach((card) => {
      const shouldShow =
        selectedFilter === "all" ||
        card.dataset.language === selectedFilter;

      card.classList.toggle("is-hidden", !shouldShow);
    });

    telegram?.HapticFeedback?.selectionChanged();
  });
});

const matchingQuestions = [
  {
    key: "language",
    title: { ru: "Какой язык вы хотите изучать?", en: "Which language would you like to learn?" },
    hint: { ru: "Выберите один вариант.", en: "Choose one option." },
    options: [
      { value: "English", ru: "English", en: "English" },
      { value: "Español", ru: "Español", en: "Spanish" },
      { value: "Italiano", ru: "Italiano", en: "Italian" },
    ],
  },
  {
    key: "goal",
    title: { ru: "Какая у вас главная цель?", en: "What is your main goal?" },
    hint: { ru: "Так мы поймём, на чём сделать акцент.", en: "This helps us focus the course on what matters most." },
    options: [
      { value: "Свободнее говорить", ru: "Свободнее говорить", en: "Speak more confidently" },
      { value: "Жить и адаптироваться", ru: "Жить и адаптироваться", en: "Live and adapt abroad" },
      { value: "Работа и карьера", ru: "Работа и карьера", en: "Work and career" },
      { value: "Путешествия и культура", ru: "Путешествия и культура", en: "Travel and culture" },
    ],
  },
  {
    key: "level",
    title: { ru: "Как вы оцениваете свой уровень?", en: "How would you describe your level?" },
    hint: { ru: "Точная оценка не обязательна.", en: "An exact assessment is not required." },
    options: [
      { value: "Начинаю с нуля", ru: "Начинаю с нуля", en: "Starting from zero" },
      { value: "Знаю основы", ru: "Знаю основы", en: "I know the basics" },
      { value: "Понимаю, но трудно говорить", ru: "Понимаю, но трудно говорить", en: "I understand but struggle to speak" },
      { value: "Говорю уверенно", ru: "Говорю уверенно", en: "I speak confidently" },
    ],
  },
  {
    key: "format",
    title: { ru: "Как удобнее заниматься?", en: "How would you prefer to study?" },
    hint: { ru: "Можно будет изменить формат после консультации.", en: "You can change the format after the consultation." },
    options: [
      { value: "Онлайн", ru: "Онлайн", en: "Online" },
      { value: "Офлайн в Валенсии", ru: "Офлайн в Валенсии", en: "In person in Valencia" },
      { value: "Подойдёт любой формат", ru: "Подойдёт любой формат", en: "Either format works" },
    ],
  },
  {
    key: "pace",
    title: { ru: "Какой ритм вам подходит?", en: "What pace works for you?" },
    hint: { ru: "Выбирайте реалистичный вариант.", en: "Choose a realistic schedule." },
    options: [
      { value: "1 раз в неделю", ru: "1 раз в неделю", en: "Once a week" },
      { value: "2 раза в неделю", ru: "2 раза в неделю", en: "Twice a week" },
      { value: "Интенсивно 3 раза в неделю", ru: "Интенсивно 3 раза в неделю", en: "Intensive: three times a week" },
    ],
  },
  {
    key: "group",
    title: { ru: "В какой атмосфере вам комфортнее?", en: "Which learning setting feels best?" },
    hint: { ru: "Все группы остаются небольшими.", en: "All groups remain small." },
    options: [
      { value: "Мини-группа", ru: "Мини-группа", en: "Small group" },
      { value: "Индивидуально", ru: "Индивидуально", en: "One-to-one" },
      { value: "Не знаю — нужна рекомендация", ru: "Не знаю — нужна рекомендация", en: "Not sure — I need advice" },
    ],
  },
];

const matchingState = {
  currentStep: 0,
  answers: {},
  selectedCourse: "",
};

const matchingCard = document.getElementById("matching-card");
const matchingResult = document.getElementById("matching-result");
const questionArea = document.getElementById("matching-question-area");
const stepLabel = document.getElementById("matching-step-label");
const progressValue = document.getElementById("matching-progress-value");
const progressBar = document.getElementById("matching-progress-bar");
const backButton = document.getElementById("matching-back");
const nextButton = document.getElementById("matching-next");
const errorMessage = document.getElementById("matching-error");
const selectedCourseNote = document.getElementById("selected-course-note");
const selectedCourseName = document.getElementById("selected-course-name");

function renderMatchingStep() {
  const question = matchingQuestions[matchingState.currentStep];
  const savedAnswer = matchingState.answers[question.key];
  const progress = Math.round(
    ((matchingState.currentStep + 1) / matchingQuestions.length) * 100
  );

  stepLabel.textContent =
    localeState.current === "en"
      ? `Step ${matchingState.currentStep + 1} of ${matchingQuestions.length}`
      : `Шаг ${matchingState.currentStep + 1} из ${matchingQuestions.length}`;
  progressValue.textContent = `${progress}%`;
  progressBar.style.width = `${progress}%`;
  backButton.disabled = matchingState.currentStep === 0;
  nextButton.textContent =
    matchingState.currentStep === matchingQuestions.length - 1
      ? (localeState.current === "en" ? "Show result" : "Показать результат")
      : (localeState.current === "en" ? "Next" : "Далее");
  errorMessage.hidden = true;

  questionArea.innerHTML = `
    <div class="matching-question">
      <h3>${localized(question.title)}</h3>
      <p>${localized(question.hint)}</p>
      <div class="matching-options">
        ${question.options
          .map(
            (option) => `
              <button
                class="matching-option${savedAnswer === option.value ? " selected" : ""}"
                type="button"
                data-answer="${option.value}"
              >
                ${localized(option)}
              </button>
            `
          )
          .join("")}
      </div>
    </div>
  `;

  questionArea.querySelectorAll(".matching-option").forEach((button) => {
    button.addEventListener("click", () => {
      matchingState.answers[question.key] = button.dataset.answer;

      questionArea
        .querySelectorAll(".matching-option")
        .forEach((item) => item.classList.remove("selected"));

      button.classList.add("selected");
      errorMessage.hidden = true;
      telegram?.HapticFeedback?.selectionChanged();
    });
  });
}

function getRecommendation() {
  const { language, goal, level } = matchingState.answers;

  if (language === "Español") {
    return {
      title: "Español para la vida",
      description: localeState.current === "en"
        ? "Practical Spanish for everyday communication, adaptation and confident life in Spain."
        : "Практичный испанский для повседневного общения, адаптации и уверенной жизни в Испании.",
    };
  }

  if (language === "Italiano") {
    return {
      title: "Italiano da zero",
      description: localeState.current === "en"
        ? "A supportive programme with a clear foundation and plenty of real conversation practice."
        : "Мягкая программа с понятной базой и большим количеством живых разговорных ситуаций.",
    };
  }

  if (
    goal === "Работа и карьера" ||
    level === "Говорю уверенно"
  ) {
    return {
      title: "Business English",
      description: localeState.current === "en"
        ? "English for meetings, emails, presentations and confident professional communication."
        : "Английский для встреч, переписки, презентаций и уверенной профессиональной коммуникации.",
    };
  }

  return {
    title: "English Conversation",
    description: localeState.current === "en"
      ? "A conversation programme that helps you stop translating in your head and speak more freely."
      : "Разговорная программа, которая помогает перестать переводить в голове и начать говорить свободнее.",
  };
}

function showMatchingResult(shouldScroll = true) {
  const recommendation = getRecommendation();

  document.getElementById("result-title").textContent = recommendation.title;
  document.getElementById("result-description").textContent =
    recommendation.description;

  document.getElementById("result-summary").innerHTML = `
    <div class="result-summary-row">
      <span>${localeState.current === "en" ? "Language" : "Язык"}</span>
      <strong>${answerLabel("language", matchingState.answers.language)}</strong>
    </div>
    <div class="result-summary-row">
      <span>${localeState.current === "en" ? "Goal" : "Цель"}</span>
      <strong>${answerLabel("goal", matchingState.answers.goal)}</strong>
    </div>
    <div class="result-summary-row">
      <span>${localeState.current === "en" ? "Format" : "Формат"}</span>
      <strong>${answerLabel("format", matchingState.answers.format)}</strong>
    </div>
    <div class="result-summary-row">
      <span>${localeState.current === "en" ? "Pace" : "Ритм"}</span>
      <strong>${answerLabel("pace", matchingState.answers.pace)}</strong>
    </div>
  `;

  matchingCard.hidden = true;
  matchingResult.hidden = false;
  telegram?.HapticFeedback?.notificationOccurred("success");
  if (shouldScroll) {
    matchingResult.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

nextButton.addEventListener("click", () => {
  const question = matchingQuestions[matchingState.currentStep];

  if (!matchingState.answers[question.key]) {
    errorMessage.hidden = false;
    telegram?.HapticFeedback?.notificationOccurred("error");
    return;
  }

  if (matchingState.currentStep < matchingQuestions.length - 1) {
    matchingState.currentStep += 1;
    renderMatchingStep();
    telegram?.HapticFeedback?.impactOccurred("light");
    return;
  }

  showMatchingResult();
});

backButton.addEventListener("click", () => {
  if (matchingState.currentStep === 0) {
    return;
  }

  matchingState.currentStep -= 1;
  renderMatchingStep();
  telegram?.HapticFeedback?.impactOccurred("light");
});

document.getElementById("matching-restart").addEventListener("click", () => {
  matchingState.currentStep = 0;
  matchingState.answers = {};
  matchingState.selectedCourse = "";
  selectedCourseNote.hidden = true;
  matchingResult.hidden = true;
  matchingCard.hidden = false;
  renderMatchingStep();
  matchingCard.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelectorAll(".course-action").forEach((button) => {
  button.addEventListener("click", () => {
    matchingState.currentStep = 0;
    matchingState.answers = {
      language: button.dataset.languageChoice,
    };
    matchingState.selectedCourse = button.dataset.course;

    selectedCourseName.textContent = button.dataset.course;
    selectedCourseNote.hidden = false;
    matchingResult.hidden = true;
    matchingCard.hidden = false;

    renderMatchingStep();
    telegram?.HapticFeedback?.impactOccurred("light");
    scrollToSection("matching");
  });
});


document.querySelectorAll(".schedule-filter").forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.scheduleFilter;

    document
      .querySelectorAll(".schedule-filter")
      .forEach((item) => item.classList.remove("active"));

    button.classList.add("active");

    document.querySelectorAll(".schedule-card").forEach((card) => {
      const matchesLanguage =
        card.dataset.scheduleLanguage === selectedFilter;
      const matchesFormat =
        card.dataset.scheduleFormat === selectedFilter;
      const shouldShow =
        selectedFilter === "all" ||
        matchesLanguage ||
        matchesFormat;

      card.classList.toggle("is-hidden", !shouldShow);
    });

    telegram?.HapticFeedback?.selectionChanged();
  });
});




const trialModal=document.getElementById("trial-modal");
const trialDialog=trialModal.querySelector(".trial-modal-dialog");
const trialForm=document.getElementById("trial-form");
const trialSuccess=document.getElementById("trial-success");
const trialError=document.getElementById("trial-form-error");
const trialLanguage=document.getElementById("trial-language");
const trialCourse=document.getElementById("trial-course");
const trialTeacher=document.getElementById("trial-teacher");
const trialSelection=document.getElementById("trial-selection");
const trialSelectionText=document.getElementById("trial-selection-text");
let lastFocusedElement=null;

function setTrialSelection(language="",course=""){
  if(language) trialLanguage.value=language;
  if(course) trialCourse.value=course;

  if(language||course){
    trialSelectionText.textContent=[course,language].filter(Boolean).join(" · ");
    trialSelection.hidden=false;
  }
}

function openTrialModal(options={}){
  lastFocusedElement=document.activeElement;

  if(options.language||options.course){
    setTrialSelection(options.language||"",options.course||"");
  }

  if(options.teacher){
    trialTeacher.value=options.teacher;
  }

  trialForm.hidden=false;
  trialSuccess.hidden=true;
  trialError.hidden=true;
  trialModal.hidden=false;
  document.body.classList.add("modal-open");

  requestAnimationFrame(()=>{
    document.getElementById("trial-name").focus();
    trialDialog.scrollTop=0;
  });

  telegram?.HapticFeedback?.impactOccurred("light");
}

function closeTrialModal(){
  trialModal.hidden=true;
  document.body.classList.remove("modal-open");
  lastFocusedElement?.focus?.();
}

document.querySelectorAll("[data-close-trial-modal]").forEach((button)=>{
  button.addEventListener("click",closeTrialModal);
});

document.addEventListener("keydown",(event)=>{
  if(event.key==="Escape"&&!trialModal.hidden){
    closeTrialModal();
  }
});

document.querySelectorAll(".schedule-action").forEach((button)=>{
  button.addEventListener("click",()=>{
    openTrialModal({
      language:button.dataset.trialLanguage,
      course:button.dataset.trialCourse
    });
  });
});

document.querySelectorAll(".teacher-action").forEach((button)=>{
  button.addEventListener("click",()=>{
    openTrialModal({
      language:button.dataset.language,
      course:button.dataset.course,
      teacher:button.dataset.teacher
    });
  });
});

document.querySelectorAll("[data-scroll-to='trial']").forEach((button)=>{
  button.addEventListener("click",(event)=>{
    event.preventDefault();

    const resultTitle=document.getElementById("result-title")?.textContent||"";
    const resultLanguage=matchingState.answers.language||"";

    openTrialModal({
      language:resultTitle?resultLanguage:"",
      course:resultTitle?resultTitle:""
    });
  });
});

document.getElementById("trial-selection-clear").addEventListener("click",()=>{
  trialLanguage.value="";
  trialCourse.value="";
  trialTeacher.value="Не важно";
  trialSelection.hidden=true;
  trialLanguage.focus();
});

trialForm.addEventListener("submit",async(event)=>{
  event.preventDefault();
  trialError.hidden=true;
  trialForm.querySelectorAll(".invalid").forEach((element)=>element.classList.remove("invalid"));

  const required=[
    document.getElementById("trial-name"),
    document.getElementById("trial-contact"),
    trialLanguage,
    trialCourse,
    document.getElementById("trial-time")
  ];

  const invalid=required.find((element)=>!element.value.trim());
  const format=trialForm.querySelector('input[name="format"]:checked');

  if(invalid){
    invalid.classList.add("invalid");
    invalid.focus();
    trialError.textContent=localeState.current === "en" ? "Complete all required fields." : "Заполните все обязательные поля.";
    trialError.hidden=false;
    return;
  }

  if(!format){
    trialError.textContent=localeState.current === "en" ? "Choose your preferred lesson format." : "Выберите удобный формат занятий.";
    trialError.hidden=false;
    return;
  }

  if(!document.getElementById("trial-consent").checked){
    trialError.textContent=localeState.current === "en" ? "Please confirm consent to data processing." : "Подтвердите согласие на обработку данных.";
    trialError.hidden=false;
    return;
  }

  const submit=trialForm.querySelector(".trial-submit");
  const label=trialForm.querySelector(".trial-submit-label");
  const loading=trialForm.querySelector(".trial-submit-loading");
  const telegramUser=telegram?.initDataUnsafe?.user;

  submit.disabled=true;
  label.hidden=true;
  loading.hidden=false;

  try{
    const response=await fetch("/api/trial",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        name:document.getElementById("trial-name").value.trim(),
        contact:document.getElementById("trial-contact").value.trim(),
        language:trialLanguage.value,
        course:trialCourse.value,
        format:format.value,
        preferred_time:document.getElementById("trial-time").value,
        teacher:trialTeacher.value,
        source:telegram?"Telegram Mini App":"Web browser",
        telegram_user_id:telegramUser?.id||null,
        telegram_username:telegramUser?.username||""
      })
    });

    const result=await response.json();

    if(!response.ok||!result.ok){
      throw new Error(result.error||(localeState.current === "en" ? "Could not send the request." : "Не удалось отправить заявку."));
    }

    trialForm.hidden=true;
    trialSuccess.hidden=false;
    trialDialog.scrollTop=0;
    telegram?.HapticFeedback?.notificationOccurred("success");
  }catch(error){
    trialError.textContent=error.message||(localeState.current === "en" ? "Sending failed." : "Ошибка отправки.");
    trialError.hidden=false;
    telegram?.HapticFeedback?.notificationOccurred("error");
  }finally{
    submit.disabled=false;
    label.hidden=false;
    loading.hidden=true;
  }
});

document.getElementById("trial-new-request").addEventListener("click",()=>{
  trialForm.reset();
  trialSelection.hidden=true;
  trialError.hidden=true;
  trialSuccess.hidden=true;
  trialForm.hidden=false;
  trialDialog.scrollTop=0;
  document.getElementById("trial-name").focus();
});

registerStaticTranslations();

document.querySelector(".language-switch").addEventListener("click", () => {
  setLanguage(localeState.current === "ru" ? "en" : "ru");
  telegram?.HapticFeedback?.selectionChanged();
});

updateStaticTranslations();

document.querySelectorAll(".bottom-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document
      .querySelectorAll(".bottom-nav a")
      .forEach((item) => item.classList.remove("active"));

    link.classList.add("active");
  });
});

renderMatchingStep();
