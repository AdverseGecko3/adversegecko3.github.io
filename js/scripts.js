const typedTextSpanEn = document.querySelector(".typed-text-en");
const typedTextSpanEs = document.querySelector(".typed-text-es");
const cursorSpanEn = document.querySelector(".cursor-en");
const cursorSpanEs = document.querySelector(".cursor-es");
const startEN = document.getElementById("start-english");
const startES = document.getElementById("start-spanish");

const inputCheckbox = document.querySelector(".check");
const textsToChange = document.querySelectorAll("[data-section]");

const changeLanguage = async (language) => {
  const requestJson = await fetch(`./languages/${language}.json`);
  const texts = await requestJson.json();

  for (const textToChange of textsToChange) {
    const section = textToChange.dataset.section;
    const value = textToChange.dataset.value;

    textToChange.innerHTML = texts[section][value];
  }
};

const textArrayEn = [
  "Eric Barrero",
  "AdverseGecko3",
  "an Android Developer",
  "ready to learn every day!",
];
const textArrayEs = [
  "Eric Barrero",
  "AdverseGecko3",
  "un desarrollador Android",
  "alguien listo para aprender cada día!",
];

const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndexEn = 0;
let textArrayIndexEs = 0;
let charIndexEn = 0;
let charIndexEs = 0;

function typeEn() {
  if (charIndexEn < textArrayEn[textArrayIndexEn].length) {
    if (cursorSpanEn.classList.contains("typing")) {
      cursorSpanEn.classList.add("typing");
    }
    typedTextSpanEn.textContent +=
      textArrayEn[textArrayIndexEn].charAt(charIndexEn);
    charIndexEn++;
    setTimeout(typeEn, typingDelay);
  } else {
    cursorSpanEn.classList.remove("typing");
    setTimeout(eraseEn, newTextDelay);
  }
}

function eraseEn() {
  if (charIndexEn > 0) {
    if (!cursorSpanEn.classList.contains("typing"))
      cursorSpanEn.classList.add("typing");
    typedTextSpanEn.textContent = textArrayEn[textArrayIndexEn].substring(
      0,
      charIndexEn - 1
    );
    charIndexEn--;
    setTimeout(eraseEn, erasingDelay);
  } else {
    cursorSpanEn.classList.remove("typing");
    textArrayIndexEn++;
    if (textArrayIndexEn >= textArrayEn.length) textArrayIndexEn = 0;
    setTimeout(typeEn, typingDelay + 1100);
  }
}

function typeEs() {
  if (charIndexEs < textArrayEs[textArrayIndexEs].length) {
    if (cursorSpanEs.classList.contains("typing")) {
      cursorSpanEs.classList.add("typing");
    }
    typedTextSpanEs.textContent +=
      textArrayEs[textArrayIndexEs].charAt(charIndexEs);
    charIndexEs++;
    setTimeout(typeEs, typingDelay);
  } else {
    cursorSpanEs.classList.remove("typing");
    setTimeout(eraseEs, newTextDelay);
  }
}

function eraseEs() {
  if (charIndexEs > 0) {
    if (!cursorSpanEs.classList.contains("typing"))
      cursorSpanEs.classList.add("typing");
    typedTextSpanEs.textContent = textArrayEs[textArrayIndexEs].substring(
      0,
      charIndexEs - 1
    );
    charIndexEs--;
    setTimeout(eraseEs, erasingDelay);
  } else {
    cursorSpanEs.classList.remove("typing");
    textArrayIndexEs++;
    if (textArrayIndexEs >= textArrayEs.length) textArrayIndexEs = 0;
    setTimeout(typeEs, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (textArrayEn.length) setTimeout(typeEn, 500);
  if (textArrayEn.length) setTimeout(typeEs, 500);
});

inputCheckbox.addEventListener("click", function () {
  if (inputCheckbox.checked) {
    changeLanguage("es");
    startES.style.display = "flex";
    startEN.style.display = "none";
  } else {
    changeLanguage("en");
    startEN.style.display = "flex";
    startES.style.display = "none";
  }
});
