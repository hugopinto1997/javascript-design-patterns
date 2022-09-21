// 1. Creating the `Counter` class, which contains a `constructor`, `reset`, `getCount`, `increment` and `decrement` method.
// Within the constructor, we check to make sure the class hasn't already been instantiated.
class SingletonCounter {
  constructor(counter) {
    if (SingletonCounter.instance) {
      return SingletonCounter.instance;
    }
    this.counter = counter;
    SingletonCounter.instance = this;
  }

  getCount() {
    return this.counter;
  }

  increment() {
    return ++this.counter;
  }

  decrement() {
    return --this.counter;
  }

  reset() {
    this.counter = 0;
    return this.counter;
  }
}

// Exporting the variable as the `default` value within the file to make it globally accessible.
export default SingletonCounter;
