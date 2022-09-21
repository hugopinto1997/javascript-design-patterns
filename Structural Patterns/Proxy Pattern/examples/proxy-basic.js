const person = {
  name: "John Doe",
  age: 54,
  email: "john@doe.com",
  country: "United States",
};

// Creating the Proxy object
const personProxy = new Proxy(person, {
  get: (target, prop) => {
    console.log(`The value of ${prop} is ${target[prop]}`);
    return target[prop];
  },
  set: (target, prop, value) => {
    console.log(`Changed ${prop} from ${target[prop]} to ${value}`);
    target[prop] = value;
    return true;
  },
});

// Triggering get and set methods
personProxy.age;
personProxy.country = "El Salvador";
