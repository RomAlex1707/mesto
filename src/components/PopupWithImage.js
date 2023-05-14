import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector) {
      super(selector);
      this._imageElement = this._popup.querySelector(".popup__image");
      this._captionElement = this._popup.querySelector(".popup__image-caption");
    }
  
    open (name, link) {
      super.open();
      this._imageElement.src = link;
      this._imageElement.alt = name;
      this._captionElement.textContent = name;
    }
  }
  
