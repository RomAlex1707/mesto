// Класс размещения карточек на странице
export default class Section {
    constructor({ items, renderer }, containerSelector) {
      this._initialArray = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }

    setItems(newItems) {
      this._initialArray = newItems;
    }
    
  // Рендер карточек
    renderItems() {
      this._initialArray.forEach((item) => this._renderer(item));
    }
  // Добавление карточки
    addItem(element) {
      this._container.append(element);
    }
  }

  