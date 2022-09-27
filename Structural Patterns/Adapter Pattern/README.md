# Adapter Pattern

**Pattern Type**: Structural.

Transtalte an _interface_ for an object or class into an interface compatible with a specific system.

<br>

## Overview

An __Adapter__ basically allows objects and classes to function together which normally coudn't due to their incompatible interfaces. The adapter makes the work to translate calls to its interfaces into calls to the original interface and the code required to achive this is quite minimal.

One example you may be familiar with is the `jQuery.fn.css()` function, which let's you write styles for multiple browsers automatically, making this trivial to us and use a single syntax, which is adapted for the alctual browser supported functionalities behind the scenes.

__Code Example__
```js
// Cross browser opacity:
// opacity: 0.9; Chrome 4+, FF2+, Saf3.1+, Opera 9+, IE9, iOS 3.2+, Android 2.1+
// filter: alpha(opacity=90); IE6-IE8

// Setting opacity
$( ".container" ).css( { opacity: .5 } );

// Getting opacity
var currentOpacity = $( ".container" ).css('opacity');

// Query core cssHok
get: function( elem, computed ) {
  // IE uses filters for opacity
  return ropacity.test( (
        computed && elem.currentStyle ?
            elem.currentStyle.filter : elem.style.filter) || "" ) ?
    ( parseFloat( RegExp.$1 ) / 100 ) + "" :
    computed ? "1" : "";
},

set: function( elem, value ) {
  var style = elem.style,
    currentStyle = elem.currentStyle,
    opacity = jQuery.isNumeric( value ) ?
          "alpha(opacity=" + value * 100 + ")" : "",
    filter = currentStyle && currentStyle.filter || style.filter || "";

  // IE has trouble with opacity if it does not have layout
  // Force it by setting the zoom level
  style.zoom = 1;

  // if setting opacity to 1, and no other filters
  //exist - attempt to remove filter attribute #6652
  if ( value >= 1 && jQuery.trim( filter.replace( ralpha, "" ) ) === "" ) {

    // Setting style.filter to null, "" & " " still leave
    // "filter:" in the cssText if "filter:" is present at all,
    // clearType is disabled, we want to avoid this style.removeAttribute
    // is IE Only, but so apparently is this code path...
    style.removeAttribute( "filter" );

    // if there there is no filter style applied in a css rule, we are done
    if ( currentStyle && !currentStyle.filter ) {
      return;
    }
  }

  // otherwise, set new filter values
  style.filter = ralpha.test( filter ) ?
    filter.replace( ralpha, opacity ) :
    filter + " " + opacity;
}
};****
```

<br>

## Implementation

Imagine that we decided to create a `Calculator`. This calculator needs three attributes (`num1`, `num2`, `operation`), the last one is in charge of the operation that will be realized.

```js
class Calculator {
  operation(num1, num2, operation) {
    switch (operation) {
      case 'multiplication':
        return num1 * num2;
      case 'division':
        return num1 / num2;
      default:
        return NaN;
    }
  }
}
```

Now, let's imagine that time passes and the project gets bigger and bigger. So, it's time for a __big refactor__ of the `Calculator` class.[[]]]]]]]

```js
class Calculator {
  add(num1, num2) {
    return num1 + num2;
  }
  div(num1, num2) {
    return num1 / num2;
  }
  mult(num1, num2) {
    return num1 * num2;
  }
}

export default Calculator;
```

As we can see the old `Calculator` is no longer compatible with our last code version. So, here is when we need to create an __adapter__.

```js
import Calculator from "./Calculator";

class CalculatorAdapter {
  constructor() {
    this.calculator = new Calculator();
  }
  operation(num1, num2, operation) {
    switch (operation) {
      case "add":
        return this.calculator.add(num1, num2);
      case "multiplication":
        return this.calculator.mult(num1, num2);
      case "division":
        return this.calculator.div(num1, num2);
      default:
        return NaN;
    }
  }
}

export default CalculatorAdapter;
```

<br>

And now, we can update our old code to use the __CalculatorAdapter__ and should work perfectly fine!

```js
import Calculator from "./Calculator";
import CalculatorAdapter from "./CalculatorAdapter";

//Adapter
const calcAdapter = new CalculatorAdapter();
const sumAdapter = calcAdapter.operation(2, 2, "multiplication");
console.log(sumAdapter); //output 4

//Calculator
const calculator = new Calculator();
const sum = calculator.mult(2, 2);
console.log(sum); //output 4
```

## Tradeoffs

- __SOLID__: It works with SOLID principles.
- __Scalability__: We can add new adapters without affecting the existing code.
- __Complexity__: Code complexity increases, due to the neccesity of introducing new interfaces and classes.****