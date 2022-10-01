# Template Pattern

**Pattern Type**: Behavioral.

Define the skeleton of an algorithm in an operation, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an
algorithm without changing the algorithm's structure.

## Overview

The **Template Method** pattern provides an outline of a series of steps for an algorithm. Objects that implement these steps retain the original structure of the algorithm but have the option to redefine or adjust certain steps. This pattern is designed to offer extensibility to the client developer.

The main feature of this pattern is an algorithm which changes slightly between
different kinds of classes. These parts in common are repeated in the different
algorithms when implemented in a concrete class.

An easy way to think of Template Method is that of an algorithm with holes. It is up to the developer to fill these holes with appropriate functionality for each step.

### Participants

The objects participating in this pattern are:

- **Abstract Class** -- In example code: `Component` (Copying the implementation `React`'s class to be extended by a class component).
  - Offers an interface for clients to invoke the template method.
  - Implements template method which defines the primitive Steps for an algorithm.
  - Provides the hooks (through method overriding) for a client developer to implement the Steps.
- **Concrete Class** -- In example code: `Button` class component
  - implements the primitive Steps as defined in AbstractClass

<br>

## Implementation

This is an example where we use JavaScript's prototypal inheritance. The inherit function helps us establish the inheritance relationship by assigning a base object to the prototype of a newly created descendant object.

The `Component` class represents the Abstract Class and `Button` represents the Concrete Class. `Button` overrides the 3 template methods: `render`, `componentDidMount`, and `componentWillUnmount` with component-specific implementations.

For the following example we will use as inspiration the way the `React` library shows us how to create class components and the way this way how a specific component gives an implementation to the lifecycle methods of a `React` component.

The template methods allow the client to change the behavior of each lifecycle method by adjusting (filling in the blanks) only the template methods. The rest, such as, the order of the steps, stays the same for any component.

Let's define our Abstract Class -- the `Component` class:

```js
class Component {
  constructor() {}

  // ...
  componentWillMount() {}
  componentDidMount() {}
  shouldComponentUpdate(args) {}
  render() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
}
```

Next, let's see how the template method is beign applied in our Concrete Class -- the `Button` component:

```js
class Button extends Component {
  constructor(props = {}) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("Mounted");
  }

  componentWillUnmount() {
    console.log("Unmounting");
  }

  render() {
    console.log("Component Rendered");
  }
}
```

Awesome! with this we have used our Abstract Class to define the skeleton and within our Concrete Class we provide a specific implementation to each of the template methods!.

<br>

## Tradeoffs

- **Don't Repeat Yourself (DRY)**: There is no code duplication.
- **Reusability**: Code reuse happens with the Template Method pattern as it uses inheritance and not composition. Only a few methods need to be overridden.
- **Flexibility**: Lets subclasses decide how to implement steps in an algorithm.
- **Debugging complexity**: Debugging and understanding the sequence of flow in the Template Method pattern can be confusing at times. You may end up implementing a method that shouldn't be implemented or not implementing an abstract method at all. Documentation and strict error handling has to be done by the ...

<br>

## References

- [O'reilly | Learning Python Design Patterns - Second Edition by Chetan Giridhar](https://www.oreilly.com/library/view/learning-python-design/9781785888038/ch08s05.html)
- [DEV.to | Design Patterns - Template Method](https://dev.to/carlillo/design-patterns---template-method-180k)
- [Dofactory | JavaScript Template Method](https://www.dofactory.com/javascript/design-patterns/template-method#:~:text=The%20Template%20Method%20pattern%20provides,extensibility%20to%20the%20client%20developer.)
