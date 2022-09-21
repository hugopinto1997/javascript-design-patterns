// We use regular functions instead of arrow functions
// This is because we need new instances along new objects created from this one
const obj = {
  counter: 0,
  getCount: function () {
    return this.counter;
  },
  increment: function () {
    return ++this.counter;
  },
  decrement: function () {
    return --this.counter;
  },
  reset: function () {
    console.log(this);
    this.counter = 0;
    return this.counter;
  },
};

export default obj;
