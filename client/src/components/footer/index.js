// Library Imports
import React from "react";

// Relative Imports
import { Container, Title, Internal, External, Section } from "./styles";

const Footer = () => {
  return (
    <Container>
      <Section>
        <Title>Mining Pools</Title>
        <External
          rel="noopener"
          href="http://cryptoknight.cc/haven/"
          target="_blank"
        >
          Fair Pool
        </External>
        <External
          rel="noopener"
          href="https://xhv.dark-mine.su/"
          target="_blank"
        >
          Dark Mine
        </External>
        <External
          rel="noopener"
          href="https://haven.herominers.com/"
          target="_blank"
        >
          Hero Miners
        </External>
        <External
          rel="noopener"
          href="http://pool.haven.frackingminer.com/"
          target="_blank"
        >
          Fracking Miner
        </External>
      </Section>
      <Section>
        <Title>Social</Title>
        <External
          rel="noopener"
          href="https://discordapp.com/invite/CCtNxfG"
          target="_blank"
        >
          Discord
        </External>
        <External
          rel="noopener"
          href="https://medium.com/@havencurrency"
          target="_blank"
        >
          Medium
        </External>
        <External
          rel="noopener"
          href="https://twitter.com/HavenXHV"
          target="_blank"
        >
          Twitter
        </External>
        <External
          rel="noopener"
          href="https://www.reddit.com/r/havenprotocol/"
          target="_blank"
        >
          Reddit
        </External>
        <External
          rel="noopener"
          href="https://github.com/haven-protocol-org"
          target="_blank"
        >
          Github
        </External>
        <External
          rel="noopener"
          href="https://web.telegram.org/#/im?p=s1273047334_13986713956461503950"
          target="_blank"
        >
          Telegram
        </External>
      </Section>
      <Section>
        <Title>Products</Title>
        <External
          rel="noopener"
          href="https://github.com/haven-protocol-org/haven/releases/download/v0.14.1-release/haven-macos-4.0.0-gui.zip"
        >
          Mac Wallet
        </External>
        <External
          rel="noopener"
          href="https://github.com/haven-protocol-org/haven/releases/download/v0.14.1-release/haven-win-x64-4.0.0-gui.zip"
        >
          Windows Wallet
        </External>
        <External
          rel="noopener"
          href="https://github.com/haven-protocol-org/haven-protocol/releases/tag/v0.14.1.2a"
        >
          Linux Wallet
        </External>
        <External
          rel="noopener"
          href="https://github.com/haven-protocol-org/haven/releases/download/v0.14.1-release/haven-macos-v0.14.1-cli.zip"
        >
          Mac CLI
        </External>
        <External
          rel="noopener"
          href="https://github.com/haven-protocol-org/haven/releases/download/v0.14.1-release/haven-win-x64-v0.14.1-cli.zip"
        >
          Windows CLI
        </External>

        <External
          rel="noopener"
          href="https://explorer.havenprotocol.org/"
          target="_blank"
        >
          Block Explorer
        </External>
        <Internal to="/create">Web Wallet</Internal>
      </Section>

      <Section>
        <Title>Exchanges</Title>
        <External
          rel="noopener"
          href="https://bittrex.com/Market/Index?MarketName=BTC-XHV"
          target="_blank"
        >
          Bittrex
        </External>
        <External
          rel="noopener"
          href="https://www.tokok.com/market?symbol=XHV_BTC"
          target="_blank"
        >
          Tokok
        </External>
        <External
          rel="noopener"
          href="https://tradeogre.com/exchange/BTC-XHV"
          target="_blank"
        >
          Trade Ogre
        </External>
        <External
          rel="noopener"
          href="https://zel.network/project/zelcore/"
          target="_blank"
        >
          Zelcore
        </External>
      </Section>
      <Section>
        <Title>About </Title>
        <Internal to="/team">Team</Internal>
        <Internal to="/blog">Blog</Internal>
        <Internal to="/faq">F.A.Q</Internal>
        <Internal to="/timeline">Timeline</Internal>
        <Internal to="/whitepaper">White Papers</Internal>
        <External
          rel="noopener"
          href="https://github.com/haven-protocol-org/brand-assets"
          target="_blank"
        >
          Media Kit
        </External>
      </Section>
    </Container>
  );
};

export default Footer;
