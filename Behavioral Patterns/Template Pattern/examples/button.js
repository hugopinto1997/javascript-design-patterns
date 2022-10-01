import React from "./react.js";

export class Button extends React.Component {
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

export default Button;
