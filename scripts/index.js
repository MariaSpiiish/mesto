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

//выбрать контейнер для карточек
const cardsContainer = document.querySelector('.photo-grid__items');

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

//выбрать кнопки открытия и закрытия попапа добавления места
const popupPlaceElement = document.querySelector('.popup_place');
const addButton = document.querySelector('.profile__add-button');
const closeButtonPlace = document.querySelector('.popup__close-button_type_place');

//переменные для формы добавления нового места
const formPlaceElement = document.querySelector('.place-form');//выбрать форму
const placeTitleInput = formPlaceElement.querySelector('.popup__text_type_place-title');//выбрать инпуты
const picLinkInput = formPlaceElement.querySelector('.popup__text_type_pic-link');//выбрать инпуты

//назначить переменные для попапа с картинкой
const popupPictureElement = document.querySelector('.popup_image');
const closeButtonImage = popupPictureElement.querySelector('.popup__close-button_type_image');

const popupImage = popupPictureElement.querySelector('.popup__image');
const popupCaption = popupPictureElement.querySelector('.popup__caption');

//функция открытия попапа
function openPopup(elem) {
  elem.classList.add('popup_opened');
}

//функция закрытия попапа
function closePopup(elem) {
  elem.classList.remove('popup_opened');
}

//функция активирования кнопки лайка
function activateLikeButton(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('card__like_active');
  eventTarget.classList.toggle('opacity');
};

//функция открытия попапа с картинкой
function openPopupImage(obj) {
  openPopup(popupPictureElement);
  popupImage.src = obj.link;
  popupImage.alt = obj.name;
  popupCaption.textContent = obj.name;
}

//функция кнопки submit попапа профиля
function formSubmitProfile (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = infoInput.value;
    closePopup(popupProfileElement);
}

//функция добавления карточки с новым местом 
function addCard(evt) {
  evt.preventDefault();
  
  const newCard = {};
  newCard.link = picLinkInput.value;
  newCard.name = placeTitleInput.value;
  renderCard(newCard);

  picLinkInput.value = '';
  placeTitleInput.value = '';
  
  closePopup(popupPlaceElement);
}

//создать карточки и навесить события
function  createCards(obj) {
  const template = document.querySelector('#card-template');
  const card = template.content.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  
  cardImage.src = obj.link;
  cardImage.alt = obj.name;
  card.querySelector('.card__title').textContent = obj.name;

  card.querySelector('.card__like').addEventListener('click', activateLikeButton);
  
  cardImage.addEventListener('click', function(){openPopupImage(obj)});

  card.querySelector('.card__trash').addEventListener('click', () => {
    card.remove();
  });
  
  return card;
}

//функция закрытия попапа по кнопке escape
// function onDocumentKeyUp(event) {
//     if(event.key === 'Escape') {
//         closePopup();
//     }
// }
// document.addEventListener('keyup', onDocumentKeyUp);

//открыть и закрыть попап профиля
editButton.addEventListener('click', () => {
  openPopup(popupProfileElement);
  nameInput.value = profileTitle.textContent;
  infoInput.value = profileSubtitle.textContent;
});
closeButton.addEventListener('click', () => {closePopup(popupProfileElement)});

//нажать кнопку submit попапа профиля
formProfileElement.addEventListener('submit', formSubmitProfile); 

//открыть и закрыть попап добавления места
addButton.addEventListener('click', () => {openPopup(popupPlaceElement)});
closeButtonPlace.addEventListener('click', () => {closePopup(popupPlaceElement)});

//отправить форму добавления нового места
formPlaceElement.addEventListener('submit', addCard);

//закрыть попап с картинкой
closeButtonImage.addEventListener('click', () => {closePopup(popupPictureElement)});

//перебор массива
const elements = initialCards.forEach((obj) =>
  renderCard(obj)
);

function renderCard(obj) {
  cardsContainer.prepend(createCards(obj))
}