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

export const Modal = ({
  title,
  description,
  rightButton,
  leftButton,
  disabled,
  onCancel,
    onConfirm,
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
              <Cancel onClick={onCancel}>{leftButton}</Cancel>
              <Confirm onClick={onConfirm} disabled={disabled}>{rightButton}</Confirm>
            </Footer>
          </Body>
        </Inner>
      </Window>
    </Container>
  );
};
