import {utils} from "./site-utils";

export class PageController {
  constructor(container, cards) {
    this._container = container;
    this._cards = cards;
  }

  init() {
    this._cards.forEach((card) => {
      utils.renderCard(card, this._container);
    });
  }
}
