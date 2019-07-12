import React, { Component } from "react";
import "./App.css";
import Page1 from "./components/Page1";

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: "page1",
      component: ""
    };
  }

  onRouteChange = route => {
    // No code splitting:
    // this.setState({ route: route });

    // With code splitting:
    switch (route) {
      case "page2":
        // this import here is only available by webpack, which comes with create-react-app by default.
        // this import is async. it returns a Promise.
        import("./components/Page2").then(Page2 => {
          this.setState({ route: route, component: Page2.default });
        });
        break;
      case "page3":
        import("./components/Page3").then(Page3 => {
          this.setState({ route: route, component: Page3.default });
        });
        break;
      default:
        this.setState({ route: route, component: Page1.default });
        break;
    }
  };

  render() {
    switch (this.state.route) {
      case "page2":
        return <this.state.component onRouteChange={this.onRouteChange} />;
      case "page3":
        return <this.state.component onRouteChange={this.onRouteChange} />;
      default:
        return <Page1 onRouteChange={this.onRouteChange} />;
    }
  }
}

export default App;
