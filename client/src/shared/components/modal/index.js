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
  Details,
  Inner,
} from "./styles";

import { Title, Description } from "../../../assets/styles/type.js";
import { Spinner } from "../spinner/index.js";

export const Modal = ({
  title,
  description,
  leftButton,
  rightButton,
  disabled,
  isLoading,
  onCancel,
  onConfirm,
  children,
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
            <Details>
              <Placeholder>{children}</Placeholder>
            </Details>
            <Footer>
              <Cancel onClick={onCancel}>{leftButton}</Cancel>
              <Confirm onClick={onConfirm} disabled={disabled}>
                {isLoading ? <Spinner /> : rightButton}
              </Confirm>
            </Footer>
          </Body>
        </Inner>
      </Window>
    </Container>
  );
};
