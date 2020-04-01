// Library Imports
import React from "react";

// Relative Imports
import { Container, Message, Checkbox, Check, Description } from "./styles";
import { Information } from "../../../assets/styles/type.js";

const Confirm = ({ checked, onChange, label, description }) => {
  return (
    <Container>
      {description && (
        <Description>
          <Information>{description}</Information>
        </Description>
      )}
      <Checkbox>
        <Message>{label}</Message>
        <Check type="checkbox" checked={checked} onChange={onChange} />
      </Checkbox>
    </Container>
  );
};

export default Confirm;
