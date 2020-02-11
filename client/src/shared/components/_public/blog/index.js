// Library Imports
import React from "react";

// Relative Imports
import {
  Container,
  Cell,
  Description,
  Title,
  Wrapper,
  Image,
  Route,
  Aspect
} from "./styles";

import b1 from "../../../../assets/blog/b_v1.svg";
import b2 from "../../../../assets/blog/b_v2.svg";
import b3 from "../../../../assets/blog/b_v3.svg";
import b4 from "../../../../assets/blog/b_v4.svg";
import b5 from "../../../../assets/blog/b_v5.svg";
import b6 from "../../../../assets/blog/b_v6.svg";
import b7 from "../../../../assets/blog/b_v7.svg";
import b8 from "../../../../assets/blog/b_v8.svg";
import b9 from "../../../../assets/blog/b_v9.svg";

const Content = () => {
  return (
    <Wrapper>
      <Container>
        <Cell>
          <Aspect>
            <Image src={b9} />
          </Aspect>
          <Title>What is Haven (XHV)? Updated FAQs</Title>
          <Description>
            The base currency for the Haven network is XHV. Haven is a
            Proof-of-Work...
          </Description>
          <Route
            rel="noopener"
            target="_blank"
            href="https://medium.com/@havencurrency/what-is-haven-xhv-updated-faqs-a86bed3148a2"
          >
            Read More
          </Route>
        </Cell>
        <Cell>
          <Aspect>
            <Image src={b8} />
          </Aspect>
          <Title>xUSD Launch Update Part 1</Title>
          <Description>
            On the heels of a public test phase, the Haven team has been busy
            preparing for...
          </Description>
          <Route
            rel="noopener"
            target="_blank"
            href="https://medium.com/@havencurrency/xusd-launch-update-part-1-deployment-of-new-haven-daemon-46d614382d4d"
          >
            Read More
          </Route>
        </Cell>
        <Cell>
          <Aspect>
            <Image src={b7} />
          </Aspect>
          <Title>Public Release of the Haven Vault</Title>
          <Description>
            Today the Haven team is excited to release the final stage of the
            xUSD...
          </Description>
          <Route
            rel="noopener"
            target="_blank"
            href="https://medium.com/@havencurrency/public-release-of-the-haven-vault-xusd-testnet-c3625a35705"
          >
            Read More
          </Route>
        </Cell>
        <Cell>
          <Aspect>
            <Image src={b6} />
          </Aspect>
          <Title>Preparing for Haven’s Mainnet</Title>
          <Description>
            The Haven team and community has made significant progress over the
            last year building...
          </Description>
          <Route
            rel="noopener"
            target="_blank"
            href="https://medium.com/@havencurrency/preparing-for-havens-mainnet-launch-of-xusd-c50e3b556649"
          >
            Read More
          </Route>
        </Cell>
        <Cell>
          <Aspect>
            <Image src={b5} />
          </Aspect>
          <Title>Update - Nov 2019</Title>
          <Description>
            As Haven approaches its first major project milestone — launching
            the first private...
          </Description>
          <Route
            rel="noopener"
            target="_blank"
            href="https://medium.com/@havencurrency/haven-november-2019-update-b46cee796e01"
          >
            Read More
          </Route>
        </Cell>
        <Cell>
          <Aspect>
            <Image src={b4} />
          </Aspect>
          <Title>Update - Oct 2019</Title>
          <Description>
            It’s been nine months since the Haven community took over the
            project’s development...
          </Description>
          <Route
            rel="noopener"
            target="_blank"
            href="https://medium.com/@havencurrency/haven-offshore-testnet-update-october-2019-49057d6329de"
          >
            Read More
          </Route>
        </Cell>
        <Cell>
          <Aspect>
            <Image src={b1} />
          </Aspect>
          <Title>Haven - Zelcore</Title>
          <Description>
            The Haven team is proud to announce we have been selected by
            Zelcore...
          </Description>
          <Route
            rel="noopener"
            target="_blank"
            href="https://medium.com/@havencurrency/haven-added-to-zelcore-ecosystem-ab3bb530153f"
          >
            Read More
          </Route>
        </Cell>

        <Cell>
          <Aspect>
            <Image src={b2} />
          </Aspect>
          <Title>Update - April 2019</Title>
          <Description>
            Since January, the Haven Protocol project has undergone many
            changes....
          </Description>
          <Route
            rel="noopener"
            target="_blank"
            href="https://medium.com/@havencurrency/haven-protocol-april-2019-update-ca2e911176c8"
          >
            Read More
          </Route>
        </Cell>
        <Cell>
          <Aspect>
            <Image src={b3} />
          </Aspect>
          <Title>Update - Jan 2019</Title>
          <Description>
            As many of you have noticed, the Haven Protocol team has expanded
            over...
          </Description>
          <Route
            rel="noopener"
            target="_blank"
            href="https://medium.com/@havencurrency/update-from-the-haven-protocol-xhv-development-team-e1619b205834"
          >
            Read More
          </Route>
        </Cell>
      </Container>
    </Wrapper>
  );
};

export default Content;
