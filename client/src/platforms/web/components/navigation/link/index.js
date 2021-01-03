// Library Imports
import React from "react";

// Relative Imports
import { Container, Url } from "./styles";
import { Body, Label } from "../../../../../assets/styles/type.js";

const Link = ({ body, label, url }) => {
  return (
    <Container>
      <Body>{body}</Body>
      <Url target="_blank" href={url}>
        <Label>{label}</Label>
      </Url>
    </Container>
  );
};

export default Link;
