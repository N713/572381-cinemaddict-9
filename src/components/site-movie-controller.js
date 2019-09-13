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
          } else if (evt.target.classList.contains(`film-card__controls-item--active`)) {
            evt.target.classList.remove(`film-card__controls-item--active`);
          }

          if (evt.target.classList.contains(`film-card__controls-item--add-to-watchlist`) && dataCopy[currentId].state.isToWatchlist === false) {
            dataCopy[currentId].state.isToWatchlist = true;
          } else if (dataCopy[currentId].state.isToWatchlist === true && evt.target.classList.contains(`film-card__controls-item--active`)) {
            dataCopy[currentId].state.isToWatchlist = false;
          }

          if (evt.target.classList.contains(`film-card__controls-item--mark-as-watched`) && dataCopy[currentId].state.isWatched === false) {
            dataCopy[currentId].state.isWatched = true;
          } else if (dataCopy[currentId].state.isWatched === true && evt.target.classList.contains(`film-card__controls-item--active`)) {
            dataCopy[currentId].state.isWatched = false;
          }

          if (evt.target.classList.contains(`film-card__controls-item--favorite`) && dataCopy[currentId].state.isFavorite === false) {
            dataCopy[currentId].state.isFavorite = true;
          } else if (dataCopy[currentId].state.isFavorite === true && evt.target.classList.contains(`film-card__controls-item--active`)) {
            dataCopy[currentId].state.isFavorite = false;
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
          body.querySelector(`.form-details__middle-container`).classList.remove(`visually-hidden`);
        } else {
          body.querySelector(`.form-details__middle-container`).classList.add(`visually-hidden`);
        }

        if (formData.get(`favoritw`) !== `on` && evt.target.classList.contains(`film-details__control-label--favorite`)) {
          dataCopy[Math.floor(Math.random() * (dataCopy.length - 0) + 0)].state.isFavorite = true;
        }

        this._onDataChange(dataCopy, this._data);
      }
    });

    this._onCommentEmojiClick();
  }

  _onCommentEmojiClick() {
    const emojiContainer = body.querySelector(`.film-details__add-emoji-label`);
    const emojiHeight = body.querySelector(`.film-details__comment-emoji img`).getAttribute(`height`);
    const emojiWidth = body.querySelector(`.film-details__comment-emoji img`).getAttribute(`width`);

    body.querySelectorAll(`.film-details__emoji-label`).forEach((label) => {
      label.addEventListener(`click`, () => {
        switch (label.getAttribute(`for`)) {
          case `emoji-sleeping`:
            emojiContainer.innerHTML = ``;
            emojiContainer.innerHTML = `<img src="./images/emoji/sleeping.png" width="${emojiWidth}" height="${emojiHeight}" alt="emoji">`;
            break;
          case `emoji-smile`:
            emojiContainer.innerHTML = ``;
            emojiContainer.innerHTML = `<img src="./images/emoji/smile.png" width="${emojiWidth}" height="${emojiHeight}" alt="emoji">`;
            break;
          case `emoji-gpuke`:
            emojiContainer.innerHTML = ``;
            emojiContainer.innerHTML = `<img src="./images/emoji/puke.png" width="${emojiWidth}" height="${emojiHeight}" alt="emoji">`;
            break;
          case `emoji-angry`:
            emojiContainer.innerHTML = ``;
            emojiContainer.innerHTML = `<img src="./images/emoji/angry.png" width="${emojiWidth}" height="${emojiHeight}" alt="emoji">`;
            break;
        }
      });
    });
  }
}
