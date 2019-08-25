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
import {FilmsContainer} from "./components/site-films-container";
import {CommentedFilms} from "./components/site-films-commented";
import {FilmsListTitle} from "./components/site-films-list-title";

const getElementFromClass = (classObject) => {
  const instance = new classObject;
  const instanceElement = utils.makeElement(instance.getTemplate());
  return instanceElement;
};

const renderElements = (array, container, position) => {
  array.forEach((arrayElement) => {
    utils.render(container, arrayElement, position);
  });
};

const elementsIntoHeader = [getElementFromClass(Search), getElementFromClass(UserProfile)];
const elementsIntoMain = [getElementFromClass(Navigation), getElementFromClass(Sorting), getElementFromClass(FilmSection)];
const elementsIntoFilmsSextion = [getElementFromClass(FilmsList), getElementFromClass(TopFilms), getElementFromClass(CommentedFilms)];

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);
renderElements(elementsIntoHeader, headerElement, utils.Position.BEFOREEND);
renderElements(elementsIntoMain, mainElement, utils.Position.BEFOREEND);

const filmsSection = mainElement.querySelector(`.films`);
renderElements(elementsIntoFilmsSextion, filmsSection, utils.Position.BEFOREEND);

