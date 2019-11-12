// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Container, Microcopy, Heading, Page } from "./styles";

import Content from "../../../components/_public/timeline";
import Footer from "../../../components/footer";

class Timline extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Page>
        <Container>
          <Microcopy>
            <Heading>Haven Timeline</Heading>
          </Microcopy>
        </Container>
        <Content />
        <Footer />
      </Page>
    );
  }
}

export default Timline;
