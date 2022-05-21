import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
    constructor({ handleFormSubmit }, popupSelector) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        
        this._element = this._popup.querySelector('.form');
        this._inputList = this._element.querySelectorAll('.popup__input');
    }

    //собрать все данные всех полей формы
    _getInputValues() {
        this._formValues = {};
        
        //добавить в объект значения всех полей
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        //возвращаем объект значений (ключ - name)
        return this._formValues;
    
    }

    setEventListeners() {
        super.setEventListeners();
        
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    
    }

    close() {
        super.close();

        //сбросить форму
        this._element.reset();
    }
}

//Для каждого попапа создавайте свой экземпляр класса PopupWithForm. 