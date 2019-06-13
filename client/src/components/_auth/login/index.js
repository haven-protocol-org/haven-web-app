// Library Imports
import React from "react";

// Relative Imports
import { Title, Description } from "../../../constants/type.js";
import {
  Container,
  Main,
  Header,
  Buttons,
  Submit,
  Footer,
  Cancel,
  Body,
  Route,
  Label
} from "./styles";

const Auth = ({
  title,
  description,
  children,
  route,
  onClick,
  link,
  label,
  information,
  submit,
  cancel,
  step,
  width,
  loading,
  disable
}) => {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Header>
      <Main>
        <Body>{children}</Body>
        <Buttons>
          <Cancel to="/">Cancel</Cancel>
          <Submit disabled={disable} onClick={onClick}>
            {loading ? "Unlocking..." : "Login"}
          </Submit>
        </Buttons>
      </Main>
      <Footer>
        <Label>{label}</Label>
        <Route to={link}>{route}</Route>
      </Footer>
    </Container>
  );
};

export default Auth;
