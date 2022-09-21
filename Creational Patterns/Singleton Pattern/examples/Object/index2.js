import SingletonCounter from "./singletonCounter.js";
import Counter from "./regularCounter.js";

const singletonCounter = SingletonCounter;
const regularCounter = Object.create(Counter);

// Singleton State
const singletonSpan = document.querySelector("#singleton2");
const nonSingletonSpan = document.querySelector("#non-singleton2");

// Buttons
const incrementBtn = document.querySelector("#increment2");
const decrementBtn = document.querySelector("#decrement2");
const resetBtn = document.querySelector("#resetBtn2");

const handleCounterChange = () => {
  const event = new Event("updateUI");
  document.dispatchEvent(event);
};

const updateCounters = () => {
  singletonSpan.innerHTML = `${singletonCounter.getCount()}`;
  nonSingletonSpan.innerHTML = `${regularCounter.getCount()}`;
};

incrementBtn.addEventListener("click", () => {
  singletonCounter.increment();
  regularCounter.increment();
  handleCounterChange();
});

decrementBtn.addEventListener("click", () => {
  singletonCounter.decrement();
  regularCounter.decrement();
  handleCounterChange();
});

resetBtn.addEventListener("click", () => {
  singletonCounter.reset();
  regularCounter.reset();
  handleCounterChange();
});

document.addEventListener("updateUI", updateCounters);
document.addEventListener("DOMContentLoaded", updateCounters);
