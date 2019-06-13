// Library Imports
import React, { Component } from "react";

// Relative Imports
import {
  Container,
  Microcopy,
  Buttons,
  Heading,
  Page,
  Title,
  Scroller,
  Cards,
  Wrapper,
  Subtitle,
  Section,
  Header,
  HeadingWrapper
} from "./styles";

import Footer from "../../../components/footer";
import Content from "../../../components/_public/content";
import Link from "../../../components/_buttons/link";
import Button from "../../../components/_buttons/button";

import api from "../../../constants/priceData.js";

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

  renderTokens = () => {
    const { oracle } = this.state;

    return oracle.map(info => {
      const { token, ticker, data } = info;
      return (
        <Cards key={token}>
          <Header>
            <Section>
              <Title left>{ticker}</Title>
              <Title>{data[0]}</Title>
            </Section>
            <Section>
              <Subtitle>{token}</Subtitle>
              <Subtitle>0.00%</Subtitle>
            </Section>
          </Header>
        </Cards>
      );
    });
  };

  render() {
    return (
      <Page>
        <Container>
          <Microcopy>
            <HeadingWrapper>
              <Heading>Private, Stable, Money</Heading>
            </HeadingWrapper>
            <Buttons>
              <Link to="/wallet/create" label="Get Haven Vault" />
              <Button onClick={this.handleClick} label="Learn More" />
            </Buttons>
          </Microcopy>
          <Scroller>
            <Wrapper>{this.renderTokens()}</Wrapper>
          </Scroller>
        </Container>
        <Content />
        <Footer />
      </Page>
    );
  }
}

export default Welcome;
