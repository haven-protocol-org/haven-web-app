// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Container, Microcopy, Heading, Page } from "./styles";

import Content from "../../../components/_public/faq";
import Footer from "../../../components/footer";

class Faq extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleClick = () => {
    window.scrollTo({
      top: 700,
      behavior: "smooth"
    });
  };

  render() {
    return (
      <Page>
        <Container>
          <Microcopy>
            <Heading>Haven</Heading>
            <Heading>F.A.Q Guide</Heading>
          </Microcopy>
        </Container>
        <Content />
        <Footer />
      </Page>
    );
  }
}

export default Faq;
