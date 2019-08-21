import {filtersValues} from './site-data';

export const makeNavigationTemplate = () => `
<nav class="main-navigation">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies <span class="main-navigation__item-count">${filtersValues[0].value}</span></a>
  <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filtersValues[1].value}</span></a>
  <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filtersValues[2].value}</span></a>
  <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filtersValues[3].value}</span></a>
  <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
</nav>
`;
