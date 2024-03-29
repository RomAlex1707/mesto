import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ selector, handleFormSubmit }) {
      super(selector);
      this._handleFormSubmit = handleFormSubmit;
      this._form = this._popup.querySelector('.popup__form');
      this._inputList = this._form.querySelectorAll('.popup__input');
      this._submitButton = this._form.querySelector('.popup__button-save');
      this._submitButtonText = this._submitButton.textContent;
      this._formValues = {};
    }
  
    _getInputValues() {
      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });
  
      return this._formValues;
    }

    renderLoading(isLoading) {
      if(isLoading) {
        this._submitButton.textContent = 'Сохранение...';
      } else {
        this._submitButton.textContent = this._submitButtonText;
      }
    }

    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      })
    }

    close() {
      super.close();
      this._form.reset();
    }
  }

  

