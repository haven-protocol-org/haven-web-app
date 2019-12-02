// Library Imports
import React from "react";

// Relative Imports
import { Container, Button } from "./styles";
import { Spinner } from "../../spinner";

const Footer = ({ loading = false, onClick, label, validated = true }) => {
  return (
    <Container>
      <Button disabled={!validated} onClick={onClick}>
        {loading ? <Spinner color={"white"} /> : label}
      </Button>
    </Container>
  );
};

export default Footer;
