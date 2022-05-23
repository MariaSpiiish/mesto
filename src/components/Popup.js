export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    _handleEscClose(event) {
        if(event.key === 'Escape') {
            this.close(document.querySelector('.popup_opened'));
        }
    }

    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__close-button');
        closeButton.addEventListener('click', () => this.close());

        this._popup.addEventListener('mousedown', (event) => {
            if (event.target === event.currentTarget) {
              this.close(document.querySelector('.popup_opened'));
            }
        });
    }
}