// Library Imports
import React from "react";

// Relative Imports
import { Container, Item } from "./styles";

const Tab = ({
  firstTabLabel,
  secondTabLabel,
  firstTabState,
  secondTabState,
  onClick,
  toggleSend,
  toggleReceive
}) => {
  return (
    <Container>
      <Item onClick={toggleSend} active={firstTabState}>
        {firstTabLabel}
      </Item>
      <Item onClick={toggleReceive} active={secondTabState}>
        {secondTabLabel}
      </Item>
    </Container>
  );
};

export default Tab;
