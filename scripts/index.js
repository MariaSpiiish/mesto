const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');

const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.popup__text_type_name');
const infoInput = formElement.querySelector('.popup__text_type_info');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

function openPopupProfile() {
    popupElement.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    infoInput.value = profileSubtitle.textContent;
    // document.addEventListener('keyup', onDocumentKeyUp);
}

function closePopupProfile() {
    popupElement.classList.remove('popup_opened');
    // document.removeEventListener('keyup', onDocumentKeyUp);
}

// function onDocumentKeyUp(event) {
//     if(event.key === 'Escape') {
//         closePopup();
//     }
// }

editButton.addEventListener('click', openPopupProfile);

closeButton.addEventListener('click', closePopupProfile);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = infoInput.value;
    closePopupProfile();
}

formElement.addEventListener('submit', formSubmitHandler); 

const popupPlaceElement = document.querySelector('.popup_place');
const addButton = document.querySelector('.profile__add-button');
const closeButtonPlace = document.querySelector('.popup__close-button_type_place');

function openPopupPlace() {
    popupPlaceElement.classList.add('popup_opened');
}

function closePopupPlace() {
    popupPlaceElement.classList.remove('popup_opened');
}

addButton.addEventListener('click', openPopupPlace);
closeButtonPlace.addEventListener('click', closePopupPlace);

const likeButton = document.querySelector('.card__like');

likeButton.addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like_active');
}); //работает только на первой карточке