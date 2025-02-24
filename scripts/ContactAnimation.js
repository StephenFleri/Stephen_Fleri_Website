export class ContactAnimation {
  constructor() {
    this.svg = document.querySelector(".js-phone-svg");
    this.paths = Array.from(document.querySelector(".path").children);
    this.form = document.querySelector(".form");
    this.formChildren = Array.from(this.form.children);
    this.contactSection = document.querySelector("#contact");
    this.timeouts = [];

    this.initializePaths();
    this.setupForm();
    this.setupIntersectionObserver();
    this.setupCharacterCounter();

    this.animationState = {
      isAnimating: false,
      svgComplete: false,
    };
  }

  initializePaths() {
    this.paths.forEach((path) => {
      path.setAttribute("fill", "transparent");
      path.setAttribute("stroke-width", "0.2");
      path.setAttribute("stroke-dasharray", path.getTotalLength());
      path.setAttribute("stroke-dashoffset", path.getTotalLength());
      path.classList.add("js-path");
    });
  }

  setupForm() {
    this.form.style.zIndex = "2";
    this.formChildren.forEach((child) => child.classList.add("no-select"));
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
            this.startAnimation();
          } else {
            // Only reset if we've scrolled significantly away
            if (entry.intersectionRatio < 0.3) {
              this.resetAnimation();
            }
          }
        });
      },
      {
        threshold: [0.3, 0.7], // Add multiple thresholds
        rootMargin: "0px",
      }
    );

    this.observer.observe(this.contactSection);
  }

  startAnimation() {
    if (this.animationState.isAnimating) return;

    this.animationState.isAnimating = true;
    this.animationState.svgComplete = false;

    // Reset everything first
    this.resetAnimation();

    // Start SVG animation
    this.paths.forEach((path) => path.classList.add("path-animation"));

    // Coordinate timings
    this.timeouts = [
      // SVG fade out
      setTimeout(() => {
        this.svg.style.opacity = "0";
        this.animationState.svgComplete = true;
      }, 2500), // Adjust timing to match SVG animation

      // Form fade in
      setTimeout(() => {
        if (this.animationState.svgComplete) {
          this.form.classList.add("show");
          this.formChildren.forEach((child) =>
            child.classList.remove("no-select")
          );
        }
      }, 3000),
    ];
  }

  resetAnimation() {
    this.clearTimeouts();
    this.animationState.isAnimating = false;
    this.animationState.svgComplete = false;

    this.svg.style.opacity = "1";
    this.form.classList.remove("show");

    this.paths.forEach((path) => {
      path.classList.remove("path-animation");
      // Reset the stroke-dashoffset
      path.style.strokeDashoffset = path.getTotalLength();
    });

    this.formChildren.forEach((child) => child.classList.add("no-select"));
  }

  clearTimeouts() {
    this.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.timeouts = [];
  }

  setupCharacterCounter() {
    const textArea = document.querySelector("textarea");
    const charlimit = document.querySelector(".charlimit > p");
    charlimit.innerText = "0 / 1000";

    textArea.addEventListener("input", () => {
      charlimit.innerText = `${textArea.value.length} / 1000`;
    });
  }

  cleanup() {
    this.clearTimeouts();
    this.observer.disconnect();
  }
}
