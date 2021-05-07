// Library Imports
import React from "react";

// Relative Imports
import { Container, Background, List, Item, Image } from "./styles";
import data from "../../../../assets/illustration/onboarding/data.svg";
import optimal from "../../../../assets/illustration/onboarding/optimal.svg";
import seed from "../../../../assets/illustration/onboarding/seed.svg";
import incognito from "../../../../assets/illustration/onboarding/incognito.svg";
import bitcoin from "../../../../assets/illustration/onboarding/bitcoin.svg";

const LoginTutorial = ({ step }) => {
  return (
    <Container>
      {step === 0 && (
        <Background>
          <Image src={optimal} />
          <List>Welcome to Haven</List>
          <Item>
            Haven 2.0 now includes additional private assets such as xGBP,
            xEURO, xYUAN, xAUD, xCHF, xJPY, Gold and Silver –– in addition to
            XHV & xUSD.
          </Item>
        </Background>
      )}
      {step === 1 && (
        <Background>
          <Image src={bitcoin} />
          <List>Introducing xBTC</List>
          <Item>
            xBitcoin provides exposure to Bitcoin while also increasing privacy,
            lowering fees and providing faster speeds than native Bitcoin.
          </Item>
        </Background>
      )}
      {step === 2 && (
        <Background>
          <Image src={seed} />
          <List>Resync Requirements</List>
          <Item>
            Your vault must resync to have access to these new assets and will
            begin resyncing when you login for the first time.
          </Item>
        </Background>
      )}
      {step === 3 && (
        <Background>
          <Image src={data} />
          <List>Download Requirements</List>
          <Item>
            A vault needs to sync about 2gb of data to your device. This can be
            a slow process depending on your connection speed and device.
          </Item>
        </Background>
      )}
      {step === 4 && (
        <Background>
          <Image src={incognito} />
          <List>Our Suggestions</List>
          <Item>
            Avoid using incognito mode or clearing your cache as this will force
            your browser to resync all over again.
          </Item>
        </Background>
      )}
    </Container>
  );
};

export default LoginTutorial;
