const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');

function openPopup() {
    popupElement.classList.add('popup_opened');
}

function closePopup() {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', onDocumentKeyUp);
}

function onDocumentKeyUp(event) {
    if(event.keyCode === 27) {
        closePopup();
    }
}

editButton.addEventListener('click', openPopup);

closeButton.addEventListener('click', closePopup);

document.addEventListener('keyup', function(event) {
    if (event.keyCode === 27) {
        closePopup();
    }
});

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.popup__text_type_name');
let infoInput = formElement.querySelector('.popup__text_type_info');

function formSubmitHandler (evt) {
    evt.preventDefault();
    const profileTitle = document.querySelector('.profile__title');
    const profileSubtitle = document.querySelector('.profile__subtitle');
    profileTitle.textContent = `${nameInput.value}`;
    profileSubtitle.textContent = `${infoInput.value}`;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 