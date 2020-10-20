// Library Imports
import React from "react";

// Relative Imports
import { Container, Message, Row } from "./styles";
import Radio from "../_inputs/radio/index.js";

const Checkbox = ({ checked, onChange, label }) => {
  return (
    <Container>
      <Row>
        <Message>{label}</Message>
        <Radio type="checkbox" checked={checked} onChange={onChange} />
      </Row>
    </Container>
  );
};

export default Checkbox;
