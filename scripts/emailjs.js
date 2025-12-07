const serviceId = "service_ohpfm91";
const templateId = "template_gyngzif";
const publicKey = "z_XoYnCbsvcuF7-pE";

const contact = document.getElementById("contact");
const form = document.querySelector(".form");
const time = document.getElementById("time");
const name = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const submit = document.getElementById("submit");

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Validate form input fields
const isFormValid = () => {
  if (
    name.value !== "" &&
    email.value.match(emailRegex) &&
    subject.value !== "" &&
    message.value !== ""
  )
    return true;
  return false;
};

// Create a modal which informs the user of successful submission
const successModal = () => {
  const div = document.createElement("div");
  const title = document.createElement("h2");
  title.innerText = "Success!";
  const messageText = document.createElement("p");
  messageText.innerText =
    "Thank you for your email. It was successfully submitted.";
  div.append(title, messageText);
  contact.append(div);
};

// Create a modal which informs the user of failed submission
const failureModal = (error) => {
  const div = document.createElement("div");
  const title = document.createElement("h2");
  title.innerText = "Error!";
  const messageText = document.createElement("p");
  messageText.innerText =
    "Unfortunately your message could not be sent. Please try again, or contact me by my social media.";
  const errorDetails = document.createElement("p");
  errorDetails.innerText = `Error: ${error.text || error.message || "Unknown error"}`;
  div.append(title, messageText, errorDetails);
  contact.append(div);
};

// Add listner for click events on submit
submit.addEventListener("click", (e) => {
  e.preventDefault();
  // If not all fields are correctly filled out, return
  if (!isFormValid()) return;

  time.value = new Date().toLocaleString();

  const formData = new FormData(form);

  let userInputs = {};
  for (const key of formData.keys()) {
    if (formData.get(key).toString().length > 0) {
      userInputs[key] = formData.get(key).toString();
    }
  }

  // Report values to Email.js
  emailjs.sendForm(serviceId, templateId, form).then(
    () => {
      console.log("SUCCESS!");
      // Reset field values
      name.value = "";
      email.value = "";
      subject.value = "";
      message.value = "";
      successModal();
    },
    (error) => {
      console.log("FAILED...", error);
      // Don't reset form on failure, show error modal
      failureModal(error);
    },
  );
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
});
