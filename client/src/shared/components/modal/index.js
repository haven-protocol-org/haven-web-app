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
  Header,
  Placeholder,
  Inner
} from "./styles";
import { Title, Description } from "../../../assets/styles/type.js";

const Modal = ({ name, onClick, children }) => {
  return (
    <Container>
      <Window>
        <Inner>
          <Header>
            <Title>Confirm Exhanges</Title>
            <Description>Confirm the details of your exchange</Description>
          </Header>
          <Body>
            <Placeholder>{children}</Placeholder>
            <Footer>
              <Cancel onClick={onClick}>Cancel</Cancel>
              <Confirm>Confirm</Confirm>
            </Footer>
          </Body>
        </Inner>
      </Window>
    </Container>
  );
};

export default Modal;
