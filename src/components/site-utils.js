import {AbstractComponent} from "./site-abstract-component";
import {FilmPopup} from "./site-film-popup";
import {FilmCard} from "./site-film-card";

const ESC_KEYCODE = 27;
const body = document.querySelector(`body`);

export const utils = {
  Position: {
    AFTERBEGIN: `afterbegin`,
    BEFOREEND: `beforeend`,
  },

  render: (container, element, place) => {
    switch (place) {
      case utils.Position.AFTERBEGIN:
        container.prepend(element);
        break;
      case utils.Position.BEFOREEND:
        container.append(element);
        break;
    }
  },

  remove: (element) => {
    if (element) {
      element.remove();
    }
  },

  getElementFromClass: (classObject) => {
    return AbstractComponent.makeElement(classObject.getTemplate());
  },

  renderElements: (array, container, position) => {
    array.forEach((arrayElement) => {
      utils.render(container, arrayElement, position);
    });
  },

  renderCard: (cardMock, cardContainer) => {
    const card = new FilmCard(cardMock);

    const title = card.getElement().querySelector(`.film-card__title`);
    const posterImage = card.getElement().querySelector(`.film-card img`);
    const commentsCount = card.getElement().querySelector(`.film-card__comments`);

    [title, posterImage, commentsCount].forEach((element) => {
      element.addEventListener(`click`, () => {
        document.querySelector(`.film-details`).classList
          .remove(`visually-hidden`);
      });
      element.style.cursor = `pointer`;
    });

    utils.render(cardContainer, card.getElement(), utils.Position.BEFOREEND);
  },

  renderPopup: (popupMock) => {
    const popup = new FilmPopup(popupMock);

    popup.getElement().classList.add(`visually-hidden`);

    document.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === ESC_KEYCODE) {
        popup.getElement().classList.add(`visually-hidden`);
      }
    });

    popup.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, () => {
        popup.getElement().classList.add(`visually-hidden`);
      });

    utils.render(body, popup.getElement(), utils.Position.BEFOREEND);
  },

  renderData: (data, container) => {
    data.forEach((element) => {
      utils.renderCard(element, container);
    });
  },
};
