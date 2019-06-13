// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Container } from "./styles";

class Page extends Component {
  render() {
    return <Container>{this.props.children}</Container>;
  }
}

export default Page;
