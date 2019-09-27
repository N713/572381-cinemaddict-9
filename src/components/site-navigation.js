import {AbstractComponent} from "./site-abstract-component";
import {filtersValues} from './site-data';

export class Navigation extends AbstractComponent {
  getTemplate() {
    return `
      <nav class="main-navigation">
        ${Array.from(filtersValues).map((filter) => `
        <a href="${filter.filter}" class="main-navigation__item main-navigation__item--active">${filter.filter} <span class="main-navigation__item-count">${filter.value}</span></a>
        `).join(``)}
        <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
      </nav>`;
  }
}
