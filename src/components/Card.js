export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._element = this._getTemplate();
        this._heart = this._element.querySelector(".card__like-button");
        this._buttonDelete = this._element.querySelector(".card__delete-button");
        this._popupImage = document.querySelector(".popup_open-image");
        this._galleryPic = this._element.querySelector(".card__image");
        this._handleCardClick = handleCardClick;
    }

  _getTemplate () {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.elements__item')
    .cloneNode(true);

  return cardElement; 
  }

  generateCard () {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__image').alt = this._name;

  return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
        this._likeCard();
      });
  
      this._element.querySelector('.card__delete-button').addEventListener('click', () => {
        this._deleteCard();
      });
  
      this._element.querySelector('.card__image').addEventListener('click', () => {
        this._handleCardClick();
      });
    }
  
    _likeCard() {
      this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
    }
  
    _deleteCard() {
      this._element.remove();
      this._element = null;
    }
}
