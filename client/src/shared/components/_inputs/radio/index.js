// Library Imports
import React from "react";

// Relative Imports
import { Container, Wrapper, Tick, Hidden, Displayed } from "./styles";

const Radio = ({ className, checked, ...props }) => (
  <Container>
    <Wrapper>
      <Hidden checked={checked} {...props} />
      <Displayed checked={checked}>
        <Tick viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Tick>
      </Displayed>
    </Wrapper>
  </Container>
);

export default Radio;
