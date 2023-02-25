let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let profileNameInput = document.querySelector('#profile-name-input');
let profileJobInput = document.querySelector('#profile-job-input');

let popupContainer = document.querySelector('.popup__container');
let popupButtonClose = document.querySelector('.popup__button-close');

let formElement = document.querySelector('.popup__form');

let popup = document.querySelector('.popup');
let profileEditButton = document.querySelector('.profile__edit-button');
let popupButtonSave = document.querySelector('.popup__button-save');

function openPopup (evt) {
  popup.classList.remove('popup_opened');
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileDescription.textContent;
};

function closePopup(evt) {
  popup.classList.add('popup_opened');
};

function handleFormSabmit (evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileJobInput.value;
};

profileEditButton.addEventListener('click', openPopup);
popupButtonClose.addEventListener('click', closePopup);
popupButtonSave.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSabmit);
