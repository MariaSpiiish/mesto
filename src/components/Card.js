export default class Card {
    //данные конструктора
    constructor({ data, handleCardClick, deleteCardClick, likeCardClick, dislikeCardClick }, cardSelector, userId ) {
        this._link = data.link;
        this._name = data.name;
        this._likes = data.likes;
        this._owner = data.owner._id;
        this._cardId = data._id;
        this._handleCardClick = handleCardClick;
        this._deleteCardClick = deleteCardClick;
        this._likeCardClick = likeCardClick;
        this._cardSelector = cardSelector;
        this._dislikeCardClick = dislikeCardClick;
        this._userId = userId;

        
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
        
        this._element.querySelector('.card__like-count').textContent = this._likes.length;
        
        if (this._owner === this._userId) {
            this._element.querySelector('.card__trash').classList.add('card__trash_active')
        }

        if (this._findId(this._likes)) {
            this._element.querySelector('.card__like').classList.add('card__like_active');
        }


        //вернём элемент
        return this._element;
    }

    _findId(obj) {
        let exist = false;    
        obj.forEach(item => {
            if(item._id === this._userId) {
                exist = true;
            }
        })
        return exist;
    }

    _updateLikes() {
        if(this._findId(this._likes)) {
            this._dislikeCardClick(this._element, this._cardId);
            this._element.querySelector('.card__like').classList.remove('card__like_active');
        } else {
            this._likeCardClick(this._element, this._cardId);
            this._element.querySelector('.card__like').classList.add('card__like_active');
        }
    }

    _setEventListeners() {
        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });

        this._element.querySelector('.card__like').addEventListener('click', () => {
            this._updateLikes()
        });
    
        this._element.querySelector('.card__trash').addEventListener('click', () => {
            this._deleteCardClick(this._element, this._cardId);
            //при клике открыть попап удаления
        });
      }
}