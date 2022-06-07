import "./index.css"
import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";

import { 
    selectorList,
    placeAddButton,
    formProfileElement,
    formPlaceElement,
    formAvatarElement,
    buttonEditProfile,
    popupPictureElement,
    popupPlaceElement,
    popupProfileElement,
    popupDeleteElement,
    cardTemplate,
    cardsContainer,
    profileName,
    profileInfo,
    popupProfileName,
    popupProfileInfo,
    profileAvatar,
    popupAvatarElement,
    avatarEditButton
} from "../utils/constants.js";

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'a9ef8c07-b83e-4444-b4dd-d87bd8a4730a',
    'Content-Type': 'application/json',
  }
})

const userInfo = new UserInfo({
  nameSelector: profileName,
  infoSelector: profileInfo,
  avatarSelector: profileAvatar,
})

const avatarForm = new PopupWithForm({
  handleFormSubmit: (data) => {
    avatarForm.renderLoading('Сохранить...');
    api.patchUserAvatar(data) //обращаемся к api изменить аватар пользователя
      .then((data) => {
        userInfo.setUserInfo(data);
        avatarForm.close();
      })
      .catch((err) => {
        console.log(`Ошибка 1: ${err}`);
      })
      .finally(() => avatarForm.renderLoading());
  }},
  popupAvatarElement
);
avatarForm.setEventListeners();

const profileForm = new PopupWithForm({
  handleFormSubmit: (data) => {
    profileForm.renderLoading('Сохранить...');
    api.patchUserInfo(data) //обращаемся к api изменить данные о пользователе
      .then((data) => {
        userInfo.setUserInfo(data);
        profileForm.close();
      })
      .catch((err) => {
        console.log(`Ошибка 2: ${err}`);
      })
      .finally(() => profileForm.renderLoading());
    }
  },
  popupProfileElement
);
profileForm.setEventListeners();

//подставить значение со стр в попап и открыть его
function openPopupProfile() {
  const user = userInfo.getUserInfo();
  profileForm.setInputValues(user);
  profileForm.open();
}

const imagePopup = new PopupWithImage(popupPictureElement);
imagePopup.setEventListeners();

const deleteCardPopup = new PopupWithSubmit({
    deleteCards: (element, id) => {
      api.deleteCard(element, id)//Обращаемся к api
        .then(() => {
          element.remove()
          deleteCardPopup.close();
        })
        .catch((err) => {
          console.log(`Ошибка 3: ${err}`);
        });
    }
  },
  popupDeleteElement
);
deleteCardPopup.setEventListeners();

const addNewCard = (data) => {
  const card = new Card ({
      data: data,
      handleCardClick: (name, link) => { 
        imagePopup.open(name, link);
      },
      deleteCardClick: (element, id) => {
        deleteCardPopup.open(element, id);
      },
      handleLikeClick: (card) => {
        if (!card.findId(card.likes)) {
          api.putLike(card, card.cardId)//обращаемся к api
            .then((obj) => {
              card.addLike(obj.likes);
            })
            .catch((err) => {
              console.log(`Ошибка в постановке лайка: ${err}`);
            });
        } else {
          api.deleteLike(card, card.cardId)//обращаемся к api
            .then((obj) => {
              card.removeLike(obj.likes);
            })
            .catch((err) => {
              console.log(`Ошибка в снятии лайка: ${err}`);
            });
        }
      },
    },
    cardTemplate,
    userId
  );
  return card.generateCard();
}

const section = new Section ({
    renderer: (item) => {
      const cards = addNewCard(item);
      section.addItem(cards);
    } 
  }, cardsContainer
);

let userId;

Promise.all([api.getCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    section.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Ошибка 6: ${err}`);
  });

const placeForm = new PopupWithForm({
  handleFormSubmit: (data) => {
    placeForm.renderLoading('Сохранить...')
    api.postNewCard(data)
      .then((data) => {
        const newCard = addNewCard(data);
        section.addItem(newCard);
        placeForm.close();
      })
      .catch((err) => {
        console.log(`Ошибка 7: ${err}`);
      })
      .finally(() => placeForm.renderLoading('Создать'));
    }
  },
  popupPlaceElement
);

placeForm.setEventListeners();

//валидация форм
const formValidatorProfile = new FormValidator(selectorList, formProfileElement);
formValidatorProfile.enableValidation();

const formValidatorPlace = new FormValidator(selectorList, formPlaceElement);
formValidatorPlace.enableValidation();

const formValidatorAvatar = new FormValidator(selectorList, formAvatarElement);
formValidatorAvatar.enableValidation();

//открыть попап редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  formValidatorProfile.resetValidation();
  openPopupProfile();

})

//открыть попап добавления места
placeAddButton.addEventListener('click', () => {
  formValidatorPlace.resetValidation();
  placeForm.open();
});

//открыть попап редактирования аватар
avatarEditButton.addEventListener('click', () => {
  formValidatorAvatar.resetValidation();
  avatarForm.open();
});