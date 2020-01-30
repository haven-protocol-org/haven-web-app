// Library Imports
import React from "react";

// Relative Imports
import { Container, Image, Wrapper } from "./styles";
import { Information } from "../../../../assets/styles/type.js";
import vault from "../../../../assets/vault.svg";

const Placeholder = ({ platform }) => {
  return (
    <Container>
      <Wrapper>
        <Image src={vault} />
      </Wrapper>
      <Information>
        {platform === "desktop" ? (
          <div>
            Upon clicking <strong>"Continue"</strong> your Haven Vault Seed
            Phrase will be revealed. Have a Password Manager ready and ensure
            you're not on public or unsecured wifi.
          </div>
        ) : (
          <div>
            Upon clicking <strong>"Next"</strong> your Haven Vault Seed Phrase
            will be revealed. Have a Password Manager ready, ensure you're not
            on public or unsecured wifi, and verify the domain is{" "}
            <strong>https://havenprotocol.org</strong>
          </div>
        )}
      </Information>
    </Container>
  );
};

export default Placeholder;
