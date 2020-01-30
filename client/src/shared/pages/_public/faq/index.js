// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Container, Microcopy, Heading, Page } from "./styles";

import English from "../../../components/_public/faq/english/index";
import Footer from "../../../components/footer";

class Faq extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleTranslate(language) {
    return () => {
      this.setState({
        language: language
      });
    };
  }

  render() {
    return (
      <Page>
        <Container>
          <Microcopy>
            <Heading>Haven Protocol F.A.Qs</Heading>
          </Microcopy>
        </Container>
        <English />
        <Footer />
      </Page>
    );
  }
}

export default Faq;
