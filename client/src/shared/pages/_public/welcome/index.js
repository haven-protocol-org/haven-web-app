// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Container, Microcopy, Heading, Page, HeadingWrapper } from "./styles";

import Footer from "../../../components/footer";
import Content from "../../../components/_public/welcome";

import api from "../../../../dummy/priceData.js";
import { MultiLogin } from "../../../components/_auth/multi_login";

class Welcome extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  state = {
    oracle: api
  };

  handleClick = () => {
    window.scrollTo({
      top: 800,
      behavior: "smooth"
    });
  };

  render() {
    const windowWidth = window.innerWidth;
    console.log("windowWidth", windowWidth);

    return (
      <Page>
        <Container>
          <Microcopy>
            <HeadingWrapper>
              <Heading size={windowWidth < 340 && "44px"}>
                Private <br /> Decentralized Finance
              </Heading>
            </HeadingWrapper>
            <MultiLogin />
          </Microcopy>
        </Container>
        <Content />
        <Footer />
      </Page>
    );
  }
}

export default Welcome;
