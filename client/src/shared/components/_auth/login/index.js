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

const Auth = ({ ...props }) => {
  return (
    <Container>
      <Header>
        <Title>{props.title}</Title>
        <Description>{props.description}</Description>
      </Header>
      {!props.hideTabs ? (
        <Tabs>
          <Tab active={!props.selectedSeed} onClick={props.selectKeystore}>
            Vault File
          </Tab>
          <Tab active={props.selectedSeed} onClick={props.selectSeed}>
            Seed Phrase
          </Tab>
        </Tabs>
      ) : null}
      <Main>
        <Body>{props.children}</Body>
        <Buttons>
          <Cancel to="/">Cancel</Cancel>
          <Submit disabled={props.disable} onClick={props.onClick}>
            {props.loading ? <Spinner color={"white"} /> : "Login"}
          </Submit>
        </Buttons>
      </Main>
      <Footer>
        <Label>{props.label}</Label>
        <Route to={props.link}>{props.route}</Route>
      </Footer>
    </Container>
  );
};

export default Auth;
