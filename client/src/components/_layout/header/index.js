// Library Imports
import React from "react";

// Relative Imports
import { Container, Back, Row } from "./styles";
import { Title, Description } from "../../../constants/type.js";

const Header = ({ title, description, back }) => {
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
