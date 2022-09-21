import SingletonCounter from "./singleton-counter.js";
import Counter from "./regular-counter.js";

const singletonCounter = new SingletonCounter(0);
const regularCounter = new Counter(0);

// Singleton State
const singletonSpan = document.querySelector("#singleton");
const nonSingletonSpan = document.querySelector("#non-singleton");

// Buttons
const incrementBtn = document.querySelector("#increment");
const decrementBtn = document.querySelector("#decrement");
const resetBtn = document.querySelector("#resetBtn");

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
