const intro = document.getElementById("envelopeIntro");
const envelopeButton = document.getElementById("envelopeButton");
const site = document.getElementById("siteContent");

let opening = false;

envelopeButton.addEventListener("click", () => {
  if (opening) return;
  opening = true;

  envelopeButton.classList.add("opened");

  setTimeout(() => {
    envelopeButton.classList.add("reading");
  }, 950);

  setTimeout(() => {
    intro.classList.add("finished");
    site.classList.add("show");
    site.setAttribute("aria-hidden", "false");
    document.body.classList.remove("intro-open");
  }, 2300);
});

const startDate = new Date(2025, 2, 22);

function updateCounter() {
  const now = new Date();

  let y = now.getFullYear() - startDate.getFullYear();
  let m = now.getMonth() - startDate.getMonth();
  let d = now.getDate() - startDate.getDate();

  if (d < 0) {
    d += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    m--;
  }

  if (m < 0) {
    m += 12;
    y--;
  }

  document.getElementById("years").textContent = y;
  document.getElementById("months").textContent = m;
  document.getElementById("days").textContent = d;
}

updateCounter();

const grid = document.getElementById("heartGrid");

for (let i = 1; i <= 24; i++) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "heart-btn reveal";
  b.textContent = String(i).padStart(2, "0") + " ♡";

  b.addEventListener("click", () => {
    b.classList.toggle("open");
    b.textContent = b.classList.contains("open")
      ? `Reason #${i} — we’ll personalize this.`
      : String(i).padStart(2, "0") + " ♡";
  });

  grid.appendChild(b);
}

const giftBtn = document.getElementById("giftBtn");
const giftMessage = document.getElementById("giftMessage");

giftBtn.addEventListener("click", () => {
  giftBtn.classList.toggle("open");
  setTimeout(() => giftMessage.classList.add("show"), 300);
});

const finalEnvelopeBtn = document.getElementById("finalEnvelopeBtn");
const finalLetter = document.getElementById("finalLetter");

finalEnvelopeBtn.addEventListener("click", () => {
  finalEnvelopeBtn.classList.add("open");
  setTimeout(() => finalLetter.classList.add("show"), 450);
});

const obs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
