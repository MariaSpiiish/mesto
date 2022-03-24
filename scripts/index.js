const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');

const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.popup__text_type_name');
const infoInput = formElement.querySelector('.popup__text_type_info');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

function openPopup() {
    popupElement.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    infoInput.value = profileSubtitle.textContent;
    // document.addEventListener('keyup', onDocumentKeyUp);
}

function closePopup() {
    popupElement.classList.remove('popup_opened');
    // document.removeEventListener('keyup', onDocumentKeyUp);
}

// function onDocumentKeyUp(event) {
//     if(event.key === 'Escape') {
//         closePopup();
//     }
// }

editButton.addEventListener('click', openPopup);

closeButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = infoInput.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 