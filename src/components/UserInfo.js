export default class UserInfo {
    constructor({ nameSelector, infoSelector }) {
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);

        this._nameInput = document.querySelector('.popup__input_type_name');
        this._infoInput = document.querySelector('.popup__input_type_info');
    }

    //вернуть объект с данными пользователя
    getUserInfo() {
        return {
            name: this._name.textContent,
            info: this._info.textContent
        };
    }

    //принять новые данные пользователя и добавить на страницу
    setUserInfo(userInfo) {
        this._name.textContent = userInfo.name;
        this._info.textContent = userInfo.info;
    }
}