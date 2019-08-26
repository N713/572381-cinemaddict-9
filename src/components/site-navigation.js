import {filtersValues} from './site-data';

export class Navigation {
  getTemplate() {
    return `
      <nav class="main-navigation">
        ${Array.from(filtersValues).map((filter) => `
        <a href="${filter.filter}" class="main-navigation__item main-navigation__item--active">${filter.filter} <span class="main-navigation__item-count">${filter.value}</span></a>
        `).join(``)}
      </nav>`;
  }
}
