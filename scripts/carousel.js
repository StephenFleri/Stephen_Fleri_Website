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

document.addEventListener("scroll", (e) => {
  if (window.innerWidth < 1100) {
    slide.style.transform = `translate3d(0, 0, 0)`;
    handleMobileScroll();
    return;
  }
  transform(container);
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

// If scrolling on comp/perf/teacher, & in scroll direction, scroll remaining, don't scroll div.
function handleMobileScroll() {
  const slide = document.querySelector(".carousel_slide");
  const slideParent = slide.parentElement;

  // Get scroll positions and dimensions
  const slideRect = slide.getBoundingClientRect();
  const parentRect = slideParent.getBoundingClientRect();

  // Calculate if there's more content to scroll
  const hasMoreToScroll = slideRect.bottom > parentRect.bottom;
  const isAtTop = slideRect.top >= parentRect.top;
  const isAtBottom = slideRect.bottom <= parentRect.bottom;

  // Prevent default scroll behavior when needed
  if (hasMoreToScroll) {
    slideParent.style.overflowY = "hidden";
    slide.style.overflowY = "auto";

    // Only allow parent scroll when at the boundaries
    if ((isAtTop && event.deltaY < 0) || (isAtBottom && event.deltaY > 0)) {
      slide.style.overflowY = "hidden";
      slideParent.style.overflowY = "auto";
    }
  } else {
    // Reset scroll behavior when no more content
    slide.style.overflowY = "hidden";
    slideParent.style.overflowY = "auto";
  }
}
