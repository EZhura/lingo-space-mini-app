const telegram = window.Telegram?.WebApp;

if (telegram) {
  telegram.ready();
  telegram.expand();
  telegram.setHeaderColor("#FFF8F4");
  telegram.setBackgroundColor("#FFF8F4");
}

document.querySelectorAll("[data-scroll-to]").forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.scrollTo;
    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
