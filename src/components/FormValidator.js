export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputElements = [
      ...this._form.querySelectorAll(config.inputSelector),
    ];
    this._submitButton = this._form.querySelector(
      this._config.submitButtonSelector
    );
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
    this._toggleButtonState();
  }

  _setEventListeners() {
    this._inputElements.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._handleInputEvent(inputEl);
      });
    });
  }

  _handleInputEvent(inputEl) {
    this._checkInputValidity(inputEl);
    this._toggleButtonState();
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._config.inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._config.errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._config.inputErrorClass);
    errorMessageEl.textContent = " ";
    errorMessageEl.classList.remove(this._config.errorClass);
  }

  _checkFormValidity() {
    const isFormValid = this._inputElements.every(
      (input) => input.validity.valid
    );
    return isFormValid;
  }

  _toggleButtonState() {
    const isFormValid = this._checkFormValidity();
    if (!isFormValid) {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  resetForm() {
    this._form.reset();
    this._inputElements.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
    this._toggleButtonState();
  }
}
