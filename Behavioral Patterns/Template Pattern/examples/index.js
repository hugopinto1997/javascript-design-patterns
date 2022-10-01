import Button from "./button.js";

(function App() {
  // Let's suppose this is: <Button />
  const button = new Button();

  // Let's execute lifecycle methods just as it's a regular React component.
  button.render();
  button.componentDidMount();
  button.componentWillUnmount();
})();
