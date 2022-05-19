export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._arrayItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    //отрисовка каждого элемента
    renderItems() {
        this._arrayItems.forEach(item => {
            this._renderer(item);
        })
    }

    //принимает DOM-элемент и добавляет его в контейнер
    addItem(element) {
        this._container.prepend(element);
    }
}