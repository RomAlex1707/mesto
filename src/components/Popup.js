export default class Popup {
    constructor(selector) {
      this._popup = document.querySelector(selector);
      this._buttonClosePopup = this._popup.querySelector('.popup__button-close');
      this._handleEscClose = this._handleEscClose.bind(this);
    }
  
    open() {
      this._popup.classList.add('popup_opened');
      this._popup.addEventListener('mousedown', this._handleOverlayClose);
      document.addEventListener('keydown', this._handleEscClose);
    }
  
    close() {
      this._popup.classList.remove('popup_opened');
      this._popup.removeEventListener('mousedown', this._handleOverlayClose);
      document.removeEventListener('keydown', this._handleEscClose);
    }
  
    setEventListeners() {
      this._buttonClosePopup.addEventListener("click", () => {
        this.close();
      });
      this._popup.addEventListener("click", (evt) => {
        if (evt.target === this._popup) {
          this.close();
        }
      })
    }
  
    _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        this.close();
      }
    }
  
    _handleOverlayClose(evt) {
      if (evt.target === this._popup) {
        this.close();
      }
    }
  }
  