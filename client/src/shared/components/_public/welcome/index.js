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
import how from "../../../../assets/how.svg";
import what from "../../../../assets/what.svg";
import why from "../../../../assets/why.svg";

const Content = React.forwardRef((props, ref) => {
  return (
    <>
      <Wrapper>
        <Container ref={ref}>
          <Test reverse>
            <Image src={what} />
          </Test>
          <Words>
            <Header>
              What is <br />
              Haven Protocol?
            </Header>
            <Title>BUY. SWAP. STORE.</Title>
            <Description>
              Be your own bank with Haven. Simply buy Haven [XHV] from any
              exchange it’s listed on, send it to your own private digital vault
              where you can swap between all supported Haven currencies and
              securely store them without giving up control to anyone else.
              <br />
              <br />
              Complete privacy so that YOUR money is 100% yours. No bank needed.
              All Haven asset exchanges occur within the Haven vault, without a
              third party. All Haven transactions are private, anonymous and
              completely untraceable.
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
            <Header>
              How does <br />
              Haven work?
            </Header>
            <Title>PRIVATE. SECURE. FLEXIBLE.</Title>
            <Description>
              Haven uses an innovative mechanism to swap between all supported
              currencies. For example, when you swap from Haven [XHV] to xUSD
              the system destroys the XHV and creates xUSD equivalent to the USD
              value. If you want to go back to XHV you will always receive the
              same USD worth of XHV.
              <br />
              <br />
              There are many different stablecoin projects but very few that can
              offer the privacy, security and the flexibility of Haven with all
              currency swaps completed in your own Haven vault. No 3rd party
              needed.
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
            <Header>
              Why should I <br />
              use Haven?
            </Header>
            <Title>ANYONE. ANYWHERE. ANYTIME.</Title>
            <Description>
              Use Haven to store or send your money anywhere in the world at any
              time with little cost and complete privacy.
              <br />
              <br />
              Haven is based on Monero, a well regarded cryptocurrency, and as
              such inherits all of its privacy features giving you complete
              financial control. No permission needed to store or transfer your
              wealth.
            </Description>
            <LearnMore to="/faq">Read F.A.Q's</LearnMore>
          </Words>
        </Container>
      </Wrapper>
    </>
  );
});

export default Content;
