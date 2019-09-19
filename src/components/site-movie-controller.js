import {utils} from "./site-utils";

const body = document.querySelector(`body`);
const mainElement = document.querySelector(`.main`);

export class MovieController {
  constructor(data, onDataChange) {
    this._data = data;
    this._onDataChange = onDataChange;
  }

  init() {
    utils.renderPopup(this._data[0]);
    this._onCardControlClick();
    this._onCardClick();
  }

  _onCardClick() {
    mainElement.querySelectorAll(`.film-card`).forEach((card) => {
      card.addEventListener(`click`, (evt) => {
        if (evt.target.tagName === `TITLE` || `IMG` || `P`) {
          const cardId = parseInt(`${evt.target.parentNode.getAttribute(`data-id`)}`, 10);
          utils.remove(body.querySelector(`.film-details`));
          utils.renderPopup(this._data[cardId]);
          body.querySelector(`.film-details`).classList.remove(`visually-hidden`);
          body.querySelector(`.film-details__controls`).setAttribute(`data-controls`, cardId);
          this._onPopupControlClick();
          this._onCommentEmojiClick();
          this._onRatingControlClick();
        }
      });
    });
  }

  _onCardControlClick() {
    const dataCopy = this._data.slice();

    mainElement.querySelectorAll(`.film-card`).forEach((card) => {
      card.addEventListener(`click`, (evt) => {
        evt.preventDefault();

        if (evt.target.tagName === `BUTTON`) {
          const currentId = card.dataset.id;

          evt.target.classList.toggle(`film-card__controls-item--active`);

          if (evt.target.classList.contains(`film-card__controls-item--add-to-watchlist`)) {
            dataCopy[currentId].state.isToWatchlist = !dataCopy[currentId].state.isToWatchlist;
          } else if (evt.target.classList.contains(`film-card__controls-item--active`)) {
            dataCopy[currentId].state.isToWatchlist = false;
          }

          if (evt.target.classList.contains(`film-card__controls-item--mark-as-watched`)) {
            dataCopy[currentId].state.isWatched = !dataCopy[currentId].state.isWatched;
          } else if (evt.target.classList.contains(`film-card__controls-item--active`)) {
            dataCopy[currentId].state.isWatched = false;
          }

          if (evt.target.classList.contains(`film-card__controls-item--favorite`)) {
            dataCopy[currentId].state.isFavorite = !dataCopy[currentId].state.isFavorite;
          } else if (evt.target.classList.contains(`film-card__controls-item--active`)) {
            dataCopy[currentId].state.isFavorite = false;
          }

          this._onDataChange(dataCopy, this._data);
        }
      });
    });
  }

  _onPopupControlClick() {
    const dataCopy = this._data.slice();
    const currentCard = body.querySelector(`.film-details__controls`)
      .dataset.controls;

    body.querySelector(`.film-details__controls`).addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `LABEL` && evt.target.classList.contains(`film-details__control-label`)) {
        const formData = new FormData(body.querySelector(`.film-details__inner`));

        if (formData.get(`watchlist`) !== `on` && evt.target.classList.contains(`film-details__control-label--watchlist`)) {
          dataCopy[currentCard].state.isToWatchlist = true;
        } else if (formData.get(`watchlist`) === `on` && evt.target.classList.contains(`film-details__control-label--watchlist`)) {
          dataCopy[currentCard].state.isToWatchlist = false;
        }

        if (formData.get(`watched`) !== `on` && evt.target.classList.contains(`film-details__control-label--watched`)) {
          dataCopy[currentCard].state.isWatched = true;
          body.querySelector(`.form-details__middle-container`).classList.remove(`visually-hidden`);
        } else if (formData.get(`watched`) === `on` && evt.target.classList.contains(`film-details__control-label--watched`)) {
          body.querySelector(`.form-details__middle-container`).classList.add(`visually-hidden`);
          ataCopy[currentCard].state.isWatched = false;
        }

        if (formData.get(`favorite`) !== `on` && evt.target.classList.contains(`film-details__control-label--favorite`)) {
          dataCopy[currentCard].state.isFavorite = true;
        } else if (formData.get(`favorite`) === `on` && evt.target.classList.contains(`film-details__control-label--favorite`)) {
          dataCopy[currentCard].state.isFavorite = false;
        }

        this._onDataChange(dataCopy, this._data);
      }
    });
  }

  _onCommentEmojiClick() {
    const emojiContainer = body.querySelector(`.film-details__add-emoji-label`);
    const emojiHeight = body.querySelector(`.film-details__comment-emoji img`).getAttribute(`height`);
    const emojiWidth = body.querySelector(`.film-details__comment-emoji img`).getAttribute(`width`);
    emojiContainer.innerHTML = ``;

    body.querySelectorAll(`.film-details__emoji-label`).forEach((label) => {
      label.addEventListener(`click`, () => {
        switch (label.getAttribute(`for`)) {
          case `emoji-sleeping`:
            emojiContainer.innerHTML = `<img src="./images/emoji/sleeping.png" width="${emojiWidth}" height="${emojiHeight}" alt="emoji">`;
            break;
          case `emoji-smile`:
            emojiContainer.innerHTML = `<img src="./images/emoji/smile.png" width="${emojiWidth}" height="${emojiHeight}" alt="emoji">`;
            break;
          case `emoji-gpuke`:
            emojiContainer.innerHTML = `<img src="./images/emoji/puke.png" width="${emojiWidth}" height="${emojiHeight}" alt="emoji">`;
            break;
          case `emoji-angry`:
            emojiContainer.innerHTML = `<img src="./images/emoji/angry.png" width="${emojiWidth}" height="${emojiHeight}" alt="emoji">`;
            break;
        }
      });
    });
  }

  _onRatingControlClick() {
    const totalRating = parseInt(body.querySelector(`.film-details__total-rating`).textContent, 10);

    body.querySelectorAll(`.film-details__user-rating-label`).forEach((control) => {
      control.addEventListener(`click`, (evt) => {
        const middleRating = (totalRating + parseInt(`${evt.target.textContent}`, 10)) / 2;
        body.querySelector(`.film-details__total-rating`).textContent = middleRating;
      });
    });
  }
}
