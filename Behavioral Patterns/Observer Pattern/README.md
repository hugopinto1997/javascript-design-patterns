# Observer Pattern

**Pattern Type**: Behavioral.

Use observables to notify subscribers when an event occurs.

<br>

## Overview

With the `Observer` pattern we have key concepts like:

- An **observable object**, which can be observed by **subscribers** in order to notify them.
- **Subscribers**, which can subscribe to and get notified by the observable object.

The `Observer` Pattern, allows one object to be notified when another object changes, without requiring the object to have knowledge of its dependents. Often this is a pattern where an object (known as a subject) maintains a list of objects depending on it (observers), automatically notifying them of any changes to its state. In modern frameworks, the observer pattern is used to notify components of changes in state.

Detailed `Observer` concepts:

- Subject: maintains a list of observers, facilitates adding or removing observers
- Observer: provides an update interface for objects that need to be notified of a Subject's changes of state.
- ConcreteSubject: broadcasts notifications to observers on changes of state, stores the state of ConcreteObservers.
- ConcreteObserver: stores a reference to the ConcreteSubject, implements an update interface for the Observer to ensure state is consistent with the Subject's.

### Observer vs Pub/Sub

The first difference between the Observer and Publish/Subscribe Pattern is that the Observer is a one-to-one relationship, whereas the Publish/Subscribe Pattern is a one-to-many relationship. In the Observer Pattern, one Observer is subscribed to one Subject. In the Publish/Subscribe Pattern, one Subject can be subscribed to many Observers.

The Observer pattern requires that the observer (or object) wishing to receive topic notifications must subscribe this interest to the object firing the event (the subject).

The Publish/Subscribe pattern however uses a topic/event channel which sits between the objects wishing to receive notifications (subscribers) and the object firing the event (the publisher). This event system allows code to define application specific events which can pass custom arguments containing values needed by the subscriber. The idea here is to avoid dependencies between the subscriber and publisher.

This differs from the Observer pattern as it allows any subscriber implementing an appropriate event handler to register for and receive topic notifications broadcast by the publisher.

<br>

## Implementation

We can export a singleton Observer object, which contain a `notify`, `subscribe` and `unsubscribe` method.

```js
const observers = [];

export default Object.freeze({
  notify: (data) => observers.forEach((observer) => observer(data)),
  subscribe: (func) => observers.push(func),
  unsubscribe: (func) => {
    [...observers].forEach((observer, index) => {
      if (observer === func) {
        observers.splice(index, 1);
      }
    });
  },
});
```

We can use this observable throughout the entire application, making it possible to subscribe functions to the observable.

```js
import Observable from "./observable"****;

function logger(data) {
  console.log(`${Date.now()} ${data}`);
}

Observable.subscribe(logger);
```

and notify all subscribers based on certain events.

```js
import Observable from "./observable";

document.getElementById("my-button").addEventListener("click", () => {
  Observable.notify("Clicked!"); // Notifies all subscribed observers
});
```

<br>

## Tradeoffs

- **Separation of Concerns**: The observer objects aren't tightly coupled to the observable object, and can be (de)coupled at any time. The observable object is responsible for monitoring the events, while the observers simply handle the received data.
- **Decreased performance**: Notifying all subscribers might take a significant amount of time if the observer handling becomes too complex, or if there are too many subscibers to notify.

<br>

## References

- [Learning JavaScript Design Patterns | Observer Pattern](https://www.patterns.dev/posts/classic-design-patterns/#observerpatternjavascript)
- [Patterns.dev | Observer Pattern](https://www.patterns.dev/posts/observer-pattern/)
- [FrontendMasters Design Patterns Workshop | Observer Pattern](https://javascriptpatterns.vercel.app/patterns/design-patterns/observer-pattern)
