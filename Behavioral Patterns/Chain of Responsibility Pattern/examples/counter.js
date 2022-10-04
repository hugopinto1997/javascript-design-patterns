class Counter {
  constructor(initValue = 0) {
    this.currentValue = initValue;
  }

  add(value) {
    this.currentValue += value;
    return this;
  }
}

const counter = new Counter();
counter.add(20).add(40).add(40);

console.log(counter.currentValue);
