// Library Imports
import React from "react";

// Relative Imports
import { Container } from "./styles";

const Link = ({ onClick, label }) => {
  return <Container onClick={onClick}>{label}</Container>;
};

export default Link;
