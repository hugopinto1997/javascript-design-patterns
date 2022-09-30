# Facade Pattern

**Pattern Type**: Structural.

Provide a simpler abstracted interface to a larger and (potentially moreplex) body of code.

<br>

## Overview

Facades can frequently be found across the so popular JQuery library, and also provides developers easy access to implementations for handling DOM manipulation, animations and of particular interest, cross-browser AJAX.

For example, the following jQuery `$.ajax()`:

```js
$.get(url, data, callback, dataType);
$.post(url, data, callback, dataType);
$.getJSON(url, data, callback);
$.getScript(url, callback);
```

The functions above are translated to the following:

```js
$.get(url, data, callback, dataType);
$.post(url, data, callback, dataType);
$.getJSON(url, data, callback);
$.getScript(url, callback);
```

What's even more interesting is that the above facades are actually facades in their own right, hiding a great deal of complexity behind the scenes.

This is because the `jQuery.ajax()` implementation in jQuery coreis non-trivial to say at least At minimun it normalizes cross-browser differences between XHR and makes it trivial for us to perform HTTP actions (`get`, `post`, `put`,`patch`)

<br>

## Implementation

Let's imagine we're building an application that displays information about movies, TV shows music and books. For such of these we have a different vendor, they're implemented using various methods, have various requirements, etc. So, we have to remember and keep noted how to query each of them. Or do we?

Here's how the **Facade Pattern** solves such problem.

```js
class FetchMusic {
  get resources() {
    return [
      { id: 1, title: "The Fragile" },
      { id: 2, title: "Alladin Sane" },
      { id: 3, title: "OK Computer" },
    ];
  }

  fetch(id) {
    return this.resources.find((item) => item.id === id);
  }
}

class GetMovie {
  constructor(id) {
    return this.resources.find((item) => item.id === id);
  }

  get resources() {
    return [
      { id: 1, title: "Apocalypse Now" },
      { id: 2, title: "Die Hard" },
      { id: 3, title: "Big Lebowski" },
    ];
  }
}

const getTvShow = function (id) {
  const resources = [
    { id: 1, title: "Twin Peaks" },
    { id: 2, title: "Luther" },
    { id: 3, title: "The Simpsons" },
  ];

  return resources.find((item) => item.id === 1);
};

const booksResource = [
  { id: 1, title: "Ulysses" },
  { id: 2, title: "Ham on Rye" },
  { id: 3, title: "Quicksilver" },
];
```

They are named using different patterns, they are implemented better, worse, require more or less work. Let's start to design our **facade**.

### Design our facade

To create our facade, first we need to know every aspect of our vendor. If one of them would require additional authorization, more parameters, etc., this has to be implemented. This is an extra and can be discarted when working with a vendor that doesn't need it.

**The building block of a facade is a common interface**, no matter which resource we want to query, you should only use one method.
Of course, underneath it, there be more, but the public access should be **limited and easy to use**.

### Building our facade

First, we're ought to decide the shape of the public API. For this example, a single getter should be enough. The only distinction here is the media type – book, movie etc. So the type will be our foundation.

Next, the common things among resources. Every one is queryable by ID. So, our getter should accept one parameter, an ID.

```js
class CultureFacade {
  constructor(type) {
    this.type = type;
  }

  get(id) {
    return id;
  }
}
```

For starters, we define the type in the constructor. This means, that each of the facade instance will return different one.

Great, so the next thing is to define our public and private methods. For noting the "private" ones, We will use the "#" to define private methods.

As we said earlier, the only public method should be our getter. Alright, let's move to the actual _meat_ of our class – private getters.

First off, we need to identify how each resource is queried:

- Music requires a new instance and then passing and ID within the method `get`;
- Movie's each instance returns the data, requires ID during initialization;
- TV Show is just a single function that accepts an ID and returns the data;
- Books are just a resource, we need to query it ourselves.

Okay, music, go.

```js
class CultureFacade {
  ...

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
    return booksResource.find(item => item.id === id);
  }
}
```

There, now we have all the methods to query our databases.

### Getting the public API

One important thing to always take care of is to never rely on your vendor. You never know what might happen. They might get attacked, shut down, your company may stop paying for the service etc.

Knowing this, our getter should be also using a kind of facade. It should try to fetch the data, not assuming that it'll succeed.

```js
class CultureFacade {
  ...

  get _error() {
    return { status: 404, error: `No item with this id found` };
  }

  _tryToReturn(func, id) {
    const result = func.call(this, id);

    return new Promise((ok, err) => !!result
      ? ok(result)
      : err(this._error));
  }
}
```

Let's stop here for a minute. As you can see, this method is also private. Why? Public doesn't benefit from it. It require the knowledge of other private methods. Next, it requires two parameters – `func` and `id`. While the latter is quite obvious, the former is not. Okay, so this will accept a function (or rather our `class`' method) to run. As you can see, the execution is being assigned to `result` variable. Next, we're checking whether it succeed and we're returning a `Promise`. Why such baroque construct? `Promises` are very easy to debug and execute, with the `async/await` or even plain `then/catch` syntax.

Okay, so what we have now? The private methods for querying vendors. Our inner facade to try to query. And our public getter skeleton. Let's expand it into a living being.

```js
// ...
import { MEDIA_TYPES } from "./constants.js";

class CultureFacade {
  constructor(type) {
    this.type = type;
  }

  ...

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
```

### Usage

So, it seems that we're done here. Let's take it for a spin!

```js
// ...
import { MEDIA_TYPES } from "./constants.js";

const music = new CultureFacade(MEDIA_TYPES.MUSIC);
music
  .get(3)
  .then((data) => console.log(data))
  .catch((e) => console.error(e));

const movies = new CultureFacade(MEDIA_TYPES.MOVIE);
movie
  .get(5)
  .then((data) => console.log(data))
  .catch((e) => console.log(e));
```

Awesome! the facade pattern, as you can see, can be very powerful when used properly. It can be really beneficial when you have multiple similar sources, similar operations etc., and want to unify the usage.

<br>

## Tradeoffs

- **Reusability**: This is a common interface that have the same methods no matter what it used underneath.
- **Easy to use**: Reduces complexity of sub-systems.
- **Separation of concerns (SoC)**: Aids principle of loose coupling to build our facade. But, this approach is coupled to an additional level of indirection.
- **Building complexity**: Complex implementation (especially with existing code).

<br>

## References

- [Learning JavaScript Design Patterns | Facade Pattern](https://www.patterns.dev/posts/classic-design-patterns/#facadepatternjavascript)
- [DEV Community | Facade pattern in JavaScript](https://dev.to/tomekbuszewski/facade-pattern-in-javascript-3on4)
