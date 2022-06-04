import Popup from "./Popup.js"

export default class PopupWithSubmit extends Popup {
    constructor({ deleteCards }, popupSelector) {
        super(popupSelector);
        this._deleteCards = deleteCards;

        this._element = this._popup.querySelector('.trash-form');
    }

    open = (element, id) => {
        this._element = element;
        this._id = id;
    
        super.open();
    }
    
    setEventListeners() {
        super.setEventListeners();
        
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._deleteCards(this._element, this._id);
        });
    
    }
}