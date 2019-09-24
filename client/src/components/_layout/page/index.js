// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";

// Relative Imports
import { Container } from "./styles";

export default class extends Component {
  state = {
    status: false
  };

  render() {
    return <Container>{this.props.children}</Container>;
  }
}
