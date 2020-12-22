// Library Imports
import React from "react";

// Relative Imports
import { Container, Image, Wrapper } from "./styles";
import { Information } from "../../../../assets/styles/type.js";
import vault from "../../../../assets/icons/vault.svg";

const Placeholder = ({ platform }) => {
  return (
    <Container>
      <Wrapper>
        <Image src={vault} />
      </Wrapper>
      <Information>
        {platform === "desktop" ? (
          <div>
            Before clicking <strong>"Continue"</strong> please have a pen and
            pad, or trusted password manager ready. Also ensure you're not using
            a public or unsecured wifi.
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
