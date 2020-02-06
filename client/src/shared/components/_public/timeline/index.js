// Library Imports
import React from "react";

// Relative Imports
import {
  Container,
  Cell,
  Description,
  Title,
  Heading,
  Complete,
  Label,
  Data,
  Progress,
  Wrapper,
  List
} from "./styles";

import TimelineSeparator from "../timeline-separator/index.js";

const Content = () => {
  return (
    <Wrapper>
      <Container>
        <Heading>Q1 2020</Heading>
        <Cell>
          <Complete>
            <Label>Progress</Label>
          </Complete>
          <Data>
            <Title incomplete>Implement Haven Daemon 2.0 Testnet</Title>
            <Description>
              The final phase of the xUSD testnet before launch is the testing
              of a new Haven daemon. This updated version allows transaction
              prices to be confirmed at the initiation of the transaction rather
              than the time a block is mined. This provides a more accurate
              mechanism for users’ exchange between XHV and xUSD. The new daemon
              also enables xUSD supply transparency and the addition of future
              xAssets.
            </Description>
          </Data>
        </Cell>
        <TimelineSeparator progress="incomplete" />
        <Cell>
          <Complete>
            <Label>Progress</Label>
          </Complete>
          <Data>
            <Title incomplete>Launch of xUSD to Mainnet</Title>
            <Description>
              At the successful completion of the testnet, we will launch the
              first of Haven’s private stablecoins - xUSD - on Haven’s mainnet.
              After the required hard fork, anyone will be able to exchange
              their XHV for xUSD (and vice versa) privately in their Haven Vault
              with no counterparty risk.
            </Description>
          </Data>
        </Cell>
        <TimelineSeparator progress="incomplete" />
        <Cell>
          <Complete>
            <Label>Progress</Label>
          </Complete>
          <Data>
            <Title incomplete>Release Haven Codebase</Title>
            <Description>
              Upon launch of xUSD to mainnet, we will open-source the entire
              Haven codebase, including xUSD and xAsset functionality, to allow
              anyone who wishes to start building further Haven infrastructure
              or additional utilities.
            </Description>
          </Data>
        </Cell>
        <TimelineSeparator progress="incomplete" />
        <Cell>
          <Complete>
            <Label>Progress</Label>
          </Complete>
          <Data>
            <Title incomplete>Deploy Additional Pricing Oracles</Title>
            <Description>
              As part of the ongoing development of the Haven network, we intend
              to work with several carefully chosen third-party providers to
              integrate multiple decentralized pricing oracles. These oracles
              will provide the necessary price feeds for xUSD exchange functions
              in the Haven Vault.
              <br />
              <br />
              We will likely launch xUSD with the Haven oracle currently being
              used in the testnet, and then proceed to decentralize this part of
              the network. Deploying multiple oracles will give users greater
              confidence in the network and the accuracy of pricing information.
              <br />
              <br />
              While we continue to plan with the Zel team, this work has been
              put on hold due to the resources required to develop a Zel oracle
              solution. This will not impact the timing of xUSD mainnet launch
              and we are actively working with other data providers to develop
              additional oracle solutions.
            </Description>
          </Data>
        </Cell>
        <TimelineSeparator progress="incomplete" />
        <Cell>
          <Complete>
            <Label>Progress</Label>
          </Complete>
          <Data>
            <Title incomplete>Continue DeFi Planning</Title>
            <Description>
              Although still at the early stages of planning, we will continue
              to develop ideas and discussion around further use cases (i.e.
              Haven Loans) within the Haven network. This will include:
              <List>
                Impact assessment of loans on the tokenomics of the protocol
              </List>
              <List>UI and UX implementation</List>
              <List>
                Avenues for on/off ramps into decentralized finance functions
              </List>
              <List>Possible regulatory challenges and impact</List>
              <List>Scalability of protocol</List>
              <List>Economics of loan interest rates</List>
              <List>Market fit within DeFi ecosystem as a whole</List>
            </Description>
          </Data>
        </Cell>
        <TimelineSeparator progress="incomplete" />
        <Cell>
          <Complete>
            <Label>Progress</Label>
          </Complete>
          <Data>
            <Title incomplete>Release Additional xAssets</Title>
            <Description>
              After xUSD has been released and the network is proven to be
              stable and secure, we will look at releasing additional xAssets
              (xBTC, xEUR etc) over time. NOTE: This will not necessarily be
              carried out in Q1.
            </Description>
          </Data>
        </Cell>
        <TimelineSeparator progress="incomplete" />
        <Cell>
          <Complete>
            <Label>Progress</Label>
          </Complete>
          <Data>
            <Title incomplete>Additional Vault Functionality</Title>
            <Description>
              This will be a continuous process as we receive feedback from
              users. It will add to our existing list of potential features
              already proposed by the team and community during development and
              testnet.
            </Description>
          </Data>
        </Cell>
      </Container>

      <Container>
        <Heading>Q3 2019</Heading>
        <Cell>
          <Complete>
            <Label>Complete</Label>
          </Complete>
          <Data>
            <Title complete>Release Haven Vault</Title>
            <Description>
              Haven’s redesigned website will include the launch of Haven Vault,
              a user focused, simple to use custom built wallet that will allow
              users to easily store, transfer, and exchange XHV and xUSD. The
              Haven Vault will first launch as a web based wallet to allow the
              maximum number of users access to the system. It will work
              seamlessly on all modern web browsers, including mobile platforms
              for the first release, and natively on mobile and desktop in later
              releases.
            </Description>
          </Data>
        </Cell>
        <TimelineSeparator progress="complete" />
        <Cell>
          <Complete>
            <Label>Complete</Label>
          </Complete>
          <Data>
            <Title complete>Haven 2.0 Whitepaper</Title>
            <Description>
              After the successful launch of Haven’s offshore functions and the
              xUSD stablecoin, Haven will begin to implement additional
              features. These features will enhance Haven’s network security and
              UI, while also expanding the use of XHV and xUSD. A whitepaper
              will describe in detail our plans for these “Haven 2.0” features.
            </Description>
          </Data>
        </Cell>
        <TimelineSeparator progress="complete" />
        <Cell>
          <Complete>
            <Label>Complete</Label>
          </Complete>
          <Data>
            <Title complete>Network Upgrade</Title>
            <Description>
              A new patch based development model will allow Haven to take
              advantage of Monero upgrades within hours instead of days or
              weeks. Haven has already been rebased onto the very latest monero
              code using these methods and is currently being evaluated in
              testnet before being released to mainnet, and it will not require
              a hard fork. It will also include all Monero security upgrades.
            </Description>
          </Data>
        </Cell>
        <TimelineSeparator progress="complete" />
        <Cell>
          <Complete>
            <Label>Complete</Label>
          </Complete>
          <Data>
            <Title complete>Offshore Testnet</Title>
            <Description>
              Haven will launch a series of robust testnets to begin live
              testing of all offshore and pricing functions. The first offshore
              testnet will be launched with a smaller group of community users,
              followed by a broad public testnet. The testnet will include the
              deployment of the first planned xAsset - xUSD.
            </Description>
          </Data>
        </Cell>
        <TimelineSeparator progress="incomplete" />
        <Cell>
          <Progress>
            <Label>Progress</Label>
          </Progress>
          <Data>
            <Title>Ledger Hardware Wallet</Title>
            <Description>
              Haven users will be able to securely store XHV – and eventually
              xUSD – on Ledger hardware wallets.
            </Description>
          </Data>
        </Cell>
      </Container>
    </Wrapper>
  );
};

export default Content;
