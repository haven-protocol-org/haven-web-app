// Library Imports
import React from "react";

// Relative Imports
import {
  Container,
  Image,
  Words,
  Description,
  LearnMore,
  Test
} from "./styles";
import { Header } from "../../../constants/type.js";
import how from "../../../assets/how.svg";

import what from "../../../assets/what.svg";
import why from "../../../assets/why.svg";

const Content = ({ ref }) => {
  return (
    <>
      <Container ref={ref}>
        <Test reverse>
          <Image src={what} />
        </Test>
        <Words>
          <Header>
            What is <br />
            Haven Protocol?
          </Header>
          <Description>
            Haven is a multi-asset protocol offering diversified investments
            across a range of assets. The assets such as Haven (XHV), United
            States Dollar (xUSD), Swiss Francs (xCHF) and Gold (xGOLD) enable
            users to take part in and offset market volatility.
          </Description>
          <Description>
            All Haven asset exchanges occur within the Haven vault, without a
            third party. All Haven transactions are private, anonymous and
            completely untraceable.
          </Description>
          <LearnMore to="/faq">Read F.A.Q's</LearnMore>
        </Words>
      </Container>
      <Container reverse>
        <Test reverse>
          <Image src={how} />
        </Test>
        <Words reverse>
          <Header>
            How does <br />
            Haven work?
          </Header>
          <Description>
            Haven utilizes a mint and burn protocol available within the Haven
            vault. Once you own XHV, the coin can be burned for the stable
            digital asset, xUSD. You are also able to mint xUSD back to the
            volatile coin, XHV.
          </Description>
          <Description>
            The value of XHV will always fluctuate, but 1 xUSD will always be
            equal to 1 USD worth of XHV. Investors can choose to hold the
            volatile coin, XHV, or lock in their portfolio value in xUSD
          </Description>
          <LearnMore to="/faq">Read F.A.Q's</LearnMore>
        </Words>
      </Container>
      <Container>
        <Test>
          <Image reverse src={why} />
        </Test>
        <Words>
          <Header>
            Why should I <br />
            use Haven?
          </Header>
          <Description>
            Haven offers a unique solution to the risks of storing value in
            crypto-currencies. The mint and burn protocol allows the asset,
            xUSD, to remain stable without the use of fiat backing
          </Description>
          <Description>
            As a Monero fork, Haven is private by default and all balances and
            transactions are anonymous. The price stability of Haven's assets
            gives investors exposure to market volatility, when they choose it.
          </Description>
          <LearnMore to="/faq">Read F.A.Q's</LearnMore>
        </Words>
      </Container>
    </>
  );
};

export default Content;
