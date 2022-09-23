# Prototype Pattern

**Pattern Type**: Creational.

The **prototype pattern** is a useful way to share properties among many objects of the same type. The prototype is an object that's native to JavaScript, and can be accessed by objects through the prototype chain.

<br>

## Overview

In our applications, we often have to create many objects of the same type. A very useful way of doing this is by creating multiple instances of an `class`. But prior to continue with that let's explore a simpler solution.

Say that we have the following code:

```js
const createDog = (name, age) => ({
  name,
  age,
  bark() {
    console.log(`${name} is barking!`);
  },
  wagTail() {
    console.log(`${name} is wagging their tail!`);
  },
});

const dog1 = createDog("Max", 4);
const dog2 = createDog("Sam", 2);
const dog3 = createDog("Joy", 6);
const dog4 = createDog("Spot", 8);
```

This way we can easily create many dog objects, however we're unnecesarily coding a new `bark` and `wagTail` methods each time we create a dog object, because we're creating 2 new functions each time we create a dog object, which **uses memory**.

Now that we understand the problem above, let's continue now by creating our `Dog` class.

```js
class Dog {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  bark() {
    return "Woof!";
  }

  wagTail() {
    return "Wagging tail!";
  }
}

const dog1 = new Dog("Clifford", 2);
const dog2 = new Dog("Max", 6);
const dog3 = new Dog("Spot", 3);
```

Notice here how the `constructor` contains a name property, and the class itself contains `bark` and `wagTail` methods. When using ES6 classes all properties that are defined on the class itself (`bark` and `wagTail` in this case) are automatically assigned to the `prototype`.

We can access the prototype through the `prototype` property on the constructor or through the `__proto__` property of an _instance_.

```js
console.log(Dog.prototype);
// constructor: ƒ Dog(name, age) bark: ƒ bark() wagTail: ƒ wagTail()

console.log(dog1.__proto__);
// constructor: ƒ Dog(name, age) bark: ƒ bark() wagTail: ƒ wagTail()
```

The value of **proto** on any instance of the constructor, is a direct reference to the constructor's prototype! Whenever we try to access a property on an object that doesn't exist on the object directly, JavaScript will go down the prototype chain to see if the property is available within the prototype chain.

The term **prototype chain** indicates that there could be more than one step. Indeed! So far, we've only seen how we can access properties that are directly available on the first object that **proto** has a reference to. However, prototypes themselves also have a **proto** object!

### Difference between `prototype` and `__proto__`

`prototype` is a property of a _Function object_. It is the prototype of objects constructed by that function.

`__proto__` is an internal property of an _object_, pointing to its `prototype`. Current standards provide an equivalent `Object.getPrototypeOf(obj)` method, though the de facto standard **proto** is quicker.

<br>

## Implementation

ES6 classes allow us to easily share properties among many instances, `bark` and `wagTail` in this case.

```js
class Dog {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  bark() {
    return "Woof!";
  }

  wagTail() {
    return "Wagging tail!";
  }
}
```

Let's create another type of dog, a super dog! This dog should inherit everything from a normal Dog, but it should also be able to fly. We can create a super dog by extending the Dog class and adding a `fly` method.

```js
class SuperDog extends Dog {
  constructor(name, age) {
    super(name, age);
  }

  fly() {
    return "Flying!";
  }
}
```

Let's create a flying dog called `Daisy`, and let her bark and fly!.

```js
const dog1 = new SuperDog("Daisy");
dog1.bark();
dog1.fly();
```

We have access to the `bark` method, as we extended the `Dog` class. The value of `__proto__` on the prototype of `SuperDog` points to the `Dog.prototype` object!

It gets clear why it's called a prototype chain: when we try to access a property that's not directly available on the object, JavaScript recursively walks down all the objects that **proto** points to, until it finds the property!

<br>

## Tradeoffs

- **Memory efficient**: The prototype chain allows us to access properties that aren't directly defined on the object itself, we can avoid duplication of methods and properties, thus reducing the amount of memory used.
- **Readaibility**: When a class has been extended many times, it can be difficult to know where certain properties come from.
