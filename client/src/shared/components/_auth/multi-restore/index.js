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

const MultiRestore = (props) => {
  return (
    <>
      <Main>
        <Body>{props.children}</Body>
        <Buttons>
          {props.step === 1 ? (
            <Cancel to="/">Cancel</Cancel>
          ) : (
            <Back onClick={props.prevStep}>Back</Back>
          )}

          {!props.loading ? (
            <div>
              <Submit onClick={props.nextStep} disabled={props.disabled}>
                {(props.step === 1 && "Restore") ||
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
    </>
  );
};

export default MultiRestore;
