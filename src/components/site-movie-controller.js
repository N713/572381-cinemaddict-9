import {utils} from "./site-utils";
import {films, getPopupData} from "./site-data";

const mainElement = document.querySelector(`.main`);

export class MovieController {
  constructor(data, onDataChange) {
    this._data = data;
    this._onDataChange = onDataChange;
  }

  init() {
    utils.renderPopup(getPopupData());

    const dataCopy = films.slice();

    mainElement.querySelectorAll(`.film-card`).forEach((card) => {
      card.addEventListener(`click`, (evt) => {
        evt.preventDefault();

        if (evt.target.tagName === `BUTTON`) {
          const currentId = card.dataset.id;

          if (evt.target.classList.contains(`film-card__controls-item--add-to-watchlist`)) {
            dataCopy[currentId].state.isToWatchlist = true;
          }

          if (evt.target.classList.contains(`film-card__controls-item--mark-as-watched`)) {
            dataCopy[currentId].state.isWatched = true;
          }

          if (evt.target.classList.contains(`film-card__controls-item--favorite`)) {
            dataCopy[currentId].state.isFavorite = true;
          }

          this._onDataChange(dataCopy, this._data);
        }
      });
    });
  }
}
