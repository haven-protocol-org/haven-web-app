// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Container, Microcopy, Heading, Page } from "./styles";

import Content from "../../../components/_public/whitepaper";
import Footer from "../../../components/footer";

class Whitepaper extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Page>
        <Container>
          <Microcopy>
            <Heading>
              Haven <br />
              White Papers
            </Heading>
          </Microcopy>
        </Container>
        <Content />
        <Footer />
      </Page>
    );
  }
}

export default Whitepaper;
