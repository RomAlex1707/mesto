
  export default class FormValidator {
    constructor(config, form) {
      this._form = form;
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorClass = config.errorClass;
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
  
    _toggleButtonState(inputs, button) {
      if (this._hasInvalidInput(inputs)) {
        this.disableButton(button);
      } else {
        this._enableButton(button);
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
      const formInputs = Array.from(this._form.querySelectorAll(this._inputSelector));
      const formButton = this._form.querySelector(this._submitButtonSelector);
      this.disableButton(formButton);
      formInputs.forEach(input => {
        input.addEventListener('input', () => {
          this._checkInputValidity(input);
          this._toggleButtonState(formInputs, formButton);
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
      const formInputs = Array.from(this._form.querySelectorAll(this._inputSelector));
      const formButton = this._form.querySelector(this._submitButtonSelector);
      this._toggleButtonState(formInputs, formButton);
      formInputs.forEach(input => {
        this._checkInputValidity(input);
        this._hideInputError(input);
      });
    }
  }
  