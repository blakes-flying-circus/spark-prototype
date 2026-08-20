const allowedScreens = ["setup", "today", "selected", "reflect"];
const allowedFlows = ["daily", "setup"];
const screens = [...document.querySelectorAll("[data-screen]")];
const progress = [...document.querySelectorAll("[data-progress]")];
const flowLinks = [...document.querySelectorAll("[data-flow-link]")];
const selectedQuote = document.querySelector("[data-selected-quote]");
const todayReveal = document.querySelector("[data-today-reveal]");
const phone = document.querySelector(".phone");
const progressRegion = document.querySelector(".progress");
const flowHint = document.querySelector("[data-flow-hint]");
const skipTodayButton = document.querySelector("[data-skip-today]");
const skipTodayNote = document.querySelector("[data-skip-note]");

function requestedFlow() {
  const flow = new URLSearchParams(window.location.search).get("flow");
  return allowedFlows.includes(flow) ? flow : "daily";
}

let activeFlow = requestedFlow();

function startScreen(flow = activeFlow) {
  return flow === "setup" ? "setup" : "today";
}

function requestedScreen() {
  const screen = new URLSearchParams(window.location.search).get("screen");
  return allowedScreens.includes(screen) ? screen : startScreen();
}

function resetReflection() {
  todayReveal.hidden = true;
  document.querySelectorAll("[data-reflection]").forEach((option) => {
    option.classList.remove("is-selected");
  });
}

function resetTodaySkip() {
  skipTodayButton.hidden = false;
  skipTodayNote.hidden = true;
}

function syncFlowUi() {
  phone.dataset.flow = activeFlow;
  progressRegion.setAttribute(
    "aria-label",
    activeFlow === "daily" ? "Core daily flow progress" : "First-time setup flow progress",
  );

  flowLinks.forEach((link) => {
    const isActive = link.dataset.flowLink === activeFlow;
    link.classList.toggle("is-active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  flowHint.textContent =
    activeFlow === "daily"
      ? "The core daily flow starts at today’s intention. First-time setup remains available above."
      : "The first-time flow demonstrates reminder consent before continuing into the daily experience.";
}

function showScreen(name, updateUrl = true) {
  phone.scrollTop = 0;
  screens.forEach((screen) => {
    screen.hidden = screen.dataset.screen !== name;
  });
  progress.forEach((marker) => {
    marker.classList.toggle("is-active", marker.dataset.progress === name);
  });

  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set("flow", activeFlow);
    url.searchParams.set("screen", name);
    window.history.replaceState({}, "", url);
  }
}

flowLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    activeFlow = link.dataset.flowLink;
    resetReflection();
    resetTodaySkip();
    syncFlowUi();
    showScreen(startScreen());
  });
});

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

skipTodayButton.addEventListener("click", () => {
  skipTodayButton.hidden = true;
  skipTodayNote.hidden = false;
});

document.querySelector("[data-restart]").addEventListener("click", () => {
  resetReflection();
  resetTodaySkip();
  showScreen(startScreen());
});

syncFlowUi();
showScreen(requestedScreen(), false);
