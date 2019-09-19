const NUMBER_OF_FILMS_TO_RENDER = 20;
const NUMBER_OF_TITLES = 7;
const STRINGS_TO_DESCRIPTION = 3;
const COMMENTS_NUMBER = 4;

const getRandomIntegerUnder = (under = 1) => {
  return Math.floor(Math.random() * under);
};

const minutesToHours = (minutes) => {
  let hours = Math.floor(minutes / 60);
  let lastMinutes = minutes - (hours * 60);

  if (lastMinutes < 10) {
    return `${hours}h 0${lastMinutes}m`;
  }

  return `${hours}h ${lastMinutes}m`;
};

const avoidZero = (number) => {
  if (number === 0) {
    number = 1;
  }

  return number;
};

const getPoster = () => {
  return [
    `./images/posters/made-for-each-other.png`,
    `./images/posters/popeye-meets-sinbad.png`,
    `./images/posters/sagebrush-trail.jpg`,
    `./images/posters/santa-claus-conquers-the-martians.jpg`,
    `./images/posters/the-dance-of-life.jpg`,
    `./images/posters/the-great-flamarion.jpg`,
    `./images/posters/the-man-with-the-golden-arm.jpg`
  ][getRandomIntegerUnder(NUMBER_OF_TITLES)];
};

const getTitle = () => {
  return [
    `Made For Each Other`,
    `Popeye Meets Sindbad`,
    `Sagebrush Trail`,
    `Santa Claus Conquers The Martians`,
    `The Dance Of Life`,
    `The Great Flamarion`,
    `The Man With The Golden Arm`
  ][getRandomIntegerUnder(NUMBER_OF_TITLES)];
};

const getRating = () => {
  return [8.1, 7.5, 6.8, 7.7, 9.0, 1.2, 5.5][getRandomIntegerUnder(NUMBER_OF_TITLES)];
};

const getYear = () => {
  return [1929, 1956, 1977, 2002, 1993, 1961, 1985][getRandomIntegerUnder(NUMBER_OF_TITLES)];
};

const getDuration = () => {
  return minutesToHours([124, 136, 142, 112, 137, 141, 55][getRandomIntegerUnder(NUMBER_OF_TITLES)]);
};

const getGenre = () => {
  return [`comedy`, `musical`, `action`, `drama`, `thriller`, `horror`, `documental`][getRandomIntegerUnder(NUMBER_OF_TITLES)];
};

const getDescription = () => {
  return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. 
  Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. 
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. 
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. 
  Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. 
  Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.
  `.split(`.`, avoidZero(getRandomIntegerUnder(STRINGS_TO_DESCRIPTION)));
};

const getComment = () => {
  return [
    `Interesting setting and a good cast`,
    `Booooooooooring`,
    `Very very old. Meh`,
    `Almost two hours? Seriously?`
  ].slice([getRandomIntegerUnder(COMMENTS_NUMBER)], getRandomIntegerUnder(COMMENTS_NUMBER));
};

export const getFilmData = () => ({
  poster: getPoster(),
  title: getTitle(),
  rating: getRating(),
  year: getYear(),
  duration: getDuration(),
  genre: getGenre(),
  description: getDescription(),
  comment: getComment(),
  state: {
    isToWatchlist: false,
    isWatched: false,
    isFavorite: false,
  },
  age: [12, 14, 16, 18][getRandomIntegerUnder(COMMENTS_NUMBER)],
  director: [`Anthony Mann`, `Anthony Wann`, `Anthony Zann`][getRandomIntegerUnder(STRINGS_TO_DESCRIPTION)],
  writer: [`Anne Wigton`, `Heinz Herald`, `Richard Weil`][getRandomIntegerUnder(STRINGS_TO_DESCRIPTION)],
  actors: [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`][getRandomIntegerUnder(STRINGS_TO_DESCRIPTION)],
  releaseDate: getYear(),
  runtime: getDuration(),
  country: [`USA`, `Canada`, `France`, `Germany`, `Italy`, `Spain`, `Norway`][getRandomIntegerUnder(NUMBER_OF_TITLES)],
  genres: [`comedy`, `musical`, `action`, `drama`, `thriller`, `horror`, `documental`]
    .slice(getRandomIntegerUnder(0), avoidZero(getRandomIntegerUnder(NUMBER_OF_TITLES))),
});

export const films = new Array(NUMBER_OF_FILMS_TO_RENDER).fill(``).map(getFilmData);
export const numberOfSeen = getRandomIntegerUnder(NUMBER_OF_TITLES);

export const filtersValues = [
  {filter: `All movies`, value: films.length},
  {filter: `Watchlist`, value: getRandomIntegerUnder(NUMBER_OF_TITLES)},
  {filter: `History`, value: getRandomIntegerUnder(NUMBER_OF_TITLES)},
  {filter: `Favorites`, value: getRandomIntegerUnder(NUMBER_OF_TITLES)},
];

const getCommentsData = () => ({
  author: [
    `Tim Macoveev`,
    `John Doe`,
    `Don Joe`,
    `Bon Boe`,
    `Ron Chloe`][getRandomIntegerUnder(COMMENTS_NUMBER)],
  text: [
    `Interesting setting and a good cast`,
    `Booooooooooring`,
    `Very very old. Meh`,
    `Almost two hours? Seriously?`
  ][getRandomIntegerUnder(COMMENTS_NUMBER)],
  date: Date.now() - (1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000),
  emoji: [
    `./images/emoji/smile.png`,
    `./images/emoji/sleeping.png`,
    `./images/emoji/puke.png`,
    `./images/emoji/angry.png`,
  ][getRandomIntegerUnder(COMMENTS_NUMBER)],
});

export const commentsData = new Array(COMMENTS_NUMBER).fill(``).map(getCommentsData);
