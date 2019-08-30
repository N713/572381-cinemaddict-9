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
import {PageController} from "./components/site-page-controller";

const NUMBER_OF_FILMS_TO_RENDER = 5;

utils.renderPopup(getPopupData());

const elementsIntoHeader = [utils.getElementFromClass(new Search), utils.getElementFromClass(new UserProfile)];
const elementsIntoMain = [utils.getElementFromClass(new Navigation), utils.getElementFromClass(new Sorting), utils.getElementFromClass(new FilmSection)];
const elementsIntoFilmsSextion = [utils.getElementFromClass(new FilmsList), utils.getElementFromClass(new TopFilms), utils.getElementFromClass(new CommentedFilms)];

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);
utils.renderElements(elementsIntoHeader, headerElement, utils.Position.BEFOREEND);
utils.renderElements(elementsIntoMain, mainElement, utils.Position.BEFOREEND);

const filmsSection = mainElement.querySelector(`.films`);
utils.renderElements(elementsIntoFilmsSextion, filmsSection, utils.Position.BEFOREEND);

const filmsList = filmsSection.querySelector(`.films-list`);
utils.render(filmsList, utils.getElementFromClass(new FilmsListTitle), utils.Position.BEFOREEND);

const upcomingMovies = filmsSection.querySelector(`.films-list__title`);
upcomingMovies.textContent = `All movies. Upcoming`;
upcomingMovies.classList.add(`visually-hidden`);
utils.render(filmsList, utils.getElementFromClass(new FilmsListContainer), utils.Position.BEFOREEND);

const upcomingFilmsContainer = filmsList.querySelector(`.films-list__container`);
const controller = new PageController(upcomingFilmsContainer, films);
controller.init();

utils.render(upcomingFilmsContainer, utils.getElementFromClass(new ShowMoreButton()), utils.Position.BEFOREEND);

const extraFilmsSections = filmsSection.querySelectorAll(`.films-list--extra`);
extraFilmsSections.forEach((section) => {
  utils.render(section, utils.getElementFromClass(new FilmsListContainer()), utils.Position.BEFOREEND);
});

const extraFilmsContainers = filmsSection.querySelectorAll(`.films-list--extra .films-list__container`);
extraFilmsContainers.forEach((container) => {
  const extraData = new Array(extraFilmsContainers.length).fill(``).map(getFilmData);
  const extraController = new PageController(container, extraData);
  extraController.init();
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
