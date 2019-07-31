// Library Imports
import React from "react";

// Relative Imports
import { Container, Button } from "./styles";
import {Spinner} from "../../spinner";

const Footer = ({ loading, onClick, label, validated }) => {
  return (
    <Container>
      <Button disabled={!validated} onClick={onClick}>
        {loading ? <Spinner color={'white'}/>: label}
      </Button>
    </Container>
  );
};

export default Footer;
