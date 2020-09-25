// Library Imports
import React from "react";

// Relative Imports
import { Container, Wrapper } from "./styles";
import { Information } from "../../../../assets/styles/type.js";
import InputUpload from "../../_inputs/input_upload/index.js";

import demoFile from "../../../../assets/whitepapers/wp_english.png";

const VaultFile = ({ value, onClick }) => {
  return (
    <Container>
      <Wrapper>
        <InputUpload
          label="Vault File"
          placeholder="Vault file name"
          value={demoFile}
          button="Save"
          action="download"
        />
      </Wrapper>
      <Information>
        This is your Vault File and it contains your private keys, seed phrase,
        assets and is encrypted with your password. Using this Vault File to
        login is safer and also prevents you from having to resync your vault
        each time you login. Click the Save button and store it on your device.
      </Information>
    </Container>
  );
};

export default VaultFile;
