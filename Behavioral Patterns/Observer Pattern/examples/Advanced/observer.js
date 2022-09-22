// Observers List
export class ObserverList {
  constructor() {
    this.observerList = [];
  }

  add(obj) {
    return this.observerList.push(obj);
  }

  count() {
    return this.observerList.length;
  }

  get(index) {
    if (index > -1 && index < this.observerList.length) {
      return this.observerList[index];
    }
  }

  indexOf(obj, startIndex) {
    let i = startIndex;

    while (i < this.observerList.length) {
      if (this.observerList[i] === obj) {
        return i;
      }
      i++;
    }

    return -1;
  }

  removeAt(index) {
    this.observerList.splice(index, 1);
  }
}

// Creating the Subject
export class Subject {
  constructor() {
    this.observers = new ObserverList();
  }

  subscribe(observer) {
    this.observers.add(observer);
  }

  unsubscribe(observerToUnsubscribe) {
    this.observers.removeAt(this.observers.indexOf(observerToUnsubscribe, 0));
  }

  notify(context) {
    const observerCount = this.observers.count();
    for (let i = 0; i < observerCount; i++) {
      this.observers.get(i).update(context);
    }
  }
}

// Creating the Observer
export class Observer {
  constructor() {}
  update() {}
}

// Concrete Subject
export class ConcreteSubject extends Subject {
  constructor(element) {
    // Call the constructor of the super class.
    super();
    this.element = element;

    // Clicking the checkbox will trigger notifications to its observers
    this.element.onclick = () => {
      this.notify(this.element.checked);
    };
  }
}

// Concrete Observer
export class ConcreteObserver extends Observer {
  constructor(element) {
    super();
    this.element = element;
  }

  // Override with custom update behaviour
  update(value) {
    this.element.checked = value;
  }
}
