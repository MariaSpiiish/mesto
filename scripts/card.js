// import {initialCards} from './cards.js'
import {popupImage, popupPictureElement, imageCloseButton, popupCaption} from './index.js'
import {openPopup} from './index.js'

export class Card {
    //данные конструктора
    constructor(data, cardSelector) {
        this._link = data.link;
        this._name = data.name;
        this._cardSelector = cardSelector;
    }

    //забираем разметку из html и клонируем элемент, возвращаем DOM-элемент
    _getTemplate() {
        return document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);  
    }
    
    //добавляем данные в разметку
    generateCard() {
        //запишем разметку в поле _element
        this._element = this._getTemplate();
        this._setEventListeners();

        //добавляем данные
        this._element.querySelector('.card__image').src = this._link;
        this._element.querySelector('.card__title').textContent = this._name;

        //вернём элемент
        return this._element;
    }

    _handleOpenPopup() {
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupCaption.textContent = this._name;
        openPopup(popupPictureElement);
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
        this._element.querySelector('.card__like').addEventListener('click', () => {
            this._activateLikeButton();
        });
        this._element.querySelector('.card__trash').addEventListener('click', () => {
            this._element.remove();
        });
      }
}