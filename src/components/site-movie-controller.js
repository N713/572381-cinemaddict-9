import {utils} from "./site-utils";
import {PageController} from "./site-page-controller";
import {ShowMoreButton} from "./site-show-more";

const body = document.querySelector(`body`);
const mainElement = document.querySelector(`.main`);

export class MovieController {
  constructor(data, onDataChange) {
    this._data = data;
    this._onDataChange = onDataChange;
  }

  init() {
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
          }

          if (evt.target.classList.contains(`film-card__controls-item--mark-as-watched`)) {
            dataCopy[currentId].state.isWatched = !dataCopy[currentId].state.isWatched;
          }

          if (evt.target.classList.contains(`film-card__controls-item--favorite`)) {
            dataCopy[currentId].state.isFavorite = !dataCopy[currentId].state.isFavorite;
          }

          this._onDataChange(dataCopy, this._data);
          const controller = new PageController(mainElement.querySelector(`.films-list__container`), this._data);
          controller.init();
          utils.render(mainElement.querySelector(`.films-list__container`), utils.getElementFromClass(new ShowMoreButton()), utils.Position.BEFOREEND);
          const movieController = new MovieController(this._data, this._onDataChange);
          movieController.init();
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

        if (evt.target.classList.contains(`film-details__control-label--watchlist`)) {
          dataCopy[currentCard].state.isToWatchlist = formData.get(`watchlist`) !== `on`;
        }

        if (evt.target.classList.contains(`film-details__control-label--watched`)) {
          dataCopy[currentCard].state.isWatched = formData.get(`watched`) !== `on`;
          body.querySelector(`.form-details__middle-container`).classList.remove(`visually-hidden`);
        }

        if (evt.target.classList.contains(`film-details__control-label--favorite`)) {
          dataCopy[currentCard].state.isFavorite = formData.get(`favorite`) !== `on`;
        }

        this._onDataChange(dataCopy, this._data);
        const controller = new PageController(mainElement.querySelector(`.films-list__container`), this._data);
        controller.init();
        utils.render(mainElement.querySelector(`.films-list__container`), utils.getElementFromClass(new ShowMoreButton()), utils.Position.BEFOREEND);
        const movieController = new MovieController(this._data, this._onDataChange);
        movieController.init();
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
