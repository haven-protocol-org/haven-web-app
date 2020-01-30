import React from "react";
import { Progress, Container } from "./styles";

export const SyncBar = ({ max = 0, value = 0 }) => {
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
