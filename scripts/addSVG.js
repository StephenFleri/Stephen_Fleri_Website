import { svgDB } from "./svgDB.js";

export const addSVG = () => {
  const compositionDiv = document.querySelector(".compositions");

  // Create a container div for the composition SVGs
  const compositionDecorationDiv = document.createElement("div");

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
};
