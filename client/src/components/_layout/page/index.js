// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Container } from "./styles";
import Status from "../status/index.js";

class Page extends Component {
  render() {
    return (
      <>
        <Container>
          {this.props.children}
          <Status>Pending transaction</Status>
        </Container>
      </>
    );
  }
}

export default Page;
