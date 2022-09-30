# Module Pattern

**Pattern Type**: Creational and Structural.

Split up your code into smaller and reusable pieces.

In ES6/ES2015 Javascript introduced built-in JavaScript Modules. A module is a file that contains JavaScript code and makes it easier to expose and hide certain values.

The module pattern is a great way to split a large file into **multiple smaller, reusable pieces**. It also promotes **code encapsulation** since the values within modules are kept private inside the module by default, and cannot be modified. Only values that are explicitly exported with the `export` keyword are accesible to other files.

Without modules, we can access properties values defined in scripts that are loaded prior to the currently running script. With modules however, we can use only the values that have been exported.

<br>

## Implementation

There are few ways we can use modules.

### HTML tag

When adding JavaScript to HTML files directly, you can add `type="module"` attribute to an `script` tag.

### Node

In node, you can use ES2015/ES6 modules either by:

- using the `.mjs` extension.
- Adding `"type": "module"` in your `package.json` file.

<br>

## Tradeoffs

- **Encapsulation**: _One of the Object Oriented Programming Pillars_. The values within a module are scoped to that specific module. Values that are not explicitly exported aren't accesible outside of the module.
- **Reusability**: We can reuse modules throughout our application.

<br>

## References

- [Learning JavaScript Design Patterns | Module Pattern](https://www.patterns.dev/posts/classic-design-patterns/#modulepatternjavascript)
- [Patterns.dev | Module Pattern](https://www.patterns.dev/posts/module-pattern/)
- [FrontendMasters Design Patterns Workshop | Module Pattern](https://javascriptpatterns.vercel.app/patterns/design-patterns/module-pattern)
