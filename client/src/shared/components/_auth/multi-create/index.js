// Library Imports
import React from "react";

// Relative Imports
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
  Back,
  Title,
  Description,
  Tabs,
  Tab,
} from "./styles";
import { Spinner } from "../../spinner";

const MultiCreate = (props) => {
  return (
    <Container>
      <Header>
        <Title>{props.title} </Title>
        <Description>{props.description}</Description>
      </Header>
      <Tabs>
        <Tab active={props.selectedCreate} onClick={props.selectCreate}>
          Create
        </Tab>
        <Tab active={props.selectedRestore} onClick={props.selectRestore}>
          Restore
        </Tab>
      </Tabs>
      <Main>
        <Body>{props.children}</Body>
        <Buttons>
          {props.step === 1 ? (
            <Cancel to="/">Cancel</Cancel>
          ) : (
            <Back onClick={props.prevStep}>Back</Back>
          )}
          {!props.loading && props.selectedCreate ? (
            <div>
              <Submit onClick={props.nextStep} disabled={props.disabled}>
                {(props.step === 1 && "Create") ||
                  (props.step === 2 && "Next") ||
                  (props.step === 3 && "Next") ||
                  (props.step === 4 && "Submit")}
              </Submit>
            </div>
          ) : (
            <Submit disabled={true} onClick={props.nextStep}>
              <Spinner color={"white"} />
            </Submit>
          )}
        </Buttons>
      </Main>
      <Footer>
        <Label>{props.label}</Label>
        <Route to={props.link}>{props.route}</Route>
      </Footer>
    </Container>
  );
};

export default MultiCreate;
