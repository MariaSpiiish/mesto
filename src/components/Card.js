export default class Card {
    //данные конструктора
    constructor({ data, handleCardClick, handleLikeClick, deleteCardClick }, cardSelector, userId ) {
        this._link = data.link;
        this._name = data.name;
        this.likes = data.likes;
        this._owner = data.owner._id;
        this.cardId = data._id;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._deleteCardClick = deleteCardClick;
        this._cardSelector = cardSelector;
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
        this._cardImage = this._element.querySelector('.card__image');
        this.likeButton = this._element.querySelector('.card__like');
        this._deleteButton = this._element.querySelector('.card__trash');
        this._likeCount = this._element.querySelector('.card__like-count');
        this._setEventListeners();

        //добавляем данные
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;
        
        this._likeCount.textContent = this.likes.length;
        
        if (this._owner === this._userId) {
            this._deleteButton.classList.add('card__trash_active')
        }

        if (this.findId(this.likes)) {
            this.likeButton.classList.add('card__like_active');
        }


        //вернём элемент
        return this._element;
    }

    findId(obj) {
        let exist = false;    
        obj.forEach(item => {
            if(item._id === this._userId) {
                exist = true;
            }
        })
        return exist;
    }

    updateLikes(obj) {
       this._likeCount.textContent = obj.length;
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });

        this.likeButton.addEventListener('click', () => {
            this._handleLikeClick(this);
        });
    
        this._deleteButton.addEventListener('click', () => {
            this._deleteCardClick(this._element, this.cardId);
        });
      }
}