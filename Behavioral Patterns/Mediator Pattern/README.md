# Mediator Pattern

**Pattern Type**: Behavioral.

Use a central mediator object to handle communication between components. This Allows one object to notify a set of other objects when an event occurs.

<br>

## Overview

The mediator pattern makes it possible for components to interact with each other through a central point: the mediator. Instead of directly talking to each other, the mediator receives the requests, and sends them forward! In JavaScript, the mediator is often nothing more than an object literal or a function.

Instead of letting every objects talk directly to the other objects, resulting in a many-to-many relationship, the object's requests get handled by the mediator. The mediator processes this request, and sends it forward to where it needs to be.

The Mediator promotes **loose coupling** by ensuring that instead of components referring to each other explicitly, their interaction is handled through this central point. This can help us decouple systems and improve the potential for component reusability.

### Mediator vs Observer

The difference between Mediator and Observer is that the Mediator pattern allows one object to be notified of events that occur in other objects, while the Observer allows one object to subscribe to multiple evetns that occur in other objects.

A Mediator example would be DOM event bubbling and event delegation. If all subscriptions in a system are made against the document rather than individual nodes, the document effectively serves as a Mediator.

<br>

## Implementation

A good use case for the mediator pattern is a chatroom! The users within the chatroom won't talk to each other directly. Instead, the chatroom serves as the mediator between the users.

```js
class ChatRoom {
  logMessage(user, message) {
    const time = new Date();
    const sender = user.getName();

    console.log(`${time} [${sender}]: ${message}`);
  }
}

class User {
  constructor(name, chatroom) {
    this.name = name;
    this.chatroom = chatroom;
  }

  getName() {
    return this.name;
  }

  send(message) {
    this.chatroom.logMessage(this, message);
  }
}
```

We can create new users that are connected to the chat room. Each `user` instance has a `send` method which we can use in order to send messages.

```js
const chatroom = new ChatRoom();

const user1 = new User("John Doe", chatroom);
const user2 = new User("Jane Doe", chatroom);

user1.send("Hi there!");
user2.send("Hey!");
```

<br>

## Tradeoffs

- **Improves Communication**: It reduces the communication channels needed between objects or components in a system from many to many to just many to one.
- **Single Point of Failure**: It can introduce a single point of failure. Placing a Mediator between modules can also cause a performance hit as they are always communicating indirectly. Because of the nature of loose coupling, it's difficult to establish how a system might react by only looking at the broadcasts.
