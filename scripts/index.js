const initialCards = [
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

//перебор массива
const elements = initialCards.map(function(obj) {
  return createCards(obj);
});

//выбрать контейнер для карточек
const cardsContainer = document.querySelector('.photo-grid__items');

//создать карточки и навесить события
function  createCards(obj) {
  const template = document.querySelector('#card-template');
  const card = template.content.querySelector('.card').cloneNode(true);

  card.querySelector('.card__image').src = obj.link;
  card.querySelector('.card__title').textContent = obj.name;

  card.querySelector('.card__like').addEventListener('click', activateLikeButton);
  
  card.querySelector('.card__image').addEventListener('click', function(){openPopupImage(obj)});

  card.querySelector('.card__trash').addEventListener('click', () => {
    card.remove();
  });
  
  return card;
}

//добавить элементы на страницу
cardsContainer.append(...elements);

//активировать кнопку лайка
function activateLikeButton(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('card__like_active');
  eventTarget.classList.toggle('opacity');
};

//назначить переменные для попапа с картинкой
const popupPictureElement = document.querySelector('.popup_image');
const closeButtonImage = popupPictureElement.querySelector('.popup__close-button_type_image');

const popupImage = popupPictureElement.querySelector('.popup__image');
const popupCaption = popupPictureElement.querySelector('.popup__caption');

//открыть попап с картинкой
function openPopupImage(obj) {
  popupPictureElement.classList.add('popup_opened');
  popupImage.src = obj.link;
  popupCaption.textContent = obj.name;
}

//закрыть попап с картинкой
function closePopupImage() {
  popupPictureElement.classList.remove('popup_opened');
}

closeButtonImage.addEventListener('click', closePopupImage);

//выбрать кнопки для попапа профиля
const popupProfileElement = document.querySelector('.popup_profile');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupProfileElement.querySelector('.popup__close-button');

//выбрать форму для попапа профиля
const formProfileElement = document.querySelector('.form');
const nameInput = formProfileElement.querySelector('.popup__text_type_name');
const infoInput = formProfileElement.querySelector('.popup__text_type_info');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//функция открытия попапа профиля и добавление значений в поля из информации на странице
function openPopupProfile() {
    popupProfileElement.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    infoInput.value = profileSubtitle.textContent;
    // document.addEventListener('keyup', onDocumentKeyUp);
}

//функция закрытия попапа профиля
function closePopupProfile() {
    popupProfileElement.classList.remove('popup_opened');
    // document.removeEventListener('keyup', onDocumentKeyUp);
}

//функция закрытия попапа по кнопке escape
// function onDocumentKeyUp(event) {
//     if(event.key === 'Escape') {
//         closePopup();
//     }
// }

//открыть и закрыть попап профиля
editButton.addEventListener('click', openPopupProfile);

closeButton.addEventListener('click', closePopupProfile);

//функция кнопки submit попапа профиля
function formSubmitProfile (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = infoInput.value;
    closePopupProfile();
}

//нажать кнопку submit попапа профиля
formProfileElement.addEventListener('submit', formSubmitProfile); 

//выбрать кнопки открытия и закрытия попапа добавления места
const popupPlaceElement = document.querySelector('.popup_place');
const addButton = document.querySelector('.profile__add-button');
const closeButtonPlace = document.querySelector('.popup__close-button_type_place');

//функции открытия и закрытия попапа добавления места
function openPopupPlace() {
    popupPlaceElement.classList.add('popup_opened');
}

function closePopupPlace() {
    popupPlaceElement.classList.remove('popup_opened');
}

//открыть и закрыть попап добавления места
addButton.addEventListener('click', openPopupPlace);
closeButtonPlace.addEventListener('click', closePopupPlace);

//переменные для формы добавления нового места
const formPlaceElement = document.querySelector('.place-form');//выбрала форму
const placeTitleInput = formPlaceElement.querySelector('.popup__text_type_place-title');//выбрала инпуты
const picLinkInput = formPlaceElement.querySelector('.popup__text_type_pic-link');//выбрала инпуты

const renderCard = (obj) => {
  cardsContainer.prepend(createCards(obj))
}

const addCard = (evt) => {
  evt.preventDefault();
  
  const newCard = {};
  newCard.link = picLinkInput.value;
  newCard.name = placeTitleInput.value;
  renderCard(newCard);

  picLinkInput.value = '';
  placeTitleInput.value = '';
  
  closePopupPlace();
}

formPlaceElement.addEventListener('submit', addCard);