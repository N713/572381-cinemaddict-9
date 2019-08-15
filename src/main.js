import {makeFilmsListContainerTemplate} from '../src/components/site-films-container';
import {makeFilmsListTitleTemplate} from '../src/components/site-films-list-title';
import {makeShowMoreButtonTemplate} from '../src/components/site-show-more';
import {makeCommentedFilmsTemplate} from '../src/components/site-films-commented';
import {makeUserProfileTemplate} from '../src/components/site-user-profile.js';
import {makeNavigationTemplate} from '../src/components/site-navigation';
import {makeFilmsListTemplate} from '../src/components/site-films-list';
import {makeFilmCardTemplate} from '../src/components/site-film-card';
import {makeTopFilmsTemplate} from '../src/components/site-films-top';
import {makeSortingTemplate} from '../src/components/site-sorting.js';
import {makeSearchTemplate} from '../src/components/site-search.js';
import {makePopupTemplate} from '../src/components/site-film-popup';
import {makeFilmSection} from '../src/components/site-film-section.js';

const NUMBER_OF_FILMS_TO_RENDER = 5;
const NUMBER_OF_EXTRA_FILMS = 2;

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);

const renderTemplate = (parent, template, place) => {
  parent.insertAdjacentHTML(place, template);
};

const renderTemplates = (templatesArray, parentElement) => {
  templatesArray.forEach((template) => {
    renderTemplate(parentElement, template, `beforeend`);
  });
};

const renderCards = (numberOfCards, parentElement) => {
  new Array(numberOfCards).fill(``).forEach(() =>
    renderTemplate(parentElement, makeFilmCardTemplate(), `beforeend`));
};

const renderExtraFilmsCards = (numberOfCards, extraSection) => {
  renderTemplate(extraSection, makeFilmsListContainerTemplate(), `beforeend`);
  let filmsContainer = extraSection.querySelector(`.films-list__container`);
  renderCards(numberOfCards, filmsContainer);
};

const templatesIntoHeader = [makeSearchTemplate(), makeUserProfileTemplate()];
const templatesIntoMain = [makeNavigationTemplate(), makeSortingTemplate(), makeFilmSection()];
renderTemplates(templatesIntoHeader, headerElement);
renderTemplates(templatesIntoMain, mainElement);

const filmsSection = mainElement.querySelector(`.films`);
const templatesIntoFilmsSection = [makeFilmsListTemplate(), makeTopFilmsTemplate(), makeCommentedFilmsTemplate()];
renderTemplates(templatesIntoFilmsSection, filmsSection);

const filmsList = filmsSection.querySelector(`.films-list`);
renderTemplate(filmsList, makeFilmsListTitleTemplate(), `beforeend`);

const upcomingMovies = filmsSection.querySelector(`.films-list__title`);
upcomingMovies.textContent = `All movies. Upcoming`;
upcomingMovies.classList.add(`visually-hidden`);
renderTemplate(filmsList, makeFilmsListContainerTemplate(), `beforeend`);

const upcomingFilmsContainer = filmsList.querySelector(`.films-list__container`);
renderCards(NUMBER_OF_FILMS_TO_RENDER, upcomingFilmsContainer);
renderTemplate(filmsList, makeShowMoreButtonTemplate(), `beforeend`);

const extraFilmsSections = filmsSection.querySelectorAll(`.films-list--extra`);
extraFilmsSections.forEach((section) => {
  renderExtraFilmsCards(NUMBER_OF_EXTRA_FILMS, section);
});

const body = document.querySelector(`body`);
renderTemplate(body, makePopupTemplate(), `beforeend`);
document.querySelector(`.film-details`).classList.add(`visually-hidden`);
