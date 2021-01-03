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
  disabledRight,
  isLoading,
  onCancel,
  onConfirm,
  disabledLeft,
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
              <Cancel onClick={onCancel} disabled={disabledLeft}>
                {leftButton}
              </Cancel>
              <Confirm onClick={onConfirm} disabled={disabledRight}>
                {isLoading ? <Spinner /> : rightButton}
              </Confirm>
            </Footer>
          </Body>
        </Inner>
      </Window>
    </Container>
  );
};
