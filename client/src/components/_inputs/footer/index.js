// Library Imports
import React from "react";

// Relative Imports
import { Container, Button } from "./styles";

const Footer = ({ loading, onClick, label, validated }) => {
  return (
    <Container>
      <Button disabled={!validated} onClick={onClick}>
        {loading ? "Loading..." : label}
      </Button>
    </Container>
  );
};

export default Footer;
