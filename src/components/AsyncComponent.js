import React, { Component } from "react";

// This AsyncComponent is a High-Order Component(HOC), which returns another component.

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      // importComponent() returns object, where there is a property-Component in the object.default. So over here I am using object destruction, grabbing  everything what is in object.default and assigning name "component".
      const { default: component } = await importComponent();
      this.setState({ component: component });
    }

    render() {
      const Component = this.state.component;
      return Component ? <Component {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
