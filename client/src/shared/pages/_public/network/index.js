// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Container, Microcopy, Heading, Page } from "./styles";

import Footer from "../../../components/footer";

class Network extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Page>
        <Container>
          <Microcopy>
            <Heading>Network Statistics</Heading>
          </Microcopy>
        </Container>
        <Footer />
      </Page>
    );
  }
}

export default Network;
