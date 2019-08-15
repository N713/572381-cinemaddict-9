import {makeSearchTemplate} from '../src/components/site-search.js';
import {makeUserProfileTemplate} from '../src/components/site-user-profile.js';
import {makeNavigationTemplate} from '../src/components/site-navigation';
import {makeSortingTemplate} from '../src/components/site-sorting.js';
import {makeFilmSection} from '../src/components/site-film-section.js';
import {makeFilmsListTemplate} from '../src/components/site-films-list';
import {makeFilmsListTitleTemplate} from '../src/components/site-films-list-title';
import {makeFilmsListContainerTemplate} from '../src/components/site-films-container';
import {makeFilmCardTemplate} from '../src/components/site-film-card';
import {makeFilmsListExtraTemplate} from '../src/components/site-films-list-extra';
import {makeShowMoreButtonTemplate} from '../src/components/site-show-more';
import {makeTopFilmsTemplate} from '../src/components/site-films-top';
import {makeCommentedFilmsTemplate} from '../src/components/site-films-commented';
import {makePopupTemplate} from '../src/components/site-film-popup';

const NUMBER_OF_FILMS_TO_RENDER = 5;
const NUMBER_OF_EXTRA_FILMS = 2;

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);

const renderTemplate = (parent, template, place) => {
  parent.insertAdjacentHTML(place, template);
};

renderTemplate(headerElement, makeSearchTemplate(), `beforeend`);
renderTemplate(headerElement, makeUserProfileTemplate(), `beforeend`);

renderTemplate(mainElement, makeNavigationTemplate(), `beforeend`);
renderTemplate(mainElement, makeSortingTemplate(), `beforeend`);
renderTemplate(mainElement, makeFilmSection(), `beforeend`);

const filmsSection = mainElement.querySelector(`.films`);

renderTemplate(filmsSection, makeFilmsListTemplate(), `beforeend`);
renderTemplate(filmsSection, makeTopFilmsTemplate(), `beforeend`);
renderTemplate(filmsSection, makeCommentedFilmsTemplate(), `beforeend`);

const filmsList = filmsSection.querySelector(`.films-list`);

renderTemplate(filmsList, makeFilmsListTitleTemplate(), `beforeend`);

const upcomingMovies = filmsSection.querySelector(`.films-list__title`);
upcomingMovies.textContent = `All movies. Upcoming`;
upcomingMovies.classList.add(`visually-hidden`);

renderTemplate(filmsList, makeFilmsListContainerTemplate(), `beforeend`);

const upcomingFilmsContainer = filmsList.querySelector(`.films-list__container`);

new Array(NUMBER_OF_FILMS_TO_RENDER).fill(``).forEach(() =>
  renderTemplate(upcomingFilmsContainer, makeFilmCardTemplate(), `beforeend`));

//-------------

const extraFilmsSections = filmsSection.querySelectorAll(`.films-list--extra`);

const topRatedFilmsSection = extraFilmsSections[0];
renderTemplate(topRatedFilmsSection, makeFilmsListContainerTemplate(), `beforeend`);

const topRatedFilmsContainer = topRatedFilmsSection.querySelector(`.films-list__container`);
new Array(NUMBER_OF_EXTRA_FILMS).fill(``).forEach(() =>
  renderTemplate(topRatedFilmsContainer, makeFilmCardTemplate(), `beforeend`));

const mostCommentedFilmsSection = extraFilmsSections[1];
renderTemplate(mostCommentedFilmsSection, makeFilmsListContainerTemplate(), `beforeend`);

const mostCommentedFilmsContainer = mostCommentedFilmsSection.querySelector(`.films-list__container`);
new Array(NUMBER_OF_EXTRA_FILMS).fill(``).forEach(() =>
  renderTemplate(mostCommentedFilmsContainer, makeFilmCardTemplate(), `beforeend`));

//-------------

const body = document.querySelector(`body`);
renderTemplate(body, makePopupTemplate(), `beforeend`);

document.querySelector(`.film-details`).classList.add(`visually-hidden`);
