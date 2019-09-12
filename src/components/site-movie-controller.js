import {utils} from "./site-utils";
import {films, getPopupData} from "./site-data";

const body = document.querySelector(`body`);
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

          if (!evt.target.classList.contains(`film-card__controls-item--active`)) {
            evt.target.classList.add(`film-card__controls-item--active`);
          }

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

    body.querySelector(`.film-details__controls`).addEventListener(`click`, (evt) => {

      if (evt.target.tagName === `LABEL` && evt.target.classList.contains(`film-details__control-label`)) {
        const formData = new FormData(body.querySelector(`.film-details__inner`));

        if (formData.get(`watchlist`) !== `on` && evt.target.classList.contains(`film-details__control-label--watchlist`)) {
          dataCopy[Math.floor(Math.random() * (dataCopy.length - 0) + 0)].state.isToWatchlist = true;
        }

        if (formData.get(`watched`) !== `on` && evt.target.classList.contains(`film-details__control-label--watched`)) {
          dataCopy[Math.floor(Math.random() * (dataCopy.length - 0) + 0)].state.isWatched = true;
        }

        if (formData.get(`favoritw`) !== `on` && evt.target.classList.contains(`film-details__control-label--favorite`)) {
          dataCopy[Math.floor(Math.random() * (dataCopy.length - 0) + 0)].state.isFavorite = true;
        }

        this._onDataChange(dataCopy, this._data);
      }
    });
  }
}
