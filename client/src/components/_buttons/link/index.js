// Library Imports
import React from "react";

// Relative Imports
import { Container } from "./styles";

const Link = ({ label, to }) => {
  return <Container to={to}>{label}</Container>;
};

export default Link;
