import "./index.css";
import {
  initialCards,
  buttonOpenPopupCard,
  enableValidationConfig,
  profileEditButton,
  popupProfileEdit,
  formAddCard,
  profileNameInput,
  profileJobInput

} from "../constants.js";

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";


//создаем экземпляр класса попапа картинки

const popupWithImage = new PopupWithImage('.popup_open-image');

//создаем экземпляр класса Section, Card

const cardGallery = new Section({
    items: initialCards,
    renderer: (item) => {
      cardGallery.addItem(
        new Card(item, ".card__template", () => {
          popupWithImage.open(item.name, item.link);
          popupWithImage.setEventListeners();
        }).generateCard()
      );
    },
  },
  '.elements__list'
);
cardGallery.renderItems();

//вешаем листенер на кнопку открытия попапа карточек
buttonOpenPopupCard.addEventListener('click', openAddCardPopup);



//создаем экземпляр класса валидации для попапа карточек
const validationFormAddCard = new FormValidator(enableValidationConfig, formAddCard);
validationFormAddCard.enableValidation();

//функция загрузки картинки
function addPicture(item) {
  const newCard = new Card(item, ".card__template", () => {
    popupWithImage.open(item.name, item.link);
    popupWithImage.setEventListeners();
  }).generateCard();
  cardGallery.addItem(newCard);
}

//создаем экземпляр класса попапа формы добавления карточек и вешаем листенер
const popupWithFormAddCard = new PopupWithForm({
  selector: '.popup_cards',
  handleFormSubmit: addPicture,
});
popupWithFormAddCard.setEventListeners();


//функция открытия картинок
function openAddCardPopup() {
  validationFormAddCard.hideAllInputErrors();
  validationFormAddCard._toggleButtonState();

  popupWithFormAddCard.open();
}


//создаем экземпляр класса валидации попапа редактирования профиля
const validationFormEditProfile = new FormValidator(
  enableValidationConfig,
  popupProfileEdit
);
validationFormEditProfile.enableValidation();

//создаем экземпляр класса попапа формы редактирования профиля и вешаем листенер
const popupWithFormEditProfile = new PopupWithForm({
  selector: '.popup_profile-edit', 
  handleFormSubmit: submitEditProfileForm,
});
popupWithFormEditProfile.setEventListeners();

// создание экземпляра класса, отвечающего за отображение информации о пользователе
const userInfo = new UserInfo ({
  username: '.profile__name',
  job: '.profile__description',
});


function submitEditProfileForm(data) {
  userInfo.setUserInfo({
    name: data.name,
    profession: data.profession
  });
}

//функция открытия попапа редактирования профиля

function openEditProfilePopup() {
  validationFormEditProfile.hideAllInputErrors();
  popupWithFormEditProfile.open();
}
profileEditButton.addEventListener('click', openEditProfilePopup);

// Заносим данные в форму попапа редактирования профиля

function fillInEditProfileFormInputs({ username, job }) {
  profileNameInput.value = username;
  profileJobInput.value = job;
}

//вешаем листенер на кнопку 
profileEditButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  fillInEditProfileFormInputs({
    username: info.username,
    job: info.job
  });
 
});


