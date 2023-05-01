
  export default class FormValidator {
    constructor(config, form) {
      this._form = form;
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorClass = config.errorClass;
      this._formInputs = Array.from(this._form.querySelectorAll(this._inputSelector));
      this._formButton = this._form.querySelector(this._submitButtonSelector);
    }
  
    _showInputError(input) {
      const errorContainer = input.parentNode.querySelector(`#${input.id}-error`);
      input.classList.add(this._inputErrorClass);
      errorContainer.classList.add(this._errorClass);
      errorContainer.textContent = input.validationMessage;
    }
  
    _hideInputError(input) {
      const errorContainer = input.parentNode.querySelector(`#${input.id}-error`);
      input.classList.remove(this._inputErrorClass);
      errorContainer.classList.remove(this._errorClass);
      errorContainer.textContent = '';
    }

    hideAllInputErrors() {
      this._formInputs.forEach((input) => {
        this._hideInputError(input);
      });
    }  
  
    _checkInputValidity(input) {
      if (!input.checkValidity()) {
        this._showInputError(input);
      } else {
        this._hideInputError(input);
      }
    }
  
    _hasInvalidInput(inputs) {
      return inputs.some(input => !input.validity.valid);
    }
  
    _toggleButtonState() {
      if (this._hasInvalidInput(this._formInputs)) {
        this.disableButton(this._formButton);
      } else {
        this._enableButton(this._formButton);
      }
    }
    
    disableButton = (button) => {
        button.classList.add(this._inactiveButtonClass);
        button.setAttribute('disabled', true);
      }
      

    _enableButton(button) {
      button.classList.remove(this._inactiveButtonClass);
      button.removeAttribute('disabled');
    }

    _setEventListeners() {
      this.disableButton(this._formButton);
      this._formInputs.forEach((input) => {
        input.addEventListener("input", () => {
          this._checkInputValidity(input);
          this._toggleButtonState();
        });
        this._hideInputError(input);
      });
    }
  
    enableValidation() {
      this._form.addEventListener('submit', evt => {
        evt.preventDefault();
        this.validateForm();
      });
      this._setEventListeners();
    }

    validateForm() {
      this._toggleButtonState();
      this._formInputs.forEach((input) => {
        this._checkInputValidity(input);
        this._hideInputError(input);
      });
    }
  }
  