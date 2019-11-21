// Library Imports
import React, { Component } from "react";

// Relative Imports
import {
  Container,
  Microcopy,
  Buttons,
  Heading,
  Page,
  HeadingWrapper
} from "./styles";

import Footer from "../../../components/footer";
import Content from "../../../components/_public/welcome";
import Link from "../../../components/_buttons/link";
import Button from "../../../components/_buttons/button";

import api from "../../../../dummy/priceData.js";

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

    return (
      <Page>
        <Container>
          <Microcopy>
            <HeadingWrapper>
              <Heading size={windowWidth < 340 && "44px"}>
                Private <br /> Decentralized Finance
              </Heading>
            </HeadingWrapper>
            <Buttons>
              <Link to="/create" label="Get Haven Vault" />
              <Button onClick={this.handleClick} label="Learn More" />
            </Buttons>
          </Microcopy>
        </Container>
        <Content />
        <Footer />
      </Page>
    );
  }
}

export default Welcome;
