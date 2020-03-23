// Library Imports
import React from "react";

// Relative Imports
import {
  Container,
  Window,
  Body,
  Footer,
  Confirm,
  Cancel,
  Header
} from "./styles";
import { Title, Description } from "../../../assets/styles/type.js";

const Modal = ({ name, onClick, children }) => {
  return (
    <Container>
      <Window>
        <Header>
          <Title>Confirm Exhanges</Title>
          <Description>Confirm the details of your exchange</Description>
        </Header>
        <Body>
          {children}
          <Footer>
            <Cancel onClick={onClick}>Cancel</Cancel>
            <Confirm>Confirm</Confirm>
          </Footer>
        </Body>
      </Window>
    </Container>
  );
};

export default Modal;
