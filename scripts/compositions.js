const samplePageButtons = document.querySelectorAll(".show-sample");
const sampleRecordingButtons = document.querySelectorAll(".sample-recording");
const durations = document.querySelectorAll(".duration");
const years = document.querySelectorAll(".year");
const compositions = document.querySelector(".compositions");
const compositionsList = document.querySelector("#compositions-list");

const compositionsDB = [
  {
    name: "Invocation",
    description: "This piece was written by Stephen Fleri.",
    year: "2016",
    duration: "5:00",
    difficulty: "",
    instrumentation: "Solo Clarinet in B-flat",
    price: "$25.00",
    samplePage: "./invocation_sample.png",
    sampleRecording: "",
  },
  {
    name: "Phantasy",
    description: "This piece was written by Stephen Fleri.",
    year: "2016",
    duration: "10:48",
    difficulty: "",
    instrumentation: "Solo Piano",
    price: "$25.00",
    samplePage: "",
    sampleRecording:
      "https://soundcloud.com/stephen-fleri/phantasy?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
  },
  {
    name: "Hiraeth",
    description: "This piece was written by Stephen Fleri.",
    year: "",
    duration: "3:10",
    difficulty: "",
    instrumentation: "Solo Piano",
    price: "$25.00",
    samplePage: "",
    sampleRecording:
      "https://soundcloud.com/stephen-fleri/looky?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
  },
  {
    name: "Swarm",
    description: "This piece was written by Stephen Fleri.",
    year: "",
    duration: "4:30",
    difficulty: "",
    instrumentation:
      "Mixed Ensemble (Clarinet in B-flat 1 & 2, Piano 1 & 2, Flugelhorn 1 & 2, Trombone)",
    price: "$25.00",
    samplePage: "",
    sampleRecording:
      "https://soundcloud.com/stephen-fleri/looky?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
  },
  {
    name: "Kill The Meerkats",
    description: "This piece was written by Stephen Fleri.",
    year: "",
    duration: "3:00",
    difficulty: "",
    instrumentation:
      "Mixed Ensemble (Clarinet in B-vlat, Bassoon, Electric Guitar, Piano)",
    price: "$25.00",
    samplePage: "",
    sampleRecording:
      "https://soundcloud.com/stephen-fleri/looky?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
  },
];

addCompsFromDB();

function addCompsFromDB() {
  let html = "";
  html += compositionsDB
    .map(
      (comp, index) =>
        `<li class="compositions__list-item" onClick="openCompositionDiv(${index})">
      <a class="piece-name-button">${comp.name}</a>
    </li>`
    )
    .join("");
  compositionsList.innerHTML = html;
}

function openCompositionDiv(key) {
  const div = document.createElement("div");
  div.classList.add("compositionDiv");
  div.innerHTML = ` 
  <div
    class="close-button">
    <p style="position: relative; top: -1px; color: white">X</p>
  </div>
  <div class="piece-titlepage">
  <h1 class="piece-name">${compositionsDB[key].name}</h1>
  <img
  class="piece-image"
  src="images/Untitled.webp"
  alt="" />
  </div>
  <div class="piece-information-div">
    <p piece-description>
      ${compositionsDB[key].description ?? "No Description"}
    </p>
    <p>Year of Composition: ${compositionsDB[key].year}</p>
    <p>Instrumentation: ${compositionsDB[key].instrumentation}</p>
    <p>Price ${compositionsDB[key].price}</p>
  </div>`;
  compositions.append(div);

  // Get the close button and add click listener
  const closeButton = div.querySelector(".close-button");
  closeButton.addEventListener("click", removeDiv);

  // Add click event listener to document
  const handleClickOutside = (event) => {
    if (!div.contains(event.target)) {
      removeDiv();
      document.removeEventListener("click", handleClickOutside);
    }
  };

  // Use setTimeout to avoid immediate trigger
  setTimeout(() => {
    document.addEventListener("click", handleClickOutside);
  }, 0);

  function removeDiv() {
    const div = document.querySelector(".compositionDiv");
    closeButton.removeEventListener("click", removeDiv);
    document.removeEventListener("click", handleClickOutside);
    compositions.removeChild(div);
  }
}
