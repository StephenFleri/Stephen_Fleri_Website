import { compositionsDB } from "./compositionsDB.js";
import { CompositionsManager } from "./CompositionsManager.js";

const listItems = Array.from(document.querySelectorAll(".services-list"));
const compositionListItems = Array.from(
  document.querySelectorAll(".compositions-list")
);

new CompositionsManager(compositionsDB);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(
    (entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
    },
    {
      rootMargin: "-1000px",
      threshold: 1,
    }
  );
});

listItems.forEach((listItem) => {
  observer.observe(listItem);
});

compositionListItems.forEach((listItem) => {
  observer.observe(listItem);
});

const headshotContainer = document.querySelector(".js-headshot-container");
const heading = document.querySelector(".js-heading-container");
const notes = document.querySelector(".js-notes");
const toTop = document.querySelector(".js-toTop");

window.addEventListener("scroll", () => {
  let distance = window.scrollY;
  if (distance > 1000) {
    toTop.style.opacity = 1;
    toTop.style.pointerEvents = "all";
    return;
  } else {
    toTop.style.opacity = 0;
    toTop.style.pointerEvents = "none";
    heading.style.transform = `translateY(-${distance * 0.2}px)`;
  }
});

toTop.addEventListener("click", () => {
  window.scrollTo(0, 0);
});
