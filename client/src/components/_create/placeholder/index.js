// Library Imports
import React from "react";

// Relative Imports
import { Container, Image, Wrapper } from "./styles";
import { Information } from "../../../constants/type.js";
import vault from "../../../assets/vault.svg";

const Placeholder = () => {
  return (
    <Container>
      <Wrapper>
        <Image src={vault} />
      </Wrapper>
      <Information>
        Upon clicking <strong>"Next"</strong> your Haven Vault Seed Phrase will
        be revealed. Have a Password Manager ready, ensure you're not on public
        or unsecured wifi, and verify the domain is{" "}
        <strong>https://havenprotocol.org</strong>
      </Information>
    </Container>
  );
};

export default Placeholder;
