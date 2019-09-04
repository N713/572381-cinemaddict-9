export class AbstractComponent {
  constructor() {
    this._element = null;

    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
  }

  static makeElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstElementChild;
  }

  getElement() {
    if (!this._element) {
      this._element = AbstractComponent.makeElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    throw Error(`Abstract method not implemented`);
  }

  removeElement() {
    this._element = null;
  }
}
