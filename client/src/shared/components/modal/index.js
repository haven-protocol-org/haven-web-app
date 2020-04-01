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

const Modal = ({
  title,
  description,
  rightButton,
  leftButton,
  disabled,
  onClick,
  children
}) => {
  return (
    <Container>
      <Window>
        <Inner>
          <Header>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </Header>
          <Body>
            <Placeholder>{children}</Placeholder>
            <Footer>
              <Cancel onClick={onClick}>{leftButton}</Cancel>
              <Confirm disabled={disabled}>{rightButton}</Confirm>
            </Footer>
          </Body>
        </Inner>
      </Window>
    </Container>
  );
};

export default Modal;
