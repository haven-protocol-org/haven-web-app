// Library Imports
import React from "react";

// Relative Imports
import { Container, Tabs, Item } from "./styles";

const Tab = ({ basicActive, basicSelect, advancedSelect, advancedActive }) => {
  return (
    <Container>
      <Tabs>
        <Item onClick={basicSelect} active={basicActive}>
          Basic
        </Item>
        <Item onClick={advancedSelect} active={advancedActive}>
          Advanced
        </Item>
      </Tabs>
    </Container>
  );
};

export default Tab;
