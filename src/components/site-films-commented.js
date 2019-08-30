import {AbstractComponent} from "./site-abstract-component";

export class CommentedFilms extends AbstractComponent {
  getTemplate() {
    return `
      <section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>
      </section>`;
  }
}
