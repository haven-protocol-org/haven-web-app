import { RotateDiv } from "./styles";
import React from "react";
import { Progress, Container } from "./styles";

export const SyncBar = ({ max, value }) => {
  return (
    <Container>
      <Progress
        style={{ background: "#fff", appearance: "none" }}
        max={max}
        value={value}
      />
    </Container>
  );
};

export default SyncBar;
