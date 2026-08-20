const allowedScreens = ["setup", "today", "selected", "reflect"];
const screens = [...document.querySelectorAll("[data-screen]")];
const progress = [...document.querySelectorAll("[data-progress]")];
const selectedQuote = document.querySelector("[data-selected-quote]");
const todayReveal = document.querySelector("[data-today-reveal]");

function requestedScreen() {
  const screen = new URLSearchParams(window.location.search).get("screen");
  return allowedScreens.includes(screen) ? screen : "setup";
}

function showScreen(name, updateUrl = true) {
  document.querySelector(".phone").scrollTop = 0;
  screens.forEach((screen) => {
    screen.hidden = screen.dataset.screen !== name;
  });
  progress.forEach((marker) => {
    marker.classList.toggle("is-active", marker.dataset.progress === name);
  });

  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set("screen", name);
    window.history.replaceState({}, "", url);
  }

}

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.go));
});

document.querySelectorAll("[data-intention]").forEach((button) => {
  button.addEventListener("click", () => {
    selectedQuote.textContent = `“${button.dataset.intention}”`;
    showScreen("selected");
  });
});

document.querySelectorAll(".setting-option input").forEach((input) => {
  input.addEventListener("change", () => {
    document.querySelectorAll(".setting-option").forEach((option) => {
      const radio = option.querySelector("input");
      option.classList.toggle("is-selected", radio.checked);
    });
  });
});

document.querySelectorAll("[data-reflection]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-reflection]").forEach((option) => {
      option.classList.toggle("is-selected", option === button);
    });
    todayReveal.hidden = false;
  });
});

document.querySelector("[data-restart]").addEventListener("click", () => {
  todayReveal.hidden = true;
  document.querySelectorAll("[data-reflection]").forEach((option) => {
    option.classList.remove("is-selected");
  });
  showScreen("setup");
});

showScreen(requestedScreen(), false);
