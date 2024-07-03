import PopUp from "./PopUp.js";

export default class PopUpWithForm extends PopUp {
  constructor(popupSelector, handleFormSubmit, config) {
    super({ popupSelector });
    this._popup = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._config = config;
    this._form = this._popup.querySelector(this._config.formSelector);
    this.inputEl = this._popUpElement.querySelectorAll(".modal__input");
    this.inputValues = document.querySelectorAll(this._config.inputSelector);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  _getInputValues() {
    this.inputValues = {};
    this.inputEl.forEach((input) => {
      this.inputValues[input.name] = input.value;
    });
    return this.inputValues;
  }

  setInputValues(data) {
    this.inputValues.forEach((input) => {
      input.value = data[input.name];
    });
  }
}
