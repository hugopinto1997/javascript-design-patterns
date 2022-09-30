# Flyweight Pattern

**Pattern Type**: Structural.

Reuse existing instances when working with identical objects.

The flyweight pattern is a useful way to conserve memory when we're creating a large number of similar objects.

## Overview

The Flyweight Pattern is a classical structural solution for optimizing code that is repetitive, slow, and inefficiently shares data. It aims to minimize the use of memory in an application by sharing as much data as possible with related objects (e.g application configuration, state, and so on).

In practice, Flyweight data sharing can involve taking several similar objects or data constructs used by a number of objects and placing this data into a single external object. We can pass through this object to those depending on this data, rather than storing identical data across each one.

### Flyweight types

There are two ways in which the Flyweight pattern can be applied. The first is at the data-layer, where we deal with the concept of sharing data between large quantities of similar objects stored in memory.

The second is at the DOM-layer where the Flyweight can be used as a central event-manager to avoid attaching event handlers to every child element in a parent container we wish to have some similar behavior.

### Flyweight and sharing data

For this application, there are a few more concepts around the classical Flyweight pattern that we need to be aware of. In the Flyweight pattern, there's a concept of two states - intrinsic and extrinsic. Intrinsic information may be required by internal methods in our objects which they absolutely cannot function without. Extrinsic information can however be removed and stored externally.

Objects with the same intrinsic data can be replaced with a single shared object, created by a factory method. This allows us to reduce the overall quantity of implicit data being stored quite significantly.

The benefit of this is that we're able to keep an eye on objects that have already been instantiated so that new copies are only ever created should the intrinsic state differ from the object we already have.

<br>

## Implementation

As the Flyweight Pattern hasn't been heavily used in JavaScript in recent years, many of the implementations we might use for inspiration come from the Java and C++ worlds.

### Implementing Classical Flyweights

Key concepts that will be used along this implementation:

- **Flyweight** corresponds to an interface through which flyweights can receive and act on extrinsic states.
- **Concrete Flyweight** actually implements the Flyweight interface and stores the intrinsic state. Concrete Flyweights need to be sharable and capable of manipulating the extrinsic state.
- **Flyweight Factory** manages flyweight objects and creates them too. It makes sure that our flyweights are shared and manages them as a group of objects which can be queried if we require individual instances. If an object has been already created in the group it returns it, otherwise, it adds a new object to the pool and returns it.

These correspond to the following definitions:

- CoffeeOrder: **Flyweight**
- CoffeeFlavor: **Concrete Flyweight**
- CoffeeOrderContext: **Helper**
- CoffeeFlavorFactory: **Flyweight Factory**
  testFlyweight: **Utilization of our Flyweights**

#### Duck Puncing

Duck punching allows us to extend the capabilities of a language or solution without necessarily needing to modify the runtime source. As this next solution requires the use of a Java keyword (`implements`) for implementing interfaces and isn't found in JavaScript natively, let's first duck punch it.

```js
/* Function.prototype.implementsFor works on an object constructor and will accept a parent class (function) or object and either inherit from this using normal inheritance (for functions) or virtual inheritance (for objects). */

// Simulate pure virtual inheritance/"implement" keyword for JS
Function.prototype.implementsFor = function (parentClassOrObject) {
  if (parentClassOrObject.constructor === Function) {
    // Normal Inheritance
    this.prototype = new parentClassOrObject();
    this.prototype.constructor = this;
    this.prototype.parent = parentClassOrObject.prototype;
  } else {
    // Pure Virtual Inheritance
    this.prototype = parentClassOrObject;
    this.prototype.constructor = this;
    this.prototype.parent = parentClassOrObject;
  }
  return this;
};
```

We can use this to patch the lack of an implements keyword by having a function inherit an interface explicitly. Below, `CoffeeFlavor` implements the `CoffeeOrder` interface and must contain its interface methods for us to assign the functionality powering these implementations to an object.

