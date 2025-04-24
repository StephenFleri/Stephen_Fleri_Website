const container = document.querySelector(".carousel-container");
const slide = document.querySelector(".carousel_slide");
const html = document.querySelector("html");

window.addEventListener("resize", (e) => {
  if (window.innerWidth < 1100) {
    slide.style.transform = `translate3d(0, 0, 0)`;
  } else {
    html.style.scrollSnapType = "y mandatory";
  }
});

window.addEventListener("scroll", (e) => {
  if (window.innerWidth >= 1100) {
    transform(container);
    return;
  }

  // Check if the sticky container is visible in the viewport
  const rect = slide.parentElement.getBoundingClientRect();
  const isInStickyView = rect.top <= 0 && rect.bottom > 0;

  if (!isInStickyView) return;

  const atTop = slide.scrollTop === 0;
  const atBottom = slide.scrollTop + slide.clientHeight >= slide.scrollHeight;

  // Lock body scroll if inner div is not at edge
  document.body.style.overflowY = !atTop && !atBottom ? "hidden" : "auto";
  // Optional debug logs
  if (atTop) console.log("Slide is at top");
  else if (atBottom) console.log("Slide is at bottom");
  else console.log("Slide is in the middle");
  if (!atTop && !atBottom) {
    document.body.classList.add("scroll-locked");
  } else {
    document.body.classList.remove("scroll-locked");
  }
});

function transform(section) {
  const offsetTop = section.parentElement.offsetTop;
  let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;
  percentage = percentage < 0 ? null : percentage > 230 ? null : percentage;
  if (percentage) {
    html.style.scrollSnapType = "none";
  } else {
    html.style.scrollSnapType = "y mandatory";
  }
  slide.style.transform = `translate3d(-${percentage}vw, 0, 0)`;
}
