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
  Separator,
  Line,
  Circle,
  Icon,
  Progress
} from "./styles";
import tick from "../../../../assets/icons/tick.svg";
import incomplete from "../../../../assets/icons/incomplete_dark.svg";

const Content = () => {
  return (
    <>
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
        <Separator>
          <Line />
          <Circle complete>
            <Icon src={tick} />
          </Circle>
          <Line />
        </Separator>
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
        <Separator>
          <Line />
          <Circle complete>
            <Icon src={tick} />
          </Circle>
          <Line />
        </Separator>
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
        <Separator>
          <Line />
          <Circle>
            <Icon src={incomplete} />
          </Circle>
          <Line />
        </Separator>
        <Cell>
          <Progress>
            <Label>Progress</Label>
          </Progress>
          <Data>
            <Title>Offshore Testnet</Title>
            <Description>
              Haven will launch a series of robust testnets to begin live
              testing of all offshore and pricing functions. The first offshore
              testnet will be launched with a smaller group of community users,
              followed by a broad public testnet. The testnet will include the
              deployment of the first planned xAsset - xUSD.
            </Description>
          </Data>
        </Cell>
        <Separator>
          <Line />
          <Circle>
            <Icon src={incomplete} />
          </Circle>
          <Line />
        </Separator>
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
    </>
  );
};

export default Content;
