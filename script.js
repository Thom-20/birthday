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


// Final birthday card envelope — auto-scroll so the animation stays visible on phone
const lastEnvelope = document.getElementById("lastEnvelope");
const birthdayCardFinal = document.getElementById("birthdayCardFinal");

if (lastEnvelope && birthdayCardFinal) {
  let finalOpened = false;

  lastEnvelope.addEventListener("click", () => {
    if (finalOpened) return;
    finalOpened = true;

    // Open the envelope immediately.
    lastEnvelope.classList.add("open");

    // As the card begins to rise, move the viewport down so the lower half
    // of the envelope and the emerging card remain visible.
    setTimeout(() => {
      const rect = lastEnvelope.getBoundingClientRect();
      const targetTop =
        window.scrollY +
        rect.top +
        rect.height * 0.33 -
        window.innerHeight * 0.22;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: "smooth"
      });
    }, 360);

    // Reveal the full birthday card.
    setTimeout(() => {
      birthdayCardFinal.classList.add("show");

      // After it expands, scroll again to place the greeting comfortably
      // inside the phone viewport.
      setTimeout(() => {
        const cardRect = birthdayCardFinal.getBoundingClientRect();
        const targetTop =
          window.scrollY +
          cardRect.top -
          Math.max(26, window.innerHeight * 0.08);

        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: "smooth"
        });
      }, 420);
    }, 1200);
  });
}
