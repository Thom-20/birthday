const opening = document.getElementById("opening");
const envelopeButton = document.getElementById("envelopeButton");
const experience = document.getElementById("experience");
const finalLetterButton = document.getElementById("finalLetterButton");
const loveLetter = document.getElementById("loveLetter");

let hasOpened = false;

function openEnvelope() {
  if (hasOpened) return;
  hasOpened = true;

  envelopeButton.classList.add("open");

  // Keep the "For You!" card visible for a moment before entering the story.
  setTimeout(() => {
    opening.classList.add("finished");
    experience.classList.add("show");
    experience.setAttribute("aria-hidden", "false");
    document.body.classList.remove("locked");

    window.scrollTo({ top: 0, behavior: "instant" });
  }, 2700);
}

envelopeButton.addEventListener("click", openEnvelope);

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.next);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll(".reason-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("open");
  });
});

if (finalLetterButton && loveLetter) {
  finalLetterButton.addEventListener("click", () => {
    loveLetter.classList.add("show");
    finalLetterButton.style.display = "none";
    setTimeout(() => loveLetter.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));


// Final birthday card envelope
const lastEnvelope = document.getElementById("lastEnvelope");
const birthdayCardFinal = document.getElementById("birthdayCardFinal");
if (lastEnvelope && birthdayCardFinal) {
  let finalOpened = false;
  lastEnvelope.addEventListener("click", () => {
    if (finalOpened) return;
    finalOpened = true;
    lastEnvelope.classList.add("open");

    // Let the card visibly rise from the envelope first.
    setTimeout(() => {
      birthdayCardFinal.classList.add("show");
      setTimeout(() => {
        birthdayCardFinal.scrollIntoView({behavior:"smooth", block:"center"});
      }, 180);
    }, 1100);
  });
}
