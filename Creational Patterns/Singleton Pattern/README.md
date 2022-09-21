# Singleton Pattern

**Pattern Type**: Creational.

Share a single global instance throughout our application.

<br>

## Overview

With the Singleton Pattern, we restrict the instantiation of certain classes to one single instance. This single instance is unmodifiable, and can be accessed globally throughout the application.

For example, we can have a ```Counter``` singleton, which contains a ```getCount, increment```, and ```decrement``` method.

This singleton can be shared globally across multiple files within the application. The imports of this Singleton all reference the same instance.

The ```increment``` method increments the value of counter by 1. Any time the increment method has been invoked anywhere in the application, thus changing the value of counter, the change is reflected throughout the entire application.

<br>

## Implementation
In ES6, there are several ways of creating a Singleton.

### Classes
Creating an ES6 singleton class ```(See examples/Class-Singleton)```.

### Objects
We can also create objects without having to create a class ```(See examples/Object-Singleton)```.

<br>

## Tradeoffs
- Memory, Restricting instantiation to just one instance could potentially save a lot of memory space. Using space just for one instance.
- Unnecesary: ES6 modules are singleton by default, we no longer need to explicitly create singleton to achieve this global, non-modifiable behavior.
- Dependency hiding: When importing another module, it may not always be obvious that that module is importing a Singleton. This could lead to unexpected value modification within the Singleton, which would be reflected throughout the application.
- Global Scoped Pollution: The global behavior of Singletons is essentially the same as a global variable. Global Scope Pollution can end up in accidentally overwriting the value of a global variable, which can lead to a lot of unexpected behavior. Usually, certain parts of the codebase modify the values within global state, whereas others consume that data. The order of execution here is important, understanding the data flow when using a global state can get very tricky as your application grows, and dozens of components rely on each other.
- Testing: Since we can't create new instances each time, all tests rely on the modification to the global instance of the previous test. The order of the tests matter in this case, and one small modification can lead to an entire test suite failing. After testing, we need to reset the entire instance in order to reset the modifications made by the tests.