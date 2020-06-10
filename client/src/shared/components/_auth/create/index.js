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
  Progress,
  Step,
  Back,
  Title,
  Description,
} from "./styles";
import { Spinner } from "../../spinner";

const Create = ({
  title,
  description,
  route,
  link,
  label,
  information,
  submit,
  cancel,
  step,
  width,
  disabled,
  nextStep,
  prevStep,
  children,
  loading,
}) => {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Header>
      <Main>
        <Body>
          <Progress>
            <Step width={step} />
          </Progress>
          {children}
        </Body>
        <Buttons>
          {step === 1 ? (
            <Cancel to="/">Cancel</Cancel>
          ) : (
            <Back onClick={prevStep}>Back</Back>
          )}
          {!loading ? (
            <div>
              <Submit onClick={nextStep} disabled={disabled}>
                {(step === 1 && "Next") ||
                  (step === 2 && "Verify") ||
                  (step === 3 && "Confirm")}
              </Submit>
            </div>
          ) : (
            <Submit disabled={true} onClick={nextStep}>
              <Spinner color={"white"} />
            </Submit>
          )}
        </Buttons>
      </Main>
      <Footer>
        <Label>{label}</Label>
        <Route to={link}>{route}</Route>
      </Footer>
    </Container>
  );
};

export default Create;
