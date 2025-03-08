import { svgDB } from "./svgDB.js";

export const addSVG = () => {
  const compositionDiv = document.querySelector(".compositions");

  // Create a container div for the SVGs
  const decorationDiv = document.createElement("div");

  // Style the decorationdiv
  decorationDiv.setAttribute(
    "style",
    "position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: transparent; pointer-events: none; z-index: 0"
  );

  // Helper function for creating svg elements
  const createSVGs = (name, svgSrc) => {
    const svgImg = document.createElement("img");
    svgImg.classList.add(name, "svg-page-decoration");
    svgImg.setAttribute("src", svgSrc);
    svgImg.setAttribute("style", "position: absolute;");
    decorationDiv.append(svgImg);
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
  compositionDiv.appendChild(decorationDiv);
};
