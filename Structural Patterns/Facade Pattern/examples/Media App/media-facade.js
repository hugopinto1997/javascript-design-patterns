import { FetchMusic, GetMovie, booksResource, getTvShow } from "./service.js";
import { MEDIA_TYPES } from "./constants.js";

export default class CultureFacade {
  _error = { status: 404, error: `No item with this id found` };

  constructor(type) {
    this.type = type;
  }

  _tryToReturn(func, id) {
    const result = func.call(this, id);

    return new Promise((ok, err) => (!!result ? ok(result) : err(this._error)));
  }

  _findMusic(id) {
    const db = new FetchMusic();
    return db.fetch(id);
  }

  _findMovie(id) {
    const movie = new GetMovie(id);
    return movie.getResource();
  }

  _findTVShow(id) {
    return getTvShow(id);
  }

  _findBook(id) {
    return booksResource.find((item) => item.id === id);
  }

  get(id) {
    switch (this.type) {
      case MEDIA_TYPES.MUSIC: {
        return this._tryToReturn(this._findMusic, id);
      }

      case MEDIA_TYPES.MOVIE: {
        return this._tryToReturn(this._findMovie, id);
      }

      case MEDIA_TYPES.TV: {
        return this._tryToReturn(this._findTVShow, id);
      }

      case MEDIA_TYPES.BOOK: {
        return this._tryToReturn(this._findBook, id);
      }

      default: {
        throw new Error("No type set!");
      }
    }
  }
}
