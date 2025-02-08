const listItems = Array.from(document.querySelectorAll(".services-list"));
const compositionListItems = Array.from(
  document.querySelectorAll(".compositions-list")
);

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
const title = document.querySelector(".js-title");
const notes = document.querySelector(".js-notes");
window.addEventListener("scroll", () => {
  let distance = window.scrollY;
  if (distance > 1000) {
    return;
  } else {
    title.style.transform = `translateY(-${distance * 0.2}px)`;
    notes.style.transform = `translateY(-${distance * 0.2}px)`;
  }
});
