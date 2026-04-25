const countdownRoot = document.querySelector("[data-countdown]");
const revealItems = document.querySelectorAll(".reveal");

function pad(value) {
  return String(value).padStart(2, "0");
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

  countdownRoot.querySelector("[data-unit='days']").textContent = pad(days);
  countdownRoot.querySelector("[data-unit='hours']").textContent = pad(hours);
  countdownRoot.querySelector("[data-unit='minutes']").textContent = pad(minutes);
  countdownRoot.querySelector("[data-unit='seconds']").textContent = pad(seconds);
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

updateCountdown();
initReveal();
window.setInterval(updateCountdown, 1000);
