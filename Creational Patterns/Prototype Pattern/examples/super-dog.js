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

class SuperDog extends Dog {
  constructor(name, age) {
    super(name, age);
  }

  fly() {
    console.log("Flying!");
  }
}

const superDog1 = new SuperDog("Bolt");

superDog1.bark();
superDog1.fly();

console.log(
  "Comparing Prototypes: ",
  SuperDog.prototype === superDog1.__proto__
);

console.log(
  "Comparing Super Prototypes: ",
  SuperDog.prototype.prototype === superDog1.__proto__.prototype
);
