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
  firstTabClickEvent,
  secondTabClickEvent
}) => {
  return (
    <Container>
      <Item onClick={firstTabClickEvent} active={firstTabState}>
        {firstTabLabel}
      </Item>
      <Item onClick={secondTabClickEvent} active={secondTabState}>
        {secondTabLabel}
      </Item>
    </Container>
  );
};

export default Tab;
