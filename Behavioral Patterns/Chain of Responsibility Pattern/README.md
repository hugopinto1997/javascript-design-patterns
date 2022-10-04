# Chain of Responsibility Pattern

**Pattern Type**: Behavioral.

Provides a chain of loosely coupled objects one of which can satisfy a request. This pattern is essentially a linear search for an object that can handle a particular request.

<br>

## Overview

**Chain of Responsibility** Pattern is a Design pattern that forms sequentially connected components and consumers can simply pass the object to the first component. Then that particular object gets processed by each component according to the constructed sequence.

In simple terms, this pattern lets the application pass requests along a chain of handlers. Each handler can decide either to process the request or to pass it to the next handler in the constructed sequence. This pattern is mainly used to introduce loose coupling to the application. It basically decouples the sender and receiver of a particular request based on the type.

### Participants

The objects participating in this pattern are:

- **Handler** — Determines the interface where the requests are handled. It also handles the requests that are linked together in the chain.
- **Client** — Initiates the request to a handler in the chain.

<br>

## Implementation

There isn’t really an “official” or correct way to implement this pattern. As long as the functions can chain one after another in a controllable and predictable way, you’re in good shape. Generally, though, there are two main roles that define it:

- **Handler** — In example code: `Counter.add()` and `Counter.remove()` methods
  defines an interface for handling the requests
  implements the successor link (returning '`this`').
- **Client** — In example code: `Counter`
  initiates the request to a chain of handler objects.

```js
class Counter {
  constructor(intialValue = 0) {
    this.counterValue = intialValue;
  }

  add(value) {
    this.counterValue += value;
    return this;
  }
}
```

The chain occurs when the add function returns this:

```js
const counter = new Counter();
console.log(counter.add(10).add(2).add(50).counterValue); // 62
```

This means it can be re-invoked as much as we want since the instance is returned again at the end of the call (because the `add` method is returning `this`)

What happens inside the `add` method can literally be anything, and it doesn't have to depend on anything that is outside of its function scope.

<br>

## Tradeoffs

- **Control flow**: Possibility to control the order of request handling.
- **Code applicability**: Introduce new handlers into the application without breaking the existing code.
- **Decoupling**: Decoupling of classes (Operations) invoking and performing.
- **Requests risk**: Possibility of having unhandled requests.
- **End user manipulation risk**: Possibility of the end-user to manipulate the application.

  <br>

## References

- [Dofactory | Chain of Responsibility Pattern](https://www.dofactory.com/javascript/design-patterns/chain-of-responsibility#:~:text=The%20Chain%20of%20Responsibility%20pattern,can%20handle%20a%20particular%20request.)
- [Medium | Chain of Responsibility Design Pattern](https://medium.com/nerd-for-tech/chain-of-responsibility-design-pattern-4efe8de4910d)
- [Better Programming | Chain of Responsibility Pattern](https://betterprogramming.pub/chain-of-responsibility-in-javascript-21942601ed9c)
