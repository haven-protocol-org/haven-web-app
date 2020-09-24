// Library Imports
import React from "react";

// Relative Imports
import { Title, Description } from "../../../../assets/styles/type.js";
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
  Label,
  Tabs,
  Tab,
} from "./styles";
import { Spinner } from "../../spinner";

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
  disable,
  active,
  selectSeed,
  selectedSeed,
  selectKeystore,
  selectedKeystore,
}) => {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Header>
      <Tabs>
        <Tab active={selectedSeed} onClick={selectSeed}>
          Seed Phrase
        </Tab>
        <Tab active={!selectedSeed} onClick={selectKeystore}>
          Keystore File
        </Tab>
      </Tabs>
      <Main>
        <Body>{children}</Body>
        <Buttons>
          <Cancel to="/">Cancel</Cancel>
          <Submit disabled={disable} onClick={onClick}>
            {loading ? <Spinner color={"white"} /> : "Login"}
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
