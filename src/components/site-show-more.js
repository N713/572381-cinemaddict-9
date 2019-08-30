import {AbstractComponent} from "./site-abstract-component";

export class ShowMoreButton extends AbstractComponent {
  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }
}
