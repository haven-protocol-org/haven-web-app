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
        You're about to create a Vault for your assets. Before Generating a seed
        please ensure you're not on a public wifi and have a pen or password
        manager ready.
      </Information>
    </Container>
  );
};

export default Placeholder;
