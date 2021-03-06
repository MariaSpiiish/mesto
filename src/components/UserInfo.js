export default class UserInfo {
    constructor({ nameSelector, infoSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    //вернуть объект с данными пользователя
    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._info.textContent,
            avatar: this._avatar.src,
        };
    }

    //принять новые данные пользователя и добавить на страницу
    setUserInfo({ name, about, avatar }) {
        this._name.textContent = name;
        this._info.textContent = about;
        this._avatar.src = avatar;
    }
}