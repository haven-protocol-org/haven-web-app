// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Container } from "./styles";

export default class extends Component {


  render() {
    return <Container>{this.props.children}</Container>;
  }
}
