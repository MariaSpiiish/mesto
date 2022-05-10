import { Card } from "./Card.js"
import { FormValidator } from "./FormValidator.js"
import { initialCards } from "./cards.js";

const selectorList = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}

//выбрать контейнер для карточек
const cardsContainer = document.querySelector('.photo-grid__items');

//выбрать кнопки для попапа профиля
const popupProfileElement = document.querySelector('.popup_type_profile-edit');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const profileCloseButton = popupProfileElement.querySelector('.popup__close-button');

//выбрать форму для попапа профиля
const formProfileElement = document.querySelector('.form');
const nameInput = formProfileElement.querySelector('.popup__input_type_name');
const infoInput = formProfileElement.querySelector('.popup__input_type_info');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//выбрать кнопки открытия и закрытия попапа добавления места
const popupPlaceElement = document.querySelector('.popup_type_place-edit');
const placeAddButton = document.querySelector('.profile__add-button');
const placeCloseButton = document.querySelector('.popup__close-button_type_place');

//переменные для формы добавления нового места
const formPlaceElement = document.querySelector('.place-form');//выбрать форму
const placeTitleInput = formPlaceElement.querySelector('.popup__input_type_place-title');//выбрать инпуты
const picLinkInput = formPlaceElement.querySelector('.popup__input_type_pic-link');//выбрать инпуты

//назначить переменные для попапа с картинкой
export const popupPictureElement = document.querySelector('.popup_type_image-edit');
export const imageCloseButton = popupPictureElement.querySelector('.popup__close-button_type_image');

export const popupImage = popupPictureElement.querySelector('.popup__image');
export const popupCaption = popupPictureElement.querySelector('.popup__caption');

//функция открытия попапа
export function openPopup(elem) {
  elem.classList.add('popup_opened');
  document.addEventListener('keyup', closeByEscape);
}

//функция закрытия попапа
export function closePopup(elem) {
  elem.classList.remove('popup_opened');
  document.removeEventListener('keyup', closeByEscape);
}

// функция закрытия попапа по кнопке escape
export function closeByEscape(event) {
  if(event.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//функция закрытия попапа по клику на оверлей
function closeByOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(document.querySelector('.popup_opened'));
  }
}

const renderElements = (cardData) => {
    const card = new Card(cardData, '.card-template');
    return card.generateCard();
};

initialCards.forEach((item) => {
  cardsContainer.append(renderElements(item));
});

const formValidatorProfile = new FormValidator(selectorList, formProfileElement);
formValidatorProfile.enableValidation();

const formValidatorPlace = new FormValidator(selectorList, formPlaceElement);
formValidatorPlace.enableValidation();

//функция кнопки submit попапа профиля
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = infoInput.value;
    closePopup(popupProfileElement);
}

//функция добавления карточки с новым местом 
function addCard(evt) {
  evt.preventDefault();
  
  const newCard = [
    {
      name: placeTitleInput.value,
      link: picLinkInput.value,
    }
  ]

  newCard.forEach((item) => { 
    cardsContainer.prepend(renderElements(item));
  });

  formValidatorPlace.disableButton();
  formPlaceElement.reset();
  
  closePopup(popupPlaceElement);
}

function openPopupProfile() {
  nameInput.value = profileTitle.textContent;
  infoInput.value = profileSubtitle.textContent;
  openPopup(popupProfileElement);
}

//открыть и закрыть попап профиля
buttonEditProfile.addEventListener('click', () => {
  openPopupProfile();
  formValidatorProfile.disableButton();
});
profileCloseButton.addEventListener('click', () => closePopup(popupProfileElement));

//нажать кнопку submit попапа профиля
formProfileElement.addEventListener('submit', handleProfileFormSubmit); 

//открыть и закрыть попап добавления места
placeAddButton.addEventListener('click', () => {
  formValidatorPlace.disableButton();
  openPopup(popupPlaceElement);
});
placeCloseButton.addEventListener('click', () => closePopup(popupPlaceElement));

//отправить форму добавления нового места
formPlaceElement.addEventListener('submit', addCard);

//закрыть попап места
imageCloseButton.addEventListener('click', () => {
  popupImage.src = '';
  closePopup(popupPictureElement);
});

popupPictureElement.addEventListener('mousedown', closeByOverlay);
popupProfileElement.addEventListener('mousedown', closeByOverlay);
popupPlaceElement.addEventListener('mousedown', closeByOverlay);