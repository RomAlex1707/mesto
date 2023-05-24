import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ selector, handleFormSubmit }) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
  }

  open(idCard, cardInstance) {
    super.open();
    this._idCard = idCard;
    this._cardInstance = cardInstance;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._idCard, this._cardInstance)
        .then(() => this.close())
        .catch((error) => console.log(error));
    });
  }

}