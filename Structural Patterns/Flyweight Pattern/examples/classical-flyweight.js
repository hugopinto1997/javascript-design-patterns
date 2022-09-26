/* Function.prototype.implementsFor works on an object constructor and will accept a parent class (function) or object and either inherit from this using normal inheritance (for functions) or virtual inheritance (for objects). */

// Simulate pure virtual inheritance/"implement" keyword for JS
Function.prototype.implementsFor = function (parentClassOrObject) {
  if (parentClassOrObject.constructor === Function) {
    // Normal Inheritance
    this.prototype = new parentClassOrObject();
    this.prototype.constructor = this;
    this.prototype.parent = parentClassOrObject.prototype;
  } else {
    // Pure Virtual Inheritance
    this.prototype = parentClassOrObject;
    this.prototype.constructor = this;
    this.prototype.parent = parentClassOrObject;
  }
  return this;
};

// ES2015+ syntax/keywords used: const, let, arrow functions,
// template literals for string interpolation, parantheses optional for one parameter

// Flyweight object
const CoffeeOrder = {
  // Interfaces
  serveCoffee(context) {},
  getFlavor() {},
};

// ConcreteFlyweight object that creates ConcreteFlyweight
// Implements CoffeeOrder
function CoffeeFlavor(newFlavor) {
  const flavor = newFlavor;

  // If an interface has been defined for a feature
  // implement the feature
  if (typeof this.getFlavor === "function") {
    this.getFlavor = () => flavor;
  }

  if (typeof this.serveCoffee === "function") {
    this.serveCoffee = (context) => {
      console.log(
        `Serving Coffee flavor ${flavor} to table number ${context.getTable()}`
      );
    };
  }
}

// Implement interface for CoffeeOrder
CoffeeFlavor.implementsFor(CoffeeOrder);

// Handle table numbers for a coffee order
const CoffeeOrderContext = (tableNumber) => ({
  getTable() {
    return tableNumber;
  },
});

const CoffeeFlavorFactory = () => {
  const flavors = {};
  let length = 0;

  return {
    getCoffeeFlavor(flavorName) {
      let flavor = flavors[flavorName];
      if (typeof flavor === "undefined") {
        flavor = new CoffeeFlavor(flavorName);
        flavors[flavorName] = flavor;
        length++;
      }
      return flavor;
    },

    getTotalCoffeeFlavorsMade() {
      return length;
    },
  };
};

// Sample usage:
// testFlyweight()

const testFlyweight = () => {
  // The flavors ordered.
  const flavors = [];

  // The tables for the orders.
  const tables = [];

  // Number of orders made
  let ordersMade = 0;

  // The CoffeeFlavorFactory instance
  const flavorFactory = CoffeeFlavorFactory();

  function takeOrders(flavorIn, table) {
    flavors.push(flavorFactory.getCoffeeFlavor(flavorIn));
    tables.push(CoffeeOrderContext(table));
    ordersMade++;
  }

  takeOrders("Cappuccino", 2);
  takeOrders("Cappuccino", 2);
  takeOrders("Frappe", 1);
  takeOrders("Frappe", 1);
  takeOrders("Xpresso", 1);
  takeOrders("Frappe", 897);
  takeOrders("Cappuccino", 97);
  takeOrders("Cappuccino", 97);
  takeOrders("Frappe", 3);
  takeOrders("Xpresso", 3);
  takeOrders("Cappuccino", 3);
  takeOrders("Xpresso", 96);
  takeOrders("Frappe", 552);
  takeOrders("Cappuccino", 121);
  takeOrders("Xpresso", 121);

  for (let i = 0; i < ordersMade; ++i) {
    flavors[i].serveCoffee(tables[i]);
  }
  console.log(" ");
  console.log(
    `total CoffeeFlavor objects made: ${flavorFactory.getTotalCoffeeFlavorsMade()}`
  );
};

testFlyweight();
