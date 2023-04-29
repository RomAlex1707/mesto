
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";


//массив первых 6 карточек

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// добавление карточек из массива
const elementsListContainer = document.querySelector('.elements__list');
  
function addCardToContainer(card) {
  elementsListContainer.prepend(card);
}

initialCards.forEach((item) => {
  const newCard = new Card(item, '.card__template').generateCard();
  addCardToContainer(newCard);
});

// добавление новой карточки
const addCardButton = document.querySelector('.profile__add-button');
const popupCards = document.querySelector('.popup_cards');
const formAddCard = popupCards.querySelector('.popup__form-cards');
const cardNameInput = document.querySelector('#card-name-input');
const cardLinkInput = document.querySelector('#card-link-input');
const formElementAdd = popupCards.querySelector('.popup__form-cards');

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const data = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  const newCard = new Card(data, '.card__template').generateCard();
  addCardToContainer(newCard);
  closePopup(popupCards);
  formAddCard.reset();
}

addCardButton.addEventListener('click', () => {
  openPopup(popupCards);
});

formAddCard.addEventListener('submit', handleAddCardFormSubmit);

const enableValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-visible'
};

const forms = document.querySelectorAll('.popup__form');

forms.forEach(form => {
  const validator = new FormValidator(enableValidationConfig, form);
  validator.enableValidation();
});

//попап редактирования профиля
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileNameInput = document.querySelector('#profile-name-input');
const profileJobInput = document.querySelector('#profile-job-input');
const formElementProfileEdit = document.querySelector('#form-element-profile-edit');
const popupProfileEdit = document.querySelector('.popup_profile-edit');

  
function handleFormProfileEditSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileJobInput.value;
  closePopup(popupProfileEdit);
}

formElementProfileEdit.addEventListener('submit', handleFormProfileEditSubmit);



//открытие и закрытие попапа для карточки и попапа самой картинки

export const popupOpenImage = document.querySelector('.popup_open-image');
export const popupImageCaption = document.querySelector('.popup__image-caption');

//кнопки открытия
const profileAddButton = document.querySelector('.profile__add-button');
const imagePopup = document.querySelector('.card__image');
const profileEditButton = document.querySelector('.profile__edit-button');

//кнопки закрытия
const popupButtonClosePopupCard = popupCards.querySelector('.popup__button-close');
const popupButtonCloseImage = popupOpenImage.querySelector('.popup__button-close');
const popupButtonCloseProfile = popupProfileEdit.querySelector('.popup__button-close');

// переменные для попапа увеличения картинки
export const popupImage = popupOpenImage.querySelector('.popup__image');


//функция закрыть
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener("mousedown", closePopupByClickOnOverlay);
  document.removeEventListener("keydown", closePopupByClickOnEsc);
}


//закрытие попапа на Esc и оверлей 
const closePopupByClickOnOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

const closePopupByClickOnEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//функция открыть

export const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown', closePopupByClickOnOverlay);
  document.addEventListener('keydown', closePopupByClickOnEsc);
  }


// открытие

profileAddButton.addEventListener('click', function() {
  openPopup(popupCards);
})

imagePopup.addEventListener('click', function() { 
  openPopup(popupOpenImage);
})

profileEditButton.addEventListener('click', function() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileDescription.textContent;
  openPopup(popupProfileEdit);
})

// закрытие

popupButtonClosePopupCard.addEventListener('click', function() {
  closePopup(popupCards);
})

popupButtonCloseImage.addEventListener('click', function() {
  closePopup(popupOpenImage);
})

popupButtonCloseProfile.addEventListener('click', function() {
  closePopup(popupProfileEdit);
})

// при открытие попапа стирать ошибки и деактивировать кнопку у попапа добавления

const openCardPopup = function() {
  formElementAdd.reset();
  clearErrors(popupCards);
  openPopup(popupCards);
}
profileAddButton.addEventListener('click', function() {
  openCardPopup();
})

const openProfilePopup = function() {
  clearErrors(popupProfileEdit);
  openPopup(popupProfileEdit);
}
profileEditButton.addEventListener('click', function() {
  openProfilePopup();
})

const clearErrors = function (formElement) {
  const errorList = formElement.querySelectorAll(".popup__error-visible");
  errorList.forEach((input) => input.classList.remove("popup__error-visible"));
};