export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick, cardObject, userId) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._heart = this._element.querySelector(".card__like-button");
    this._buttonDelete = this._element.querySelector(".card__delete-button");
    this._popupImage = document.querySelector(".popup_open-image");
    this._galleryPic = this._element.querySelector(".card__image");
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
    this._ownerId = cardObject.owner._id;
    this._cardId = cardObject._id;
    this._arrayLikes = cardObject.likes;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  generateCard(count) {
    this._setEventListeners();

    this._galleryPic.src = this._link;
    this._galleryPic.alt = this._name;
    const cardTitle = this._element.querySelector(".card__title");
    const likeCount = this._element.querySelector(".card__like-count");
    cardTitle.textContent = this._name;
    likeCount.textContent = count;
    if (this._ownerId !== this._userId) {
      this._buttonDelete.remove();
    }
    this._arrayLikes.forEach(like => {
      if (like._id === this._userId) {
        this._toggleLike();
      }
    });

    return this._element;
  }

  _setEventListeners() {
    this._heart.addEventListener("click", (event) => {
      this._countElement = event.target.nextElementSibling;
      if (this._heart.classList.contains("card__like-button_active")) {
        this._handleLikeClick(this._cardId, false);
        this._toggleLike();
      } else {
        this._handleLikeClick(this._cardId, true);
        this._toggleLike();
      }
    });

    this._buttonDelete.addEventListener("click", () => {
      this._handleDeleteClick(this._element);
    });

    this._galleryPic.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  _toggleLike() {
    this._heart.classList.toggle("card__like-button_active");
  }

  loadLike(data) {
    this._countElement.textContent = data.likes.length;
  }

  deleteImage() {
    this._element.remove();
  }
}
