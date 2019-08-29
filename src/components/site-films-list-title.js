import {AbstractComponent} from "./site-abstract-component";

export class FilmsListTitle extends AbstractComponent {
  getTemplate() {
    return `<h2 class="films-list__title"></h2>`;
  }
}
