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

document.querySelectorAll(".course-action").forEach((button) => {
  button.addEventListener("click", () => {
    const courseName = button.dataset.course;
    const selectedCourseNote = document.getElementById("selected-course-note");
    const selectedCourseName = document.getElementById("selected-course-name");

    if (selectedCourseNote && selectedCourseName) {
      selectedCourseName.textContent = courseName;
      selectedCourseNote.hidden = false;
    }

    telegram?.HapticFeedback?.impactOccurred("light");
    scrollToSection("matching");
  });
});

document.querySelectorAll(".option-button").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".option-button")
      .forEach((item) => item.classList.remove("selected"));

    button.classList.add("selected");

    telegram?.HapticFeedback?.selectionChanged();
  });
});

document.querySelectorAll(".bottom-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document
      .querySelectorAll(".bottom-nav a")
      .forEach((item) => item.classList.remove("active"));

    link.classList.add("active");
  });
});