```js
// ES2015+ syntax/keywords used: const, let, arrow functions,
// template literals for string interpolation, parantheses optional for one parameter

// Flyweight object
const CoffeeOrder = {
  // Interfaces
  serveCoffee(context) {},
  getFlavor() {},
};

// ConcreteFlyweight object that creates ConcreteFlyweight
// Implements CoffeeOrder
function CoffeeFlavor(newFlavor) {
  const flavor = newFlavor;

  // If an interface has been defined for a feature
  // implement the feature
  if (typeof this.getFlavor === "function") {
    this.getFlavor = () => flavor;
  }

  if (typeof this.serveCoffee === "function") {
    this.serveCoffee = (context) => {
      console.log(
        `Serving Coffee flavor ${flavor} to table number ${context.getTable()}`
      );
    };
  }
}

// Implement interface for CoffeeOrder
CoffeeFlavor.implementsFor(CoffeeOrder);

// Handle table numbers for a coffee order
const CoffeeOrderContext = (tableNumber) => ({
  getTable() {
    return tableNumber;
  },
});

const CoffeeFlavorFactory = () => {
  const flavors = {};
  let length = 0;

  return {
    getCoffeeFlavor(flavorName) {
      let flavor = flavors[flavorName];
      if (typeof flavor === "undefined") {
        flavor = new CoffeeFlavor(flavorName);
        flavors[flavorName] = flavor;
        length++;
      }
      return flavor;
    },

    getTotalCoffeeFlavorsMade() {
      return length;
    },
  };
};

// Sample usage:
// testFlyweight()

const testFlyweight = () => {
  // The flavors ordered.
  const flavors = [];

  // The tables for the orders.
  const tables = [];

  // Number of orders made
  let ordersMade = 0;

  // The CoffeeFlavorFactory instance
  const flavorFactory = new CoffeeFlavorFactory();

  function takeOrders(flavorIn, table) {
    flavors.push(flavorFactory.getCoffeeFlavor(flavorIn));
    tables.push(new CoffeeOrderContext(table));
    ordersMade++;
  }

  takeOrders("Cappuccino", 2);
  takeOrders("Cappuccino", 2);
  takeOrders("Frappe", 1);
  takeOrders("Frappe", 1);
  takeOrders("Xpresso", 1);
  takeOrders("Frappe", 897);
  takeOrders("Cappuccino", 97);
  takeOrders("Cappuccino", 97);
  takeOrders("Frappe", 3);
  takeOrders("Xpresso", 3);
  takeOrders("Cappuccino", 3);
  takeOrders("Xpresso", 96);
  takeOrders("Frappe", 552);
  takeOrders("Cappuccino", 121);
  takeOrders("Xpresso", 121);

  for (let i = 0; i < ordersMade; ++i) {
    flavors[i].serveCoffee(tables[i]);
  }
  console.log(" ");
  console.log(
    `total CoffeeFlavor objects made: ${flavorFactory.getTotalCoffeeFlavorsMade()}`
  );
};
```

### A Simpler Flyweight - Books Flyweight

In our application, we want users to be able to add books. All books have a `title`, an `author`, and an `isbn` number! However, a library usually doesn't have just one copy of a book: it usually has multiple copies of the same book.

It wouldn't be very useful to create a new book instance each time if there are multiple copies of the exact same book. Instead, we want to create multiple instances of the `Book` constructor, that represent a single book.

```js
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
```

Let's create the functionality to add new books to the list. If a book has the same ISBN number, thus is the exact same book type, we don't want to create an entirely new `Book` instance. Instead, we should first check whether this book already exists.

Let's create the functionality to add new books to the list. If a book has the same ISBN number, thus is the exact same book type, we don't want to create an entirely new `Book` instance. Instead, we should first check whether this book already exists.

```js
const books = new Map();

const createBook = (title, author, isbn) => {
  const existingBook = books.has(isbn);

  if (existingBook) {
    return books.get(isbn);
  }

  const book = new Book(title, author, isbn);
  books.set(isbn, book);

  return book;
};
```

The `createBook` function helps us create new instances of one type of book. However, a library usually contains multiple copies of the same book! Let's create an `addBook` function, which allows us to add multiple copies of the same book. It should invoke the createBook function, which returns either a newly created Book instance, or returns the already existing instance.

In order to keep track of the total amount of copies, let's create a bookList array that contains the total amount of books in the library.

```js
const bookList = [];

const addBook = (title, author, isbn, availability, sales) => {
  const book = {
    ...createBook(title, author, isbn),
    sales,
    availability,
    isbn,
  };

  bookList.push(book);
  return book;
};

// Let's create 5 copies of 3 books: Harry Potter, To Kill a Mockingbird, and The Great Gatsby.
addBook("Harry Potter", "JK Rowling", "AB123", false, 100);
addBook("Harry Potter", "JK Rowling", "AB123", true, 50);
addBook("To Kill a Mockingbird", "Harper Lee", "CD345", true, 10);
addBook("To Kill a Mockingbird", "Harper Lee", "CD345", false, 20);
addBook("The Great Gatsby", "F. Scott Fitzgerald", "EF567", false, 20);
```

Although there are 5 copies, we only have 3 Book instances!

<br>

## Tradeoffs

- **Performance**: The Flyweight Pattern contributes to improving the performance of the application by reducing the number of objects.
- **Memory optimization**: The Flyweight Pattern reduces the memory footprint and saving RAM as the common properties are shared between objects using Intrinsic properties.
- **Only for low memory**: If memory is not a concern, implementing Flyweight design can be overkill for the application.
- **Complexity**: The pattern introduces code complexity.

<br>

## References

- [Learning JavaScript Design Patterns | Flyweight Pattern](https://www.patterns.dev/posts/classic-design-patterns/#detailflyweight)
- [Patterns.dev | Flyweight Pattern](https://www.patterns.dev/posts/flyweight-pattern/)
