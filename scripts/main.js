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

const svg = document.querySelector(".svg");

const paths = Array.from(document.querySelector(".path").children);
const form = document.querySelector(".form");
const formChildren = Array.from(form.children);

// Set CSS for each path
paths.forEach((path) => {
  path.setAttribute("fill", "transparent");
  path.setAttribute("stroke-width", 0.2);
  path.setAttribute("stroke-dasharray", path.getTotalLength());
  path.setAttribute("stroke-dashoffset", path.getTotalLength());
  path.classList.add("path-animation");
  path.classList.add("js-path");
});

// Bring form to the front
form.style.zIndex = 2;

// Stop form from being selectable
formChildren.forEach((child) => {
  child.classList.add("no-select");
});

const contactObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("path-animation", entry.isIntersecting);
    if (
      entry.isIntersecting &&
      Array.from(entry.target.classList).includes("js-path")
    ) {
      setTimeout(() => {
        svg.style.opacity = 0;
      }, 700);

      setTimeout(() => {
        form.classList.add("show");
        formChildren.forEach((child) => {
          child.classList.remove("no-select");
        });
      }, 3000);
    } else {
      svg.style.opacity = 1;
      form.classList.remove("show");
      formChildren.forEach((child) => {
        child.classList.add("no-select");
      });
    }
  });
});

paths.forEach((path) => {
  contactObserver.observe(path);
});

listItems.forEach((listItem) => {
  observer.observe(listItem);
});

compositionListItems.forEach((listItem) => {
  observer.observe(listItem);
});

const textArea = document.querySelector("textarea");
const charlimit = document.querySelector(".charlimit > p");
charlimit.innerText = "0 / 1000";
textArea.addEventListener("input", () => {
  charlimit.innerText = `${textArea.value.length} / 1000`;
});
