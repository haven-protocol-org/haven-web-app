// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Container } from "./styles";

const LoadMore = ({ onClick, label }) => {
  return <Container onClick={onClick}>{label}</Container>;
};

export default LoadMore;
