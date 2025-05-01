import { svgDB } from "./svgDB.js";

export const addSVG = () => {
  const compositionDiv = document.querySelector(".compositions");

  // Create a container div for the composition SVGs
  const compositionDecorationDiv = document.createElement("div");
  compositionDecorationDiv.classList.add("js-composition-decoration-div");

  // Style the compositionDecorationDiv
  compositionDecorationDiv.setAttribute(
    "style",
    "position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: transparent; pointer-events: none; z-index: 0"
  );

  // Helper function for creating svg elements
  const createSVGs = (name, svgSrc) => {
    const svgImg = document.createElement("img");
    svgImg.classList.add(name, "svg-page-decoration");
    svgImg.setAttribute("src", svgSrc);
    svgImg.setAttribute("style", "position: absolute;");
    compositionDecorationDiv.append(svgImg);
  };

  // Iterate through the images to add them one at a time
  const SVGs = Object.values(svgDB);
  SVGs.forEach((svg) => {
    if (
      svg.name === "upquavers" ||
      svg.name === "downquavers" ||
      svg.name === "minimrest"
    ) {
      createSVGs(svg.name, svg.src);
    }
  });
  compositionDiv.appendChild(compositionDecorationDiv);

  const contactDiv = document.querySelector(".contact");

  // Create a comtainer div for the contact SVGs
  const contactDecorationDiv = document.createElement("div");

  // Style the contactDecorationDiv
  contactDecorationDiv.setAttribute(
    "style",
    "position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: transparent; pointer-events: none; z-index: 0"
  );

  const createContactSVGs = (name, svgSrc) => {
    const svgImg = document.createElement("img");
    svgImg.classList.add(name, "svg-page-decoration");
    svgImg.setAttribute("src", svgSrc);
    svgImg.setAttribute("style", "position: absolute;");
    contactDecorationDiv.append(svgImg);
  };

  // Iterate through the images to add them one at a time
  SVGs.forEach((svg) => {
    if (
      svg.name === "bassclef" ||
      svg.name === "fermata" ||
      svg.name === "contactminimrest"
    ) {
      createContactSVGs(svg.name, svg.src);
    }
  });
  contactDiv.appendChild(contactDecorationDiv);

  const constellation = document.createElement("div");
  constellation.classList.add("constellation");

  constellation.innerHTML = `<svg
  width="100%"
  height="100%"
  viewBox="0 -5 100 100"
  preserveAspectRatio="none"
  xmlns="http://www.w3.org/2000/svg">
  <path
    d="M45,75 L11,45 L65,60 L80,28 L31,33"
    style="fill:none;stroke:white;stroke-width:2;vector-effect:non-scaling-stroke" />
</svg>`;

  compositionDecorationDiv.append(constellation);

  let mobile = false;
  const isMobile = () => {
    mobile = window.innerWidth < 1100 ? true : false;
    if (mobile) {
      constellation.style.opacity = "0";
    } else {
      constellation.style.opacity = "1";
    }
  };
  isMobile();
  window.addEventListener("resize", () => {
    isMobile();
  });
};
