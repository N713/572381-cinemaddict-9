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

const getElementFromClass = (classObject) => {
  const instance = classObject;
  const instanceElement = utils.makeElement(instance.getTemplate());
  return instanceElement;
};

const renderElements = (array, container, position) => {
  array.forEach((arrayElement) => {
    utils.render(container, arrayElement, position);
  });
};

const renderCard = (cardMock, cardContainer) => {
  const card = new FilmCard(cardMock);

  utils.render(cardContainer, card.getElement(), utils.Position.BEFOREEND);
};

const renderPopup = (popupMock) => {
  const popup = new FilmPopup(popupMock);
  utils.render(body, popup.getElement(), utils.Position.BEFOREEND);
  const popupElement = document.querySelector(`.film-details`);
  popupElement.classList.add(`visually-hidden`);
}

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

const filmsInBase = document.querySelector(`.footer__statistics p`);
filmsInBase.textContent = `${films.length.toString()} movies inside`;
