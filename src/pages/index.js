import "./index.css";
import {
  buttonOpenPopupCard,
  enableValidationConfig,
  profileEditButton,
  popupProfileEdit,
  formAddCard,
  profileNameInput,
  profileJobInput,
  avatar,
  formEditAvatar,
  loaderImage
} from "../constants.js";

import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";

//создаем экземпляр класса Api
const api = new Api(
  "https://mesto.nomoreparties.co/v1/cohort-66",
  "dc4cc52d-8535-4ff0-845c-06f4815ac82c"
);

//создаем экземпляр класса попапа картинки
const popupWithImage = new PopupWithImage('.popup_open-image');
popupWithImage.setEventListeners();

function addNewCard(card) {
  const newCard = new Card(
    card,
    '.card__template',
    () => {
      popupWithImage.open(card.name, card.link);
    },
    () => {
      popupWithFormDeleteCard.open(card._id, newCard);
    },
    (cardId, isLike) => {
      return toggleLike(cardId, isLike, newCard);
    },
    card,
   userInfo.getUserId()
  );
  return newCard;
}

const defaultGallery = new Section(
  {
    items: [],
    renderer: (card) => {
      defaultGallery.addItem(addNewCard(card).generateCard(card.likes.length));
    },
  },
  ".elements__list"
);

function loadGallery() {
  avatar.style.backgroundImage = `url(${loaderImage})`;
  Promise.all([api.getCards(), api.getUserInfo()])
      .then(([cards, userData]) => {
        userInfo.saveUserId(userData._id);
      defaultGallery.setItems(cards.reverse());
      defaultGallery.renderItems();
      userInfo.setUserInfo({ name: userData.name, profession: userData.about });
      userInfo.setAvatar(userData.avatar);
    })
    .catch((error) => {
      console.log(error);
    });
}
loadGallery();

//вешаем листенер на кнопку открытия попапа карточек
buttonOpenPopupCard.addEventListener('click', openAddCardPopup);

//создаем экземпляр класса валидации для попапа карточек
const validationFormAddCard = new FormValidator(enableValidationConfig, formAddCard);
validationFormAddCard.enableValidation();

//создаем экземпляр класса попапа формы добавления карточек и вешаем листенер
const popupWithFormAddCard = new PopupWithForm({
  selector: '.popup_cards',
  handleFormSubmit: uploadPicture,
});
popupWithFormAddCard.setEventListeners();

function uploadPicture(card) {
  popupWithFormAddCard.renderLoading(true);
  api
    .addCard(card)
    .then((card) => {
      defaultGallery.addItem(
        addNewCard(card).generateCard(card.likes.length)
      );
    })
    .then(() => {
      popupWithFormAddCard.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => popupWithFormAddCard.renderLoading(false));
}

//функция открытия картинок
function openAddCardPopup() {
  validationFormAddCard.hideAllInputErrors();
  validationFormAddCard.disableButton();
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
  avatar: ".profile__avatar",
});

function submitEditProfileForm(item) {
  popupWithFormEditProfile.renderLoading(true);
  api
    .editProfile(item)
    .then(result => {
      userInfo.setUserInfo({ name:result.name, profession:result.about });
    })
    .then(() => {
      popupWithFormEditProfile.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => popupWithFormEditProfile.renderLoading(false));
}

//функция вставки аватара с сервера на страницу
function loadAvatar() {
  avatar.style.backgroundImage = `url(${loaderImage})`;
  api
    .getUserInfo()
    .then((result) => {
      userInfo.setAvatar(result.avatar);
    })
    .catch((error) => console.log(error));
}

//форма редактирования аватара
avatar.addEventListener('click', openAvatarPopup);

const validationFormEditAvatar = new FormValidator(enableValidationConfig, formEditAvatar);
validationFormEditAvatar.enableValidation();

const popupWithFormEditAvatar = new PopupWithForm({
  selector: '.popup_edit-avatar',
  handleFormSubmit: editAvatar,
});
popupWithFormEditAvatar.setEventListeners();

function editAvatar(item) {
  api
    .editAvatar(item)
    .then(() => {
      loadAvatar();
    })
    .then(() => {
      popupWithFormEditAvatar.close();
    })
    .catch((error) => {
      console.log(error);
    });
}

function openAvatarPopup() {
  formEditAvatar.link.value = avatar.style.backgroundImage.slice(5, -2);
  validationFormEditAvatar.hideAllInputErrors();
  validationFormEditAvatar.disableButton();
  popupWithFormEditAvatar.open();
  formEditAvatar.reset();
}

//создание экземпляра класса попапа подтверждения удаления
const popupWithFormDeleteCard = new PopupWithConfirmation({
  selector: '.popup_delete-card',
  handleFormSubmit: deleteCard
});
popupWithFormDeleteCard.setEventListeners();

//функция удаления карточки
function deleteCard(idCard, cardInstance) {
  api
    .deleteCard(idCard)
    .then(() => {
      cardInstance.deleteImage();
    })
    .then(() => {
      popupWithFormDeleteCard.close();
    })
    .catch((error) => {
      console.log(error);
    });
}

//функция установки или удаления лайка
function toggleLike(cardId, isLike, cardInstance) {
  if (isLike) {
    api
      .addLike(cardId)
      .then((result) => {
        cardInstance.loadLike(result);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    api
      .deleteLike(cardId)
      .then((result) => {
        cardInstance.loadLike(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
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
