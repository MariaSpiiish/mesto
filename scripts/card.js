// import {initialCards} from './cards.js'
import {popupImage, popupPictureElement, closeButtonImage, popupCaption} from './index.js'
import {openPopup, closePopup} from './index.js'

export class Card {
    //данные конструктора
    constructor(image, title) {
        this._image = image;
        this._title = title;
    }

    //забираем разметку из html и клонируем элемент 
    _getTemplate() {
        const cardElement = document
            .querySelector('.card-template')
            .content
            .querySelector('.card')
            .cloneNode(true);
        //возвращаем DOM-элемент
        return cardElement;    
    }
    
    //добавляем данные в разметку
    generateCard() {
        //запишем разметку в поле _element
        this._element = this._getTemplate();
        this._setEventListeners();

        //добавляем данные
        this._element.querySelector('.card__image').src = this._image;
        this._element.querySelector('.card__title').textContent = this._title;

        //вернём элемент
        return this._element;
    }

    _handleOpenPopup() {
        popupImage.src = this._image;
        popupImage.alt = this._title;
        popupCaption.textContent = this._title;
        openPopup(popupPictureElement);
    }

    _handleClosePopup() {
        popupImage.src = '';
        closePopup(popupPictureElement);
    }

    _activateLikeButton() {
        const like = this._element.querySelector('.card__like');
        like.classList.toggle('card__like_active');
        like.classList.toggle('opacity');
    };

    _setEventListeners() {
        this._element.querySelector('.card__image').addEventListener('click', () => {
          this._handleOpenPopup();
        });
        closeButtonImage.addEventListener('click', () => {
          this._handleClosePopup();
        });
        this._element.querySelector('.card__like').addEventListener('click', () => {
            this._activateLikeButton();
        });
        this._element.querySelector('.card__trash').addEventListener('click', () => {
            this._element.remove();
        });
      }
}