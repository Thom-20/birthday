const startDate = new Date(2025, 2, 22); // March = 2

function updateRelationshipCounter() {
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();

  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  document.getElementById("years").textContent = years;
  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days;
}

updateRelationshipCounter();

const placeholderReasons = [
  "Reason #1 — we’ll personalize this.",
  "Reason #2 — we’ll personalize this.",
  "Reason #3 — we’ll personalize this.",
  "Reason #4 — we’ll personalize this.",
  "Reason #5 — we’ll personalize this.",
  "Reason #6 — we’ll personalize this.",
  "Reason #7 — we’ll personalize this.",
  "Reason #8 — we’ll personalize this.",
  "Reason #9 — we’ll personalize this.",
  "Reason #10 — we’ll personalize this.",
  "Reason #11 — we’ll personalize this.",
  "Reason #12 — we’ll personalize this.",
  "Reason #13 — we’ll personalize this.",
  "Reason #14 — we’ll personalize this.",
  "Reason #15 — we’ll personalize this.",
  "Reason #16 — we’ll personalize this.",
  "Reason #17 — we’ll personalize this.",
  "Reason #18 — we’ll personalize this.",
  "Reason #19 — we’ll personalize this.",
  "Reason #20 — we’ll personalize this.",
  "Reason #21 — we’ll personalize this.",
  "Reason #22 — we’ll personalize this.",
  "Reason #23 — we’ll personalize this.",
  "Reason #24 — the most special one."
];

const heartGrid = document.getElementById("heartGrid");

placeholderReasons.forEach((reason, index) => {
  const btn = document.createElement("button");
  btn.className = "heart-btn reveal";
  btn.innerHTML = `${String(index + 1).padStart(2, "0")} ♡`;
  btn.addEventListener("click", () => {
    btn.classList.toggle("open");
    btn.textContent = btn.classList.contains("open")
      ? reason
      : `${String(index + 1).padStart(2, "0")} ♡`;
  });
  heartGrid.appendChild(btn);
});

const giftBtn = document.getElementById("giftBtn");
const giftMessage = document.getElementById("giftMessage");

giftBtn.addEventListener("click", () => {
  giftBtn.classList.toggle("open");
  setTimeout(() => giftMessage.classList.add("show"), 350);
});

const envelopeBtn = document.getElementById("envelopeBtn");
const finalLetter = document.getElementById("finalLetter");

envelopeBtn.addEventListener("click", () => {
  envelopeBtn.classList.add("open");
  setTimeout(() => finalLetter.classList.add("show"), 500);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
