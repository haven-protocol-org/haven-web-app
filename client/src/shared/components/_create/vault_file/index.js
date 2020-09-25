// Library Imports
import React from "react";

// Relative Imports
import { Container, Wrapper } from "./styles";
import { Information } from "../../../../assets/styles/type.js";
import InputUpload from "../../_inputs/input_button/index.js";

const VaultFile = ({ value, onClick }) => {
  return (
    <Container>
      <Wrapper>
        <InputUpload
          label="File Vault"
          placeholder="Vault file name"
          value={value}
          button="Save"
          onClick={onClick}
        />
      </Wrapper>
      <Information>
        This is your Vault File and it contains your private keys, seed phrase,
        assets and is encrypted with your password. Using this Vault File to
        login is safer and also prevents you from having to resync you vault
        each time you login. Click the Save button and store it on your device.
      </Information>
    </Container>
  );
};

export default VaultFile;
