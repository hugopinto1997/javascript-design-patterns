import { ConcreteObserver, ConcreteSubject } from "./observer.js";

window.addEventListener("DOMContentLoaded", () => {
  // References to our DOM elements
  const addBtn = document.getElementById("addNewObserver");
  const container = document.getElementById("observersContainer");
  const controlCheckbox = new ConcreteSubject(
    document.getElementById("mainCheckbox")
  );

  const addNewObserver = () => {
    // Create a new checkbox to be added
    const check = document.createElement("input");
    check.type = "checkbox";
    const checkObserver = new ConcreteObserver(check);

    // Add the new observer to our list of observers
    // for our main subject
    controlCheckbox.subscribe(checkObserver);

    // Append the item to the container
    container.appendChild(check);
  };

  addBtn.onclick = addNewObserver;
});
