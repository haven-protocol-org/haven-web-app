// Library Imports
import React from "react";

// Relative Imports
import { Container, Message, Checkbox, Check } from "./styles";

const Confirm = ({ props, checked, onChange, label }) => {
  return (
    <Container>
      <Message>{label}</Message>
      <Checkbox>
        <Check type="checkbox" checked={checked} onChange={onChange} />
      </Checkbox>
    </Container>
  );
};

export default Confirm;
