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