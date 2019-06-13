// Library Imports
import React from "react";

// Relative Imports
import { Container, Cell, Description, Title } from "./styles";

const Content = ({ ref }) => {
  return (
    <>
      <Container>
        <Cell>
          <Title>What is the total Haven (XHV) supply?</Title>
          <Description>
            Haven has a maximum supply of 18,400,000 coins with a target block
            time of 120 seconds. Each block reward is 19.256 XHV and the tail
            coin-emission rate is the same as Monero. Once Offshore is
            implemented, the circulating supply will be unknown due to users
            minting and burning XHV coins.
          </Description>
        </Cell>
        <Cell>
          <Title>Was there a pre-mine or ICO for Haven?</Title>
          <Description>
            There was no ICO, however the original founders ––{" "}
            <strong>who were removed from the project</strong> –– pre-mined
            95,000 XHV coins.
          </Description>
        </Cell>
        <Cell>
          <Title>How is Haven funded?</Title>
          <Description>
            Haven is funded by a 5% governance fee. The governance fee is taken
            from block rewards and stored in the team’s multi-signature wallet.
            The wallet is visible to the community and requires 2 or more team
            members to transfer funds. The new team is committed to transparency
            and plans to use governance funds on development, marketing, legal
            and exchange listing costs.
          </Description>
        </Cell>
        <Cell>
          <Title>Are my funds private?</Title>
          <Description>
            Yes, Haven uses the same privacy features as Monero. Ring
            Signatures, Ring Confidential Transactions and Stealth Addresses are
            used to keep user wallet balances and transactions, private and
            untraceable. All balances and transactions are private by default.
            <br />
            <br />
            <strong>
              Important: Although Haven transactions are private and anonymous,
              it should not be used for illicit or illegal purposes that violate
              a user’s local or national laws.
            </strong>
          </Description>
        </Cell>
        <Cell>
          <Title>How can I get Haven?</Title>
          <Description>
            Haven is available to buy from a number of exchanges. As a PoW coin
            on the Cryptonight-Haven algorithm, Haven can also be mined. The
            current list of exchanges and mining pools are in the footer of the
            website.
          </Description>
        </Cell>
        <Cell>
          <Title>Can I send Haven to anyone I want? </Title>
          <Description>
            Yes, as long as they have a Haven vault, you can send XHV to anyone
            in the world quickly, securely and privately. You will need to know
            their Haven Vault address to do this.
          </Description>
        </Cell>
        <Cell>
          <Title>How does Haven stay stable?</Title>
          <Description>
            The premise of a non-collateralized stable coin lies in game theory
            and equilibria via zero sum games. In it's simplest form, users that
            mint and burn tokens will be correct on market direction only 50% of
            the time and as a result, gains and losses will equal out. Over a
            longer term, where markets are on a clear bull or bear run, it's
            possible that enough users will recognize the opportunity and choose
            the right path, but only a few will be able to time the ultimate
            highs and lows and over enough time, bull and bear traps will return
            the balance.
          </Description>
        </Cell>
        <Cell>
          <Title>How are prices determined?</Title>
          <Description>
            The pricing oracle is composed of OracleSrc which polls the
            exchanges to get pricing information, computes volume weighted
            average, signs the pricing record and broadcasts the pricing record.
            OracleRouter then distributes those pricing records to OracleNodes
            which miners use to add the pricing record to block headers.
          </Description>
        </Cell>
        <Cell>
          <Title>Is Haven decentralized? Who controls pricing oracle?</Title>
          <Description>
            Yes, the Haven blockchain is decentralized. OracleSrc was designed
            to allow multiple OracleSrc nodes to provide pricing records using
            the same private key. OracleRouter does not store the private keys
            so OracleRouter nodes can be operated in hundreds of instances.
            Because pricing information is so time sensitive, the design used a
            fan out pattern to reduce propagation delays while achieving
            decentralization. Because they store the private keys locally,
            OracleSrc nodes will be operated by the core team. OracleRouters can
            be operated by anyone who wants to run a node and OracleNodes need
            to be running wherever blocks are mined and created.
          </Description>
        </Cell>
      </Container>
    </>
  );
};

export default Content;
