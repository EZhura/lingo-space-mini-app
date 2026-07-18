const telegram = window.Telegram?.WebApp;

if (telegram) {
  telegram.ready();
  telegram.expand();
  telegram.setHeaderColor("#FFF8F4");
  telegram.setBackgroundColor("#FFF8F4");
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
    title: "Какой язык вы хотите изучать?",
    hint: "Выберите один вариант.",
    options: ["English", "Español", "Italiano"],
  },
  {
    key: "goal",
    title: "Какая у вас главная цель?",
    hint: "Так мы поймём, на чём сделать акцент.",
    options: [
      "Свободнее говорить",
      "Жить и адаптироваться",
      "Работа и карьера",
      "Путешествия и культура",
    ],
  },
  {
    key: "level",
    title: "Как вы оцениваете свой уровень?",
    hint: "Точная оценка не обязательна.",
    options: [
      "Начинаю с нуля",
      "Знаю основы",
      "Понимаю, но трудно говорить",
      "Говорю уверенно",
    ],
  },
  {
    key: "format",
    title: "Как удобнее заниматься?",
    hint: "Можно будет изменить формат после консультации.",
    options: [
      "Онлайн",
      "Офлайн в Валенсии",
      "Подойдёт любой формат",
    ],
  },
  {
    key: "pace",
    title: "Какой ритм вам подходит?",
    hint: "Выбирайте реалистичный вариант.",
    options: [
      "1 раз в неделю",
      "2 раза в неделю",
      "Интенсивно 3 раза в неделю",
    ],
  },
  {
    key: "group",
    title: "В какой атмосфере вам комфортнее?",
    hint: "Все группы остаются небольшими.",
    options: [
      "Мини-группа",
      "Индивидуально",
      "Не знаю — нужна рекомендация",
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
    `Шаг ${matchingState.currentStep + 1} из ${matchingQuestions.length}`;
  progressValue.textContent = `${progress}%`;
  progressBar.style.width = `${progress}%`;
  backButton.disabled = matchingState.currentStep === 0;
  nextButton.textContent =
    matchingState.currentStep === matchingQuestions.length - 1
      ? "Показать результат"
      : "Далее";
  errorMessage.hidden = true;

  questionArea.innerHTML = `
    <div class="matching-question">
      <h3>${question.title}</h3>
      <p>${question.hint}</p>
      <div class="matching-options">
        ${question.options
          .map(
            (option) => `
              <button
                class="matching-option${savedAnswer === option ? " selected" : ""}"
                type="button"
                data-answer="${option}"
              >
                ${option}
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
      description:
        "Практичный испанский для повседневного общения, адаптации и уверенной жизни в Испании.",
    };
  }

  if (language === "Italiano") {
    return {
      title: "Italiano da zero",
      description:
        "Мягкая программа с понятной базой и большим количеством живых разговорных ситуаций.",
    };
  }

  if (
    goal === "Работа и карьера" ||
    level === "Говорю уверенно"
  ) {
    return {
      title: "Business English",
      description:
        "Английский для встреч, переписки, презентаций и уверенной профессиональной коммуникации.",
    };
  }

  return {
    title: "English Conversation",
    description:
      "Разговорная программа, которая помогает перестать переводить в голове и начать говорить свободнее.",
  };
}

function showMatchingResult() {
  const recommendation = getRecommendation();

  document.getElementById("result-title").textContent = recommendation.title;
  document.getElementById("result-description").textContent =
    recommendation.description;

  document.getElementById("result-summary").innerHTML = `
    <div class="result-summary-row">
      <span>Язык</span>
      <strong>${matchingState.answers.language}</strong>
    </div>
    <div class="result-summary-row">
      <span>Цель</span>
      <strong>${matchingState.answers.goal}</strong>
    </div>
    <div class="result-summary-row">
      <span>Формат</span>
      <strong>${matchingState.answers.format}</strong>
    </div>
    <div class="result-summary-row">
      <span>Ритм</span>
      <strong>${matchingState.answers.pace}</strong>
    </div>
  `;

  matchingCard.hidden = true;
  matchingResult.hidden = false;
  telegram?.HapticFeedback?.notificationOccurred("success");
  matchingResult.scrollIntoView({ behavior: "smooth", block: "start" });
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
    trialError.textContent="Заполните все обязательные поля.";
    trialError.hidden=false;
    return;
  }

  if(!format){
    trialError.textContent="Выберите удобный формат занятий.";
    trialError.hidden=false;
    return;
  }

  if(!document.getElementById("trial-consent").checked){
    trialError.textContent="Подтвердите согласие на обработку данных.";
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
      throw new Error(result.error||"Не удалось отправить заявку.");
    }

    trialForm.hidden=true;
    trialSuccess.hidden=false;
    trialDialog.scrollTop=0;
    telegram?.HapticFeedback?.notificationOccurred("success");
  }catch(error){
    trialError.textContent=error.message||"Ошибка отправки.";
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

document.querySelectorAll(".bottom-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document
      .querySelectorAll(".bottom-nav a")
      .forEach((item) => item.classList.remove("active"));

    link.classList.add("active");
  });
});

renderMatchingStep();
