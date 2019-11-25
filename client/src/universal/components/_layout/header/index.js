// Library Imports
import React from "react";

// Relative Imports
import { Container, Back, Row } from "./styles";
import { Title, Description } from "../../../../assets/styles/type.js";

const Header = ({ title, description, back = false }) => {
  return (
    <Container>
      <Row>
        {back && <Back to="/wallet/assets">« Back</Back>}
        <Title>{title}</Title>
      </Row>
      <Description>{description}</Description>
    </Container>
  );
};

export default Header;
