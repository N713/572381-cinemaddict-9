import {AbstractComponent} from "./site-abstract-component";

export class FilmSection extends AbstractComponent {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}
