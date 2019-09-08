import {AbstractComponent} from "./site-abstract-component";

export class FilmCard extends AbstractComponent {
  constructor({poster, title, rating, year, duration, genre, description, comment, state}) {
    super();
    this._poster = poster;
    this._title = title;
    this._rating = rating;
    this._year = year;
    this._duration = duration;
    this._genre = genre;
    this._description = description;
    this._comment = comment;
    this._state = state;
  }

  getTemplate() {
    return `
     <article class="film-card">
        <h3 class="film-card__title">${this._title}</h3>
        <p class="film-card__rating">${this._rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${this._year}</span>
          <span class="film-card__duration">${this._duration}</span>
          <span class="film-card__genre">${this._genre}</span>
        </p>
        <img src="${this._poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${this._description}</p>
        <a class="film-card__comments">${this._comment.length} comments</a>
        <form class="film-card__controls">
          <button class="${this._state.isToWatchlist ? `film-card__controls-item--active` : ``} film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
          <button class="${this._state.isWatched ? `film-card__controls-item--active` : ``} film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
          <button class="${this._state.isFavorite ? `film-card__controls-item--active` : ``} film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
        </form>
      </article>`;
  }
}
