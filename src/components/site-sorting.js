import {AbstractComponent} from "./site-abstract-component";

export class Sorting extends AbstractComponent {
  getTemplate() {
    return `
      <ul class="sort">
        <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#" class="sort__button">Sort by date</a></li>
        <li><a href="#" class="sort__button">Sort by rating</a></li>
      </ul>`;
  }

  getElement() {
    return super.getElement();
  }
}
