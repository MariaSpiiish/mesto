const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.popup__text_type_name');
let infoInput = formElement.querySelector('.popup__text_type_info');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function openPopup() {
    popupElement.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    infoInput.value = profileSubtitle.textContent;
    document.addEventListener('keyup', onDocumentKeyUp);
}

function closePopup() {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', onDocumentKeyUp);
}

function onDocumentKeyUp(event) {
    if(event.key === 'Escape') {
        closePopup();
    }
}

editButton.addEventListener('click', openPopup);

closeButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = infoInput.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 