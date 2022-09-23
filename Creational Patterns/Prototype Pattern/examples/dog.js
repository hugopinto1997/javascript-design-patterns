class Dog {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  bark() {
    console.log("Woof!");
  }

  wagTail() {
    console.log("Wagging tail!");
  }
}

const dog1 = new Dog("Clifford", 2);

dog1.bark();

console.log("Comparing Prototypes: ", Dog.prototype === dog1.__proto__);
