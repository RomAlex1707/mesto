import {popupOpenImage, openPopup, popupImage, popupImageCaption} from './index.js'

export default class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
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
    }
  
    _handleCardClick() {
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupImageCaption.textContent = this._name;
      openPopup(popupOpenImage);
    }
}
