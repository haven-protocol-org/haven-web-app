// Library Imports
import React from "react";

// Relative Imports
import {
  Container,
  Image,
  Words,
  Description,
  LearnMore,
  Test,
  Title,
  Header,
  Wrapper
} from "./styles";
// import { Header } from "../../../constants/type.js";
import how from "../../../../assets/illustration/how.svg";
import what from "../../../../assets/illustration/what.svg";
import why from "../../../../assets/illustration/why.svg";

const Content = React.forwardRef((props, ref) => {
  return (
    <>
      <Wrapper>
        <Container ref={ref}>
          <Test reverse>
            <Image src={what} />
          </Test>
          <Words>
            <Header>What is Haven Protocol?</Header>
            <Title>BUY. SWAP. STORE.</Title>
            <Description>
              Haven is a way to store, exchange and transfer your money with
              complete privacy and anonymity. It's an ecosystem of digital
              currencies and assets built on top of Monero and is secured by
              Proof of Work (PoW).
            </Description>
            <LearnMore to="/faq">Read F.A.Q's</LearnMore>
          </Words>
        </Container>
      </Wrapper>

      <Wrapper reverse>
        <Container reverse>
          <Test reverse>
            <Image src={how} />
          </Test>
          <Words reverse>
            <Header>How does Haven work?</Header>
            <Title>PRIVATE. SECURE. FLEXIBLE.</Title>
            <Description>
              Buy XHV, Haven's base currency, and exchange it instantly for any
              of the supported assets in your own simple to use, secure and
              private vault. The Haven network will include major fiat
              currencies such as USD & EURO, precious metals (Gold & Silver) as
              well as bitcoin.
            </Description>
            <LearnMore to="/faq">Read F.A.Q's</LearnMore>
          </Words>
        </Container>
      </Wrapper>

      <Wrapper>
        <Container>
          <Test>
            <Image reverse src={why} />
          </Test>
          <Words>
            <Header>Why choose Haven?</Header>
            <Title>ANYONE. ANYWHERE. ANYTIME.</Title>
            <Description>
              Haven lets you take control of your money with complete privacy.
              All account details, including transactions and balances, remain
              hidden. You can send money anywhere in the world, with no one
              else’s knowledge or needing anyone's permission.
            </Description>
            <LearnMore to="/faq">Read F.A.Q's</LearnMore>
          </Words>
        </Container>
      </Wrapper>
    </>
  );
});

export default Content;
