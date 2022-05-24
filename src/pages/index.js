import "./index.css"
import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

import { 
    initialCards,
    selectorList,
    placeAddButton,
    formProfileElement,
    formPlaceElement,
    buttonEditProfile,
    popupPictureElement,
    popupPlaceElement,
    popupProfileElement,
    cardTemplate,
    cardsContainer,
    profileName,
    profileInfo,
    popupProfileName,
    popupProfileInfo
} from "../utils/constants.js";

const imagePopup = new PopupWithImage(popupPictureElement);
imagePopup.setEventListeners();

const addNewCard = (data) => {
  const card = new Card ({
      data: data,
      handleCardClick: (name, link) => {
        
        imagePopup.open(name, link);
        
      }
    },
    cardTemplate
  );
 
  return card.generateCard();
  
}

const defaultCards = new Section ({ 
    items: initialCards,
    renderer: (item) => {
      const cards = addNewCard(item);
      defaultCards.addItem(cards);
    }                                  
  }, 
  cardsContainer
);

defaultCards.renderItems();

const placeForm = new PopupWithForm({
  handleFormSubmit: (data) => {
    const newCard = addNewCard(data);
    
    defaultCards.addItem(newCard);
    placeForm.close();
    
    }
  },
  popupPlaceElement
);
placeForm.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: profileName,
  infoSelector: profileInfo
})

//подставить значение со стр в попап и открыть его
function openPopupProfile() {
  const user = userInfo.getUserInfo();
  popupProfileName.value = user.name;
  popupProfileInfo.value = user.info;
  profileForm.open();
}

const profileForm = new PopupWithForm({
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data)
    profileForm.close();
    }
  },
  popupProfileElement
);
profileForm.setEventListeners();

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

const formValidatorProfile = new FormValidator(selectorList, formProfileElement);
formValidatorProfile.enableValidation();

const formValidatorPlace = new FormValidator(selectorList, formPlaceElement);
formValidatorPlace.enableValidation();