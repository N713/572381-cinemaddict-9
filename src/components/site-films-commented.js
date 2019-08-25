/*
export const makeCommentedFilmsTemplate = () => `
<section class="films-list--extra">
  <h2 class="films-list__title">Most commented</h2>
</section>`;

 */

export class CommentedFilms {
  getTemplate() {
    return `
      <section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>
      </section>`;
  }
};
