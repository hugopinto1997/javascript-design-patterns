// 1. Creating the `Counter` class, which contains a `constructor`, `reset`, `getCount`, `increment` and `decrement` method.
class Counter {
  constructor(counter) {
    this.counter = counter;
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
export default Counter;
