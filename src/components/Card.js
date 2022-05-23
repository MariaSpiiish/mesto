export default class Card {
    //данные конструктора
    constructor({ data, handleCardClick }, cardSelector) {
        this._link = data.link;
        this._name = data.name;
        this._handleCardClick = handleCardClick;
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
        this._element.querySelector('.card__image').alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;

        //вернём элемент
        return this._element;
    }

    _activateLikeButton() {
        const like = this._element.querySelector('.card__like');
        like.classList.toggle('card__like_active');
    };

    _setEventListeners() {
        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
        this._element.querySelector('.card__like').addEventListener('click', () => {
            this._activateLikeButton();
        });
        this._element.querySelector('.card__trash').addEventListener('click', () => {
            this._element.remove();
        });
      }
}