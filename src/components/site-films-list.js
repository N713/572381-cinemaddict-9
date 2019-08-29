import {AbstractComponent} from "./site-abstract-component";

export class FilmsList extends AbstractComponent {
  getTemplate() {
    return `<section class="films-list"></section>`;
  }
}
