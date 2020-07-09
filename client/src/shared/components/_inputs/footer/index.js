// Library Imports
import React from "react";

// Relative Imports
import { Container, Button } from "./styles";
import { Spinner } from "../../spinner";

const Footer = ({ loading, onClick, label, disabled }) => {
  return (
    <Container>
      <Button disabled={disabled} onClick={onClick}>
        {loading ? <Spinner color={"white"} /> : label}
      </Button>
    </Container>
  );
};

export default Footer;
