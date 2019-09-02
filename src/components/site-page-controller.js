import {films} from "./site-data";
import {utils} from "./site-utils";
import {Sorting} from "./site-sorting";

export class PageController {
  constructor(container, cards) {
    this._container = container;
    this._cards = cards;
    this._sort = new Sorting();
  }

  init() {
    this._cards.forEach((card) => {
      utils.renderCard(card, this._container);
    });

    this._sort.getElement().querySelectorAll(`.sort__button`)
      .forEach(() => addEventListener(`click`, (evt) => this._onSortingClick(evt)));
  }

  _onSortingClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._container.innerHTML = ``;

    switch (evt.target.dataset.sorting) {
      case `default`:
        const defaultData = films.slice();
        defaultData.forEach((film) => {
          utils.renderCard(film, this._container);
        });
        break;
      case `by-date`:
        const sortedByDate = films.slice().sort((a, b) => b.year - a.year);
        sortedByDate.forEach((film) => {
          utils.renderCard(film, this._container);
        });
        break;
      case `by-rating`:
        const sortedByRating = films.slice().sort((a, b) => b.rating - a.rating);
        sortedByRating.forEach((film) => {
          utils.renderCard(film, this._container);
        });
        break;
    }
  }
}
