// Library Imports
import React from "react";

// Relative Imports
import {
  Container,
  Cell,
  Description,
  Title,
  Heading,
  Important
} from "./styles";

const French = () => {
  return (
    <>
      <Container>
        <Heading>À quoi sert Haven ?</Heading>
        <Cell>
          <Title>Stockage de valeur</Title>
          <Description>
            N’importe qui souhaitant stocker de la valeur hors du système
            bancaire traditionnel peut le faire sans renoncer à sa vie privée et
            en gardant le contrôle. Vous êtes le seul à pouvoir accéder à votre
            argent et l’utiliser.
          </Description>
          <Title>Courtage</Title>
          <Description>
            Les traders peuvent rejoindre le réseau Haven et utiliser leur «
            Vault » (coffre-fort) comme méthode de stockage sécurisée, ou
            échanger les paires XHV/xUSD. D’autres monnaies-fiat, ainsi que le
            xBTC et d’autres commodités réputées, seront très probablement
            ajoutées à la plate-forme au cours du temps, permettant d’échanger
            une large palette de plus de 90 paires disponibles sans qu’aucune
            devise ne quitte le coffre-fort.
          </Description>
          <Title>Paiements</Title>
          <Description>
            Haven pourrait être utilisé pour des achats ayant la vie privée et
            la sécurité pour priorité. Tout ce qui ne requiert pas de règlement
            instantané pourrait potentiellement être acheté avec n’importe quel
            xActif au sein du réseau Haven, comme par exemple de l’immobilier,
            des voitures, des œuvres d’art ou des yachts.
          </Description>
        </Cell>

        <Heading>The Haven Currency</Heading>
        <Cell>
          <Description>
            Haven (XHV) is based on Monero, a privacy-oriented crypto-currency.
            It is a Proof of Work (PoW) crypto currency based on the Cryptonote
            protocol.
          </Description>
          <Title>How many XHV coins are there?</Title>
          <Description>
            As of August 2019 there around 9 million XHV in circulation with a
            maximum supply of 18.4 million. There is also a tail coin-emission
            at the same rate as Monero. Once the offshore part of the protocol
            is live, the circulating supply will fluctuate due to users minting
            and burning their funds (XHV to xUSD etc).
          </Description>
          <Title>Was Haven an ICO?</Title>
          <Description>No, there was no ICO.</Description>
          <Title>So how is it funded?</Title>
          <Description>
            Most of the team work on a voluntary basis and receive no payment
            for their input into the project. However, the developers do receive
            compensation in the form of XHV due to the large number of hours
            they give to the project. Funding comes from a 5% governance fee
            raised from the mining of XHV. It is spent on essential
            infrastructure for the project, marketing and developer costs.
          </Description>
        </Cell>
        <Heading>Privacy</Heading>
        <Cell>
          <Title>How are my funds protected?</Title>
          <Description>
            Haven uses the same privacy features as Monero, including: <br />
            <br />
            • Ring Signatures <br /> • Ring Confidential transactions (RingCT){" "}
            <br />• Stealth Addresses
          </Description>
          <Title>Are the transactions private? </Title>
          <Description>
            These features hide the sender, amount and receiver in the
            transaction. All transactions are private by default and there is no
            way to accidentally make a transparent transaction. Further
            information on the privacy features of Haven Protocol can be found
            in our whitepaper.
          </Description>
          <Title>Why does Haven need privacy? </Title>
          <Description>
            Like any other account there will be sensitive information that a
            user would not want to be available publicly. This is especially
            true for personal financial data that, if stolen, can be used by
            unscrupulous parties to potentially steal those funds. The privacy
            features of Haven makes this much less likely to happen.
          </Description>
          <Important>
            <Title>Important!</Title>
            <Description>
              Although Haven transactions are private and anonymous it should
              not be used for illicit or illegal purposes that violate a user’s
              local or national laws.
            </Description>
          </Important>
        </Cell>
        <Heading>Storing and Using Haven</Heading>
        <Cell>
          <Title>Where can I get XHV from? </Title>
          <Description>
            Haven (XHV) is available to buy from a number of exchanges or as it
            is a PoW currency it can also be mined. The current list of
            exchanges and mining pools are on our website.
          </Description>
          <Title>How do I store my money?</Title>
          <Description>
            Your funds are stored in a digital vault. You can think of this as a
            private offshore bank account that only you control. The vaults are
            available for all major operating systems including Windows, MacOS
            and Linux as well as Android and Apple mobile devices. There are
            different options according to your needs:
          </Description>
          <Title>Web Vault</Title>
          <Description>
            This is the simplest method for those using computers who do not
            wish to run their own node.
          </Description>
          <Title>GUI Vault (Graphical User Interface)</Title>
          <Description>
            This is downloaded as an app on your computer and provides a simple
            to use vault for storing XHV and all Haven xAssets.
          </Description>
          <Title>CLI Vault (Command Line Interface)</Title>
          <Description>
            This is generally used by those with a greater technical background
            and a working knowledge of the terminal on their computer.
          </Description>
          <Title>Mobile Vault</Title>
          <Description>
            This is for those who prefer the convenience of keeping their funds
            stored on a mobile device. The Web Vault is compatible with all
            mobile devices and native mobile apps will be developed in the
            future. It is also planned to be able to store your XHV on hardware
            wallets such as Ledger Nano S.
          </Description>
          <Title>I see there are different nodes, what are they?</Title>
          <Description>
            A node is basically a computer that connects you to a network. There
            are generally two different types of node that you can use to
            connect to the Haven network and each has pros and cons that will be
            explained below:
          </Description>
          <Title>Remote Node</Title>
          <Description>
            Remote node is a 3rd party computer that syncs to the network on
            your behalf. Because you don't need to download and update the chain
            every time you open the wallet, syncing and updating your balances
            take a fraction of the time vs a local node. This can be helpful if
            you have limited storage space on the device you use your wallet
            with. Choose this if you want to quickly open a wallet and for
            sending/checking balances and ONLY from trusted providers. There can
            be risks associated with using a remote node as it increases the
            chances of somebody being able to identify your IP address to trace
            transactions from your wallet address. The current list of remote
            nodes available to users will be on the web.
          </Description>
          <Title>Local Node</Title>
          <Description>
            A local node means that you are using your own computer to connect
            to the network. With a local node YOU are in control of all the data
            on the chain and there is less risk of anyone being able to see if
            you have a wallet open and from what IP. Local nodes are in your
            control so you don't have to worry about them being down when you
            want to login to your wallet and move funds around. During major
            market movements there is a possibility that high traffic volume can
            cause issues with a remote node leaving you stuck trying to find
            another one or syncing your own. This will not happen if you use a
            local node. The drawback to using a local node is that you will have
            to download and regularly sync (update) the blockchain. This can
            take some time and will use a significant amount of storage space on
            your device. It is, however, by far the most secure method of using
            Haven for longer term wealth storage and is recommended for any
            significant amounts being stored.
          </Description>
          <Title>Can I get some help using the wallets?</Title>
          <Description>
            Absolutely, there are vault user guides for all vaults on our
            website. These go through the set-up, use and recovery of vault
            addresses step by step to enable even non-technical users to be able
            to take control of their money and be sure it is secure and easily
            accessible.
          </Description>
          <Title>Is it safe?</Title>
          <Description>
            Your vaults are protected by a password (or seed phrase for Web
            Vault) that you set and must remember in order to access your funds.
            During the process of setting up the vault you will also be given a
            25 word seed phrase. Should you lose your password you can restore
            your wallet and access your funds using this combination of words.
            It is essential you keep one or more copies of the seed phrase
            somewhere safe.
          </Description>
          <Important>
            <Title>Important!</Title>
            <Description>
              You are responsible for your funds and no-one else can help you
              recover them should you lose your password and seed phrase.
            </Description>
          </Important>
          <Title>How can I ‘cash out’ to USD?</Title>
          <Description>
            You can cash out to USD or other traditional currency where
            exchanges have the facility to do so. It is planned to have xUSD etc
            available on exchanges to make this process simpler.
          </Description>
          <Title>Can I send my money to anyone I want? </Title>
          <Description>
            Yes, as long as they have a Haven vault then you can send XHV or
            xAssets to anyone in the world quickly, securely and cheaply. You
            will need to know their Haven vault address to do this.
          </Description>
        </Cell>
      </Container>
    </>
  );
};

export default French;
