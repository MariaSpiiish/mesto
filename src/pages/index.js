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

//получить инфу о пользователе, вставить в разметку
let userId;
const getuser = api.getUserInfo()
  .then((data) => {
    return data;
  })
  .catch((err) => {
    console.log(`Ошибка 1: ${err}`);
  });

const avatarForm = new PopupWithForm({
  handleFormSubmit: (data) => {
    avatarForm.renderLoadingProfile(true);
    api.patchUserAvatar(data) //обращаемся к api изменить аватар пользователя
      .then((data) => {
        userInfo.setUserInfo(data);
        avatarForm.close();
      })
      .catch((err) => {
        console.log(`Ошибка 2: ${err}`);
      })
      .finally(() => avatarForm.renderLoadingProfile(false));
  }},
  popupAvatarElement
);
avatarForm.setEventListeners();

const profileForm = new PopupWithForm({
  handleFormSubmit: (data) => {
    profileForm.renderLoadingProfile(true);
    api.patchUserInfo(data) //обращаемся к api изменить данные о пользователе
      .then((data) => {
        userInfo.setUserInfo(data);
        profileForm.close();
      })
      .catch((err) => {
        console.log(`Ошибка 3: ${err}`);
      })
      .finally(() => profileForm.renderLoadingProfile(false));
    }
  },
  popupProfileElement
);
profileForm.setEventListeners();

//подставить значение со стр в попап и открыть его
function openPopupProfile() {
  const user = userInfo.getUserInfo();
  popupProfileName.value = user.name;
  popupProfileInfo.value = user.about;
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
          console.log(`Ошибка 4: ${err}`);
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
      likeCardClick: (element, id) => {
        api.putLike(element, id)//обращаемся к api
          .then((obj) => {
            card._likes = obj.likes;
            element.querySelector('.card__like-count').textContent = obj.likes.length;
          })
          .catch((err) => {
            console.log(`Ошибка 5: ${err}`);
          });
      },
      dislikeCardClick: (element, id) => {
        api.deleteLike(element, id)//обращаемся к api
          .then((obj) => {
            card._likes = obj.likes;
            element.querySelector('.card__like-count').textContent = obj.likes.length;
          })
          .catch((err) => {
            console.log(`Ошибка 6: ${err}`);
          });
      }
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

const getcards = api.getCards()
  .then((data) => {
    return data;
  })
  .catch((err) => {
    console.log(`Ошибка 7: ${err}`);
  });

Promise.all([getcards, getuser])
  .then(([res1, res2]) => {
    userId = res2._id;
    section.renderItems(res1);
    userInfo.setUserInfo(res2);
  })

const placeForm = new PopupWithForm({
  handleFormSubmit: (data) => {
    placeForm.renderLoadingCard(true)
    api.postNewCard(data)
      .then((data) => {
        const newCard = addNewCard(data);
        document.querySelector(cardsContainer).prepend(newCard);
        placeForm.close();
      })
      .catch((err) => {
        console.log(`Ошибка 8: ${err}`);
      })
      .finally(() => placeForm.renderLoadingCard(false));
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
  openPopupProfile();
  formValidatorProfile.disableButton();
})

//открыть попап добавления места
placeAddButton.addEventListener('click', () => {
  formValidatorPlace.disableButton();
  placeForm.open();
});

//открыть попап редактирования аватар
avatarEditButton.addEventListener('click', () => {
  formValidatorAvatar.disableButton();
  avatarForm.open();
});