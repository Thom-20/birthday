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


// Final birthday card envelope — tap once to open, tap again to close.
const lastEnvelope = document.getElementById("lastEnvelope");
const birthdayCardFinal = document.getElementById("birthdayCardFinal");

if (lastEnvelope && birthdayCardFinal) {
  let finalOpened = false;
  let finalAnimating = false;

  lastEnvelope.setAttribute("aria-expanded", "false");

  lastEnvelope.addEventListener("click", () => {
    if (finalAnimating) return;
    finalAnimating = true;

    if (!finalOpened) {
      // OPEN: flap first, then the card rises and the full message appears.
      finalOpened = true;
      lastEnvelope.classList.add("open");
      lastEnvelope.setAttribute("aria-expanded", "true");

      // Keep the envelope animation visible on a phone screen.
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

      setTimeout(() => {
        birthdayCardFinal.classList.add("show");

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

      // Unlock only after the opening sequence has finished.
      setTimeout(() => {
        finalAnimating = false;
      }, 1850);
    } else {
      // CLOSE: hide the full message first, then let the small card slide
      // back into the envelope before the flap closes.
      finalOpened = false;
      lastEnvelope.setAttribute("aria-expanded", "false");
      birthdayCardFinal.classList.remove("show");

      setTimeout(() => {
        lastEnvelope.classList.remove("open");
      }, 700);

      setTimeout(() => {
        finalAnimating = false;
      }, 1550);
    }
  });
}
