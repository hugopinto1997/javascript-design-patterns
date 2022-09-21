let counter = 0;

// Freeze the object using the `Object.freeze` method, to ensure the object is not modifiable.
export default Object.freeze({
  getCount: () => counter,
  increment: () => ++counter,
  decrement: () => --counter,
  reset: () => {
    counter = 0;
    return counter;
  },
});
