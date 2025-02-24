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
          `<li class="compositions__list-item">
            <a class="piece-name-button" data-index="${index}">${comp.name}</a>
          </li>`
      )
      .join("");
    this.compositionsList.innerHTML = html;
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.compositionsList.addEventListener("click", (e) => {
      const button = e.target.closest(".piece-name-button");
      if (button) {
        const index = parseInt(button.dataset.index);
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

    closeButton.addEventListener("click", handleClose);
    this.setupClickOutside(div, handleClose);
  }

  createCompositionDiv(composition) {
    const div = document.createElement("div");
    div.classList.add("compositionDiv");
    div.innerHTML = this.getCompositionTemplate(composition);
    return div;
  }

  getCompositionTemplate(composition) {
    return ` <div class="close-button">
        <p style="position: relative; top: -1px; color: white">X</p>
      </div>
      <div class="piece-infopage">
        <h1 class="piece-name">${composition.name}</h1>
        <div class="piece-infopage__info">
          <img
            class="piece-image"
            src="images/Untitled.webp"
            alt="" />
          <p>${composition.description ?? "No Description"}</p>
        </div>
        <div class="piece-information-div">
          <p>Year of Composition: ${composition.year}</p>
          <p>Instrumentation: ${composition.instrumentation}</p>
          <p>Price ${composition.price}</p>
        </div>
      </div>`;
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
