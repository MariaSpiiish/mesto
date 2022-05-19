export const initialCards = [
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

export const selectorList = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}


export const imageCloseButton = document.querySelector('.popup__close-button_type_image');
export const placeAddButton = document.querySelector('.profile__add-button');
export const placeCloseButton = document.querySelector('.popup__close-button_type_place');
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const profileCloseButton = document.querySelector('.popup__close-button');

export const popupPictureElement = document.querySelector('.popup_type_image');
export const popupPlaceElement = document.querySelector('.popup_type_place-edit');
export const popupProfileElement = document.querySelector('.popup_type_profile-edit');

export const formProfileElement = document.querySelector('.form');
export const formPlaceElement = document.querySelector('.place-form');


  