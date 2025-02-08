const samplePageButtons = document.querySelectorAll(".show-sample");
const sampleRecordingButtons = document.querySelectorAll(".sample-recording");
const durations = document.querySelectorAll(".duration");
const years = document.querySelectorAll(".year");

const compositionsDB = [
  {
    year: "2016",
    length: "3:00",
    difficulty: "",
    instrumentation: "",
    price: "",
    name: "Minuet",
    samplePage: "",
    sampleRecording: "",
  },
  {
    year: "2016",
    length: "5:00",
    difficulty: "",
    instrumentation: "",
    price: "",
    name: "Invocation",
    samplePage: "./invocation_sample.png",
    sampleRecording: "",
  },
  {
    name: "L'ooky",
    year: "2016",
    length: "0:42",
    difficulty: "",
    instrumentation: "",
    price: "",
    samplePage: "",
    sampleRecording:
      "https://soundcloud.com/stephen-fleri/looky?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
  },
  {
    name: "BitBop_#1",
    year: "2016",
    length: "3:24",
    difficulty: "",
    instrumentation: "",
    price: "",
    samplePage: "",
    sampleRecording:
      "https://soundcloud.com/stephen-fleri/bitbop-1?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
  },
  {
    name: "Phantasy",
    year: "2016",
    length: "4:40",
    difficulty: "",
    instrumentation: "",
    price: "",
    samplePage: "",
    sampleRecording:
      "https://soundcloud.com/stephen-fleri/phantasy?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
  },
  {
    name: "Quizzicurioso",
    year: "2016",
    length: "1:48",
    difficulty: "",
    instrumentation: "",
    price: "",
    samplePage: "",
    sampleRecording:
      "https://soundcloud.com/stephen-fleri/quizzicurioso?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
  },
];

durations.forEach((duration, i) => {
  duration.textContent = compositionsDB[i].length;
});
years.forEach((year, i) => {
  year.textContent = compositionsDB[i].year;
});

samplePageButtons.forEach((button, i) => {
  if (compositionsDB[i].samplePage !== "") {
    button.disabled = false;
  } else {
    button.disabled = true;
    button.style.transform = "unset";
    button.style.cursor = "auto";
  }
  button.addEventListener("click", () => {
    compositionsDB[i];
  });
});

sampleRecordingButtons.forEach((button, i) => {
  if (compositionsDB[i].sampleRecording !== "") {
    button.disabled = false;
  } else {
    button.disabled = true;
    button.style.transform = "unset";
    button.style.cursor = "auto";
  }
  button.addEventListener("click", () => {
    compositionsDB[i];
  });
});
