const countdownRoot = document.querySelector("[data-countdown]");
const revealItems = document.querySelectorAll(".reveal");
const leafProbes = document.querySelectorAll(".leaf-probe");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const countdownUnitNodes = countdownRoot
  ? {
      days: countdownRoot.querySelector("[data-unit='days']"),
      hours: countdownRoot.querySelector("[data-unit='hours']"),
      minutes: countdownRoot.querySelector("[data-unit='minutes']"),
      seconds: countdownRoot.querySelector("[data-unit='seconds']"),
    }
  : null;

function pad(value) {
  return String(value).padStart(2, "0");
}

function setCountdownUnit(unit, value) {
  if (!countdownUnitNodes || !countdownUnitNodes[unit]) {
    return;
  }

  const node = countdownUnitNodes[unit];
  const digits = node.querySelectorAll(".countdown-digit");
  if (digits.length !== value.length) {
    node.textContent = value;
    node.setAttribute("aria-label", value);
    return;
  }

  node.setAttribute("aria-label", value);

  value.split("").forEach((digit, index) => {
    const digitNode = digits[index];
    if (!digitNode || digitNode.textContent === digit) {
      return;
    }

    digitNode.textContent = digit;

    if (reducedMotionQuery.matches) {
      return;
    }

    digitNode.classList.remove("is-updating");
    void digitNode.offsetWidth;
    window.requestAnimationFrame(() => {
      digitNode.classList.add("is-updating");
    });
  });
}

function initCountdownAnimations() {
  if (!countdownUnitNodes) {
    return;
  }

  Object.values(countdownUnitNodes).forEach((node) => {
    node?.querySelectorAll(".countdown-digit").forEach((digitNode) => {
      digitNode.addEventListener("animationend", () => {
        digitNode.classList.remove("is-updating");
      });
    });
  });
}

function updateCountdown() {
  if (!countdownRoot) {
    return;
  }

  const targetValue = countdownRoot.getAttribute("data-countdown");
  const targetDate = new Date(targetValue);
  const now = new Date();
  const diff = Math.max(targetDate.getTime() - now.getTime(), 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  setCountdownUnit("days", pad(days));
  setCountdownUnit("hours", pad(hours));
  setCountdownUnit("minutes", pad(minutes));
  setCountdownUnit("seconds", pad(seconds));
}

function initReveal() {
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealItems.forEach((item) => observer.observe(item));
}

function updateLeafParallax() {
  const scrollY = window.scrollY || window.pageYOffset;

  leafProbes.forEach((leaf) => {
    const speedValue = getComputedStyle(leaf).getPropertyValue("--parallax-speed").trim();
    const speed = Number.parseFloat(speedValue || "0");
    const offset = Math.round(scrollY * speed);
    leaf.style.setProperty("--parallax-offset", `${offset}px`);
  });
}

function initLeafParallax() {
  if (!leafProbes.length || reducedMotionQuery.matches) {
    return;
  }

  let ticking = false;

  const requestUpdate = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(() => {
      updateLeafParallax();
      ticking = false;
    });
  };

  updateLeafParallax();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
}

updateCountdown();
initReveal();
initLeafParallax();
initCountdownAnimations();
window.setInterval(updateCountdown, 1000);
