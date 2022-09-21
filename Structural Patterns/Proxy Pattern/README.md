# Proxy Pattern

**Pattern Type**: Structural.

Intercept and control interactions to target objects. The **Proxy Pattern** uses a Proxy intercept and control interactions to target objects.

With a Proxy object, we get more control over the interactions with certain objects. A proxy object can determine the behavior whenever we're interacting with the object, for example when we're getting a value, or setting a value.

Generally speaking, a proxy means a stand-in for someone else. Instead of speaking to that person directly, you'll speak to the proxy person who will represent the person you were trying to reach. The same happens in JavaScript: instead of interacting with the target object directly, we'll interact with the Proxy object.

Let's say that we have a `person` object.

```js
const person = {
  name: "John Doe",
  age: 54,
  email: "john@doe.com",
  country: "United States",
};
```

And modify property values like, `person.age += 1`

```js
const person = {
  name: "John Doe",
  age: 55,
  email: "john@doe.com",
  country: "United States",
};
```

The difference here is that with the **Proxy Pattern** we don't want to interact with the object directly. Instead, a Proxy object intercepts the request and (optionally) forwards to the target object - the `person` object in this case.

<br>

## Implementation

In JavaScript, we can easily create a new Proxy by using the built-in `Proxy` object.

```js
// Type: Proxy(object, object)
new Proxy(object, {
    get: (target, property) => {...},
    set: (target, property, value) => {...},
})
```

The `Proxy` object receives 2 arguments, the first one is the target object,and the second argument of `Proxy` is an object that represents the handler. In the handler object, we can define specific behavior based on the type of interaction. Although there are many methods that you can add to the Proxy handler, the two most common ones are get and set:

The `get` method on the handler object gets invoked when we want to access a property, and the `set` method gets invoked when we want to modify a property.

**`get` and `set` method arguments:**

- `target`: refer to the target object.
- `property`: refers to the specific property to set or get.
- `value`: refers to the value of the new property to set.

### Reflect

JavaScript provides a built-in object called Reflect, which makes it easier for us to manipulate the target object when working with proxies.

Previously, we tried to modify and access properties on the target object within the proxy through directly getting or setting the values with bracket notation. Instead, we can use the Reflect object. The methods on the Reflect object have the same name as the methods on the handler object.

Instead of accessing properties through obj[prop] or setting properties through obj[prop] = value, we can access or modify properties on the target object through Reflect.get() and Reflect.set(). The methods receive the same arguments as the methods on the handler object.

```js
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    Reflect.set(obj, prop, value);
  },
});
```

Perfect! We can access and modify the properties on the target object easily with the Reflect object.

<br>

## Tradeoffs

- **Control**: Proxies make it easy to add functionality when interacting with a certain object, such as validation, logging, formatting, notifications, debugging.
- **Long handler execution**: Executing handlers on every object interaction could lead to performance issues.
