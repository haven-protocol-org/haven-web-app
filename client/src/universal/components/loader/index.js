import React from "react";
import { Container, Icon, Title } from "./styles";
import haven from "../../../assets/loading/rounded.svg";

const Loader = () => {
  return (
    <Container>
      <Icon src={haven} />
      <Title>Haven is loading...</Title>
    </Container>
  );
};

export default Loader;
