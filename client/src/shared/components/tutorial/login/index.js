// Library Imports
import React from "react";

// Relative Imports
import { Container, List, Item, Image } from "./styles";

const LoginTutorial = ({ step }) => {
  return (
    <Container>
      {step === 0 && (
        <>
          <Image />
          <List>Same seed. New Vault.</List>
          <Item>
            For existing users, your old vault file will be incompatible with
            the current wallet. Simply resync your vault or restore a vault with
            yout seed phrase.
          </Item>
        </>
      )}
      {step === 1 && (
        <>
          <Image />
          <List>Data Requirements</List>
          <Item>
            A vault needs to sync ~2gb of data to your device. This can be a
            slow process depending on your connection speed and device.
          </Item>
        </>
      )}
      {step === 2 && (
        <>
          <Image />
          <List>Vault Persistance</List>
          <Item>
            Avoid incognito mode or clearing your browsers history as this will
            delete the vault data from your browser and require you to resync.
          </Item>
        </>
      )}
      {step === 3 && (
        <>
          <Image />
          <List>Optimal Experience</List>
          <Item>
            The best way to get started is to create a new vault and transfer
            any assets to it. This avoids any syncing delays and allows you to
            privately store, exchange and transfer assets.
          </Item>
        </>
      )}
    </Container>
  );
};

export default LoginTutorial;
