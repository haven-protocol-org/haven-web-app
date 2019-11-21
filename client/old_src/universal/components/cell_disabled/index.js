// Library Imports
import React from "react";

// Relative Imports
import {
  Container,
  Column,
  Title,
  Subtitle,
  Icon,
  Inner,
  Wrapper
} from "./styles";
import chevron from "../../../assets/icons/chevron.svg";

const CellDisabled = ({ tokenName, ticker, price, change, fullwidth }) => {
  return (
    <Container fullwidth={fullwidth}>
      <Column>
        <Title>{tokenName}</Title>
        <Subtitle left>{price}</Subtitle>
      </Column>
      <Wrapper>
        <Column>
          <Title>{ticker}</Title>
          <Subtitle>{change}</Subtitle>
        </Column>
        <Inner>
          <Icon src={chevron} />
        </Inner>
      </Wrapper>
    </Container>
  );
};

export default CellDisabled;
