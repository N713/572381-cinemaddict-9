import {films} from "./site-data";
import {utils} from "./site-utils";

const mainElement = document.querySelector(`.main`);

export class PageController {
  constructor(container, cards) {
    this._container = container;
    this._cards = cards;
  }

  init() {
    this._cards.forEach((card) => {
      utils.renderCard(card, this._container);
    });

    const filters = mainElement.querySelectorAll(`.sort__button`);
    const dataAtributes = [`default`, `by-date`, `by-rating`];

    for (let i = 0; i < filters.length; i++) {
      filters[i].setAttribute(`data-sorting`, dataAtributes[i]);
    }

    mainElement.querySelector(`.sort`).addEventListener(`click`, (evt) => this._onSortingClick(evt));
  }

  _onDataChange(newData, oldData) {
    this._cards[this._cards.findIndex((index) => index === oldData)] = newData;
    this._container.innerHTML = ``;
    utils.renderData(this._cards, this._container);
  }

  _onSortingClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._container.innerHTML = ``;

    if (!evt.target.classList.contains(`sort__button--active`)) {
      let currentFilter = mainElement.querySelector(`.sort__button--active`);
      currentFilter.classList.remove(`sort__button--active`);
      evt.target.classList.add(`sort__button--active`);
    }

    switch (evt.target.dataset.sorting) {
      case `default`:
        const defaultData = films.slice();
        utils.renderData(defaultData, this._container);
        break;
      case `by-date`:
        const sortedByDate = films.slice().sort((a, b) => b.year - a.year);
        utils.renderData(sortedByDate, this._container);
        break;
      case `by-rating`:
        const sortedByRating = films.slice().sort((a, b) => b.rating - a.rating);
        utils.renderData(sortedByRating, this._container);
        break;
    }
  }
}
