# Command Pattern

**Pattern Type**: Behavioral.

Decouple methods that execute tasks by sending commands to a commander

## Overview

With the **Command Pattern**, we can decouple objects that execute a certain task from the object that calls the method. It aims to encapsulate method invocation, requests, or operations into a single object and gives us the ability to both parameterize and pass method calls around that can be executed at our discretion.

In addition, it enables us to decouple objects invoking the action from the objects which implement them, giving us a greater degree of overall flexibility in swapping out concrete classes (objects). Concrete classes are best explained in terms of class-based programming languages and are related to the idea of abstract classes.

An abstract class defines an interface but doesn't necessarily provide implementations for all of its member functions. It acts as a base class from which others are derived. A derived class that implements the missing functionality is called a concrete class. Base classes and concrete classes can be implemented in JavaScript (ES2015+/ES6) using the `extends` keyword applicable to the JavaScript classes.

The general idea behind the Command pattern is that it provides us a means to separate the responsibilities of issuing commands from anything executing commands, delegating this responsibility to different objects instead. Implementation-wise, simple command objects bind together both an action and the object wishing to invoke the action.

<br>

## Implementation

Let's say we have an online food delivery platform. Users can place, track, and cancel orders.

```js
class OrderManager() {
  constructor() {
    this.orders = []
  }

  placeOrder(order, id) {
    this.orders.push(id)
    return `You have successfully ordered ${order} (${id})`;
  }

  trackOrder(id) {
    return `Your order ${id} will arrive in 20 minutes.`
  }

  cancelOrder(id) {
    this.orders = this.orders.filter(order => order.id !== id)
    return `You have canceled your order ${id}`
  }
}

const manager = new OrderManager();

manager.placeOrder("Pad Thai", "1234");
manager.trackOrder("1234");
manager.cancelOrder("1234");

```

However, there are downsides to invoking the methods directly on the manager instance. It could happen that we decide to rename certain methods later on, or the functionality of the methods change.

Say that instead of calling it `placeOrder`, we now rename it to `addOrder`! This would mean that we would have to make sure that we don't call the placeOrder method anywhere in our codebase, which could be very tricky in larger applications.

Instead, we want to decouple the methods from the manager object, and create separate command functions for each command!

Let's refactor the OrderManager class: instead of having the placeOrder, cancelOrder and trackOrder methods, it will have one single method: execute. This method will execute any command it's given.

Each command should have access to the `orders` of the manager, which we'll pass as its first argument.

```js
class OrderManager {
  constructor() {
    this.orders = [];
  }

  execute(command, ...args) {
    return command.execute(this.orders, ...args);
  }
}
```

We need to create three `Commands` for the order manager:

- `PlaceOrderCommand`
- `CancelOrderCommand`
- `TrackOrderCommand`

```js
class Command {
  constructor(execute) {
    this.execute = execute;
  }
}

function PlaceOrderCommand(order, id) {
  return new Command((orders) => {
    orders.push(id);
    return `You have successfully ordered ${order} (${id})`;
  });
}

function CancelOrderCommand(id) {
  return new Command((orders) => {
    orders = orders.filter((order) => order.id !== id);
    return `You have canceled your order ${id}`;
  });
}

function TrackOrderCommand(id) {
  return new Command(() => `Your order ${id} will arrive in 20 minutes.`);
}
```

Perfect! Instead of having the methods directly coupled to the `OrderManager` instance, they're now separate, decoupled functions that we can invoke through the `execute` method that's available on the `OrderManager`.

```js
const manager = new OrderManager();

manager.execute(new PlaceOrderCommand("Pad Thai", "1234"));
manager.execute(new TrackOrderCommand("1234"));
manager.execute(new CancelOrderCommand("1234"));
```

<br>

## Tradeoffs

- **Decoupling methods**: The command pattern allows us to decouple methods from the object that executes the operation.
- **Events flow**: It gives you more control if you're dealing with commands that have a certain lifespan, or commands that should be queued and executed at specific times.
- **Complexity and too much boilerplate**: The use cases for the command pattern are quite limited, and often adds unnecessary boilerplate to an application.

<br>

## References

- [Learning JavaScript Design Patterns | Command Pattern](https://www.patterns.dev/posts/classic-design-patterns/#commandpatternjavascript)
- [Patterns.dev | Command Pattern](https://www.patterns.dev/posts/command-pattern/)
