export class CompositionsManager {
  constructor(compositionsDB) {
    this.compositionsDB = compositionsDB;
    this.compositionsContainer = document.querySelector(".compositions");
    this.compositionsList = document.querySelector("#compositions-list");
    this.init();
  }

  init() {
    this.renderList();
  }

  renderList() {
    const html = this.compositionsDB
      .map(
        (comp, index) =>
          `<li class="compositions__list-item" id="piece${
            index + 1
          }" data-index="${index}">
            <a class="piece-name-button" >${comp.name}</a>
            <p class="piece-instrumentation-text">${
              comp.instrumentationShorthand
            }</p>
          </li>`
      )
      .join("");
    this.compositionsList.innerHTML = html;
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.compositionsList.addEventListener("click", (e) => {
      const listItem = e.target.closest(".compositions__list-item");
      if (listItem) {
        const index = parseInt(listItem.dataset.index);
        this.openCompositionDiv(index);
      }
    });
  }

  openCompositionDiv(key) {
    const composition = this.compositionsDB[key];
    const div = this.createCompositionDiv(composition);
    this.compositionsContainer.append(div);

    const closeButton = div.querySelector(".close-button");
    const handleClose = () => this.removeDiv(div);

    const compositionDiv = document.querySelector(".compositionDiv");

    closeButton.addEventListener("click", handleClose);
    this.setupClickOutside(compositionDiv, handleClose);
  }

  createCompositionDiv(composition) {
    // Create fullscreen modal
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");

    // Create inner composition Div
    const div = document.createElement("div");
    div.classList.add("compositionDiv");
    div.innerHTML = this.getCompositionTemplate(composition);
    modalContainer.append(div);
    return modalContainer;
  }

  getCompositionTemplate(composition) {
    return ` <div class="close-button">
        <p>X</p>
      </div>
      <div class="piece-infopage">
      <img
      class="piece-image"
      src=${composition.image ? composition.image : "images/stars.jpg"}
      alt="" />
      <div class="piece-infopage__info">
      <h1 class="piece-name">${composition.name}</h1>
      <p>${
        composition.description ??
        `${composition.name} was written by Stephen Flerin for ${composition.instrumentation} in ${composition.year}.`
      }</p>
      <div class="piece-information-div">
          <p>Year of Composition: ${composition.year}</p>
          <p>Instrumentation: ${composition.instrumentation}</p>
          <p>Price ${composition.price}</p>
        </div>
      </div>
      </div>
      `;
  }

  setupClickOutside(div, closeHandler) {
    const handleClickOutside = (event) => {
      if (!div.contains(event.target)) {
        closeHandler();
        document.removeEventListener("click", handleClickOutside);
      }
    };

    setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);
  }

  removeDiv(div) {
    div.remove();
  }
}
