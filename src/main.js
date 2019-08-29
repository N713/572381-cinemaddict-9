import {films} from "./components/site-data";
import {utils} from "./components/site-utils";
import {Search} from "./components/site-search";
import {Sorting} from "./components/site-sorting";
import {getFilmData} from "./components/site-data";
import {getPopupData} from "./components/site-data";
import {FilmCard} from "./components/site-film-card";
import {TopFilms} from "./components/site-films-top";
import {FilmPopup} from "./components/site-film-popup";
import {FilmsList} from "./components/site-films-list";
import {Navigation} from "./components/site-navigation";
import {ShowMoreButton} from "./components/site-show-more";
import {FilmSection} from "./components/site-film-section";
import {UserProfile} from "./components/site-user-profile";
import {FilmsListContainer} from "./components/site-films-container";
import {CommentedFilms} from "./components/site-films-commented";
import {FilmsListTitle} from "./components/site-films-list-title";

const ESC_KEYCODE = 27;
const NUMBER_OF_FILMS_TO_RENDER = 5;

const getElementFromClass = (classObject) => {
  return utils.makeElement(classObject.getTemplate());
};

const renderElements = (array, container, position) => {
  array.forEach((arrayElement) => {
    utils.render(container, arrayElement, position);
  });
};

const renderCard = (cardMock, cardContainer) => {
  const card = new FilmCard(cardMock);
  console.log(card);

  const title = card.getElement().querySelector(`.film-card__title`);
  const posterImage = card.getElement().querySelector(`.film-card img`);
  const commentsCount = card.getElement().querySelector(`.film-card__comments`);

  [title, posterImage, commentsCount].forEach((element) => {
    element.addEventListener(`click`, () => {
      document.querySelector(`.film-details`).classList
        .toggle(`visually-hidden`, false);
    });
    element.style.cursor = `pointer`;
  });

  utils.render(cardContainer, card.getElement(), utils.Position.BEFOREEND);
};

const renderPopup = (popupMock) => {
  const popup = new FilmPopup(popupMock);

  popup.getElement().classList.add(`visually-hidden`);

  document.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === ESC_KEYCODE) {
      popup.getElement().classList.toggle(`visually-hidden`, true);
    }
  });

  popup.getElement().querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, () => {
      popup.getElement().classList.toggle(`visually-hidden`, true);
    });

  utils.render(body, popup.getElement(), utils.Position.BEFOREEND);
};

const body = document.querySelector(`body`);
renderPopup(getPopupData());

const elementsIntoHeader = [getElementFromClass(new Search), getElementFromClass(new UserProfile)];
const elementsIntoMain = [getElementFromClass(new Navigation), getElementFromClass(new Sorting), getElementFromClass(new FilmSection)];
const elementsIntoFilmsSextion = [getElementFromClass(new FilmsList), getElementFromClass(new TopFilms), getElementFromClass(new CommentedFilms)];

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);
renderElements(elementsIntoHeader, headerElement, utils.Position.BEFOREEND);
renderElements(elementsIntoMain, mainElement, utils.Position.BEFOREEND);

const filmsSection = mainElement.querySelector(`.films`);
renderElements(elementsIntoFilmsSextion, filmsSection, utils.Position.BEFOREEND);

const filmsList = filmsSection.querySelector(`.films-list`);
utils.render(filmsList, getElementFromClass(new FilmsListTitle), utils.Position.BEFOREEND);

const upcomingMovies = filmsSection.querySelector(`.films-list__title`);
upcomingMovies.textContent = `All movies. Upcoming`;
upcomingMovies.classList.add(`visually-hidden`);
utils.render(filmsList, getElementFromClass(new FilmsListContainer), utils.Position.BEFOREEND);

const upcomingFilmsContainer = filmsList.querySelector(`.films-list__container`);
films.forEach((film) => {
  renderCard(film, upcomingFilmsContainer);
});
utils.render(upcomingFilmsContainer, getElementFromClass(new ShowMoreButton()), utils.Position.BEFOREEND);

const extraFilmsSections = filmsSection.querySelectorAll(`.films-list--extra`);
extraFilmsSections.forEach((section) => {
  utils.render(section, getElementFromClass(new FilmsListContainer()), utils.Position.BEFOREEND);
});

const extraFilmsContainers = filmsSection.querySelectorAll(`.films-list--extra .films-list__container`);
extraFilmsContainers.forEach((container) => {
  const extraData = new Array(extraFilmsContainers.length).fill(``).map(getFilmData);
  extraData.forEach((data) => {
    renderCard(data, container);
  });
});

const showMoreButton = filmsList.querySelector(`.films-list__show-more`);
let cards = filmsList.querySelectorAll(`.film-card`);
cards.forEach((card) => {
  card.classList.add(`visually-hidden`);
});

let limiter = 0;

const checkForHiddens = () => {
  let isHidden;

  for (let card of cards) {
    isHidden = card.classList.contains(`visually-hidden`);
  }

  return isHidden;
};

const showCards = () => {
  for (let i = 0; i < NUMBER_OF_FILMS_TO_RENDER + limiter; i++) {
    cards[i].classList.remove(`visually-hidden`);
  }

  if (!checkForHiddens()) {
    showMoreButton.classList.add(`visually-hidden`);
  }

  limiter += 5;
};

const onShowMoreClick = () => {
  showCards();
};

const filmsInBase = document.querySelector(`.footer__statistics p`);
filmsInBase.textContent = `${films.length.toString()} movies inside`;

showCards();
showMoreButton.addEventListener(`click`, onShowMoreClick);
