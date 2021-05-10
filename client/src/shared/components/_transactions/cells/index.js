// Library Imports
import React from "react";

// Relative Imports
import { Row, Key, Value } from "./styles";

const Cell = ({ left, right }) => {
  return (
    <Row>
      <Key>{left}</Key>
      <Value>{right}</Value>
    </Row>
  );
};

export default Cell;
