// Library Imports
import React, { Component } from "react";

// Relative Imports
import {
  Container,
  Microcopy,
  Buttons,
  Heading,
  Page,
  HeadingWrapper,
  Cards,
  Header,
  Section,
  Title,
  Subtitle,
  Scroller,
  Wrapper,
  Table,
  Cell,
  CellTitle,
  CellSubtitle,
  CellContainer
} from "./styles";

import Footer from "../../../components/footer";
import Content from "../../../components/_public/welcome";
import Link from "../../../components/_buttons/link";
import Button from "../../../components/_buttons/button";

import api from "../../../../dummy/priceData.js";
import { ScrollTickerWeb } from "../../../../platforms/web/components/ScrollTicker";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.contentRef = React.createRef();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  state = {
    oracle: api
  };

  loadAssets = () => {
    return (
      <>
        <Cell>
          <CellContainer>
            <CellTitle>Title 1</CellTitle>
            <CellTitle>Title 2</CellTitle>
          </CellContainer>
          <CellContainer>
            <CellSubtitle>Subtitle 1</CellSubtitle>
            <CellSubtitle>Subtitle 2</CellSubtitle>
          </CellContainer>
        </Cell>
      </>
    );
  };

  handleClick = () => {
    window.scrollTo({
      top: this.contentRef.current.offsetTop,
      behavior: "smooth"
    });
  };

  render() {
    const windowWidth = window.innerWidth;
    // <ScrollTickerWeb />
    return (
      <Page>
        <Container>
          <div />
          <Microcopy>
            <HeadingWrapper>
              <Heading size={windowWidth < 340 && "44px"}>
                Private <br /> Decentralized Finance
              </Heading>
            </HeadingWrapper>
            <Buttons>
              <Link to="/create" label="Get Haven Vault" />
              <Button onClick={() => this.handleClick()} label="Learn More" />
            </Buttons>
          </Microcopy>
          <Table>{this.loadAssets()}</Table>
        </Container>
        <Content ref={this.contentRef} />
        <Footer />
      </Page>
    );
  }
}

export default Welcome;
