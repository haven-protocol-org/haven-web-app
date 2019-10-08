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
          href="https://xhv.luckypool.io/"
          target="_blank"
        >
          Lucky Pool
        </External>
        <External
          rel="noopener"
          href="https://xhv.solopool.org/"
          target="_blank"
        >
          Solo Pool
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
        <External
          rel="noopener"
          href="http://pool.mineallcrypto.com/pool/?symbol=XHV"
          target="_blank"
        >
          Mine All Crypto
        </External>
      </Section>
      <Section>
        <Title>Social</Title>
        <External
          rel="noopener"
          href="https://discordapp.com/invite/vWQ2GZX"
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
          href="https://twitter.com/HavenProtocol_"
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
          href="https://github.com/haven-protocol-org/haven-legacy/releases/download/3.2.2/haven-macOS-gui-3.2.2.zip"
        >
          Mac Wallet
        </External>
        <External
          rel="noopener"
          href="https://github.com/haven-protocol-org/haven-legacy/releases/download/3.2.2/haven-windows-gui-3.2.2b.zip"
        >
          Windows Wallet
        </External>
        <External
          rel="noopener"
          href="https://github.com/haven-protocol-org/haven-legacy/releases/download/3.2.2/haven-linux-x64-3.2.2-cli.tar.gz"
        >
          Linux Wallet
        </External>
        <External
          rel="noopener"
          href="https://github.com/haven-protocol-org/haven-legacy/releases"
        >
          CLI Wallet
        </External>
        <External
          rel="noopener"
          href="https://explorer-test.havenprotocol.org/"
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
          href="https://upbit.com/exchange?code=CRIX.UPBIT.BTC-XHV"
          target="_blank"
        >
          Upbit
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

        <External
          rel="noopener"
          href="http://docs.havenprotocol.org/haven-protocol-wp-2_0.pdf"
          target="_blank"
        >
          Whitepaper
        </External>
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
