// Library Imports
import React, { Component } from "react";

// Relative Imports
import {
  Title,
  Description as Subtitle,
  Information
} from "../../../../assets/styles/type.js";
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
  Tab
} from "./styles";
import { Spinner } from "../../spinner";
import Input from "../../_inputs/input";
import InputButton from "../../_inputs/input_button";
import Description from "../../_inputs/description";

export class MultiLogin extends Component {
  state = {
    disabled: true,
    loading: false,
    seed: true,
    ledger: false,
    keystore: false,
    error: ""
  };

  submitLogin = () => {
    alert("Login");
  };

  selectFile = () => {
    alert("Upload");
  };

  selectSeed = () => {
    this.setState({
      seed: true,
      ledger: false,
      keystore: false
    });
  };

  selectLedger = () => {
    this.setState({
      seed: false,
      ledger: true,
      keystore: false
    });
  };

  selectKeystore = () => {
    this.setState({
      seed: false,
      ledger: false,
      keystore: true
    });
  };

  render() {
    const { seed, ledger, keystore } = this.state;
    return (
      <Container>
        <Header>
          <Title>Vault Login</Title>
          <Subtitle>
            To access your Vault please enter your preferred login option
          </Subtitle>
        </Header>
        <Tabs>
          <Tab active={keystore} onClick={this.selectKeystore}>
            Open Wallet
          </Tab>
          <Tab active={seed} onClick={this.selectSeed}>
            Create Wallet
          </Tab>
          <Tab active={ledger} onClick={this.selectLedger}>
            Restore Wallet
          </Tab>
        </Tabs>
        <Main>
          <Body>
            {seed && (
              <>
                <Description
                  label="Seed Phrase or Private Spend Key"
                  placeholder="Enter your 25 word seed phrase or Private Spend Key..."
                  name=""
                  value={""}
                  onChange={event => this.handleChange(event)}
                />
                <Information>
                  Before entering your Seed Phrase please ensure you're not on a
                  public wifi and no one is looking at your screen.
                </Information>
              </>
            )}
            {ledger && (
              <>
                <Description
                  label="Ledger Signature"
                  placeholder="Open the Ledger application and sign in"
                  name=""
                  value={""}
                  onChange={event => this.handleChange(event)}
                />
                <Information>
                  We recommend you login with a Ledger device as it's the most
                  secure method possible for securing your funds.
                </Information>
              </>
            )}
            {keystore && (
              <>
                <InputButton
                  label="Keystore File"
                  placeholder="Click upload and select file"
                  name=""
                  button="upload"
                  rows="2"
                  value={""}
                  onClick={this.selectFile}
                  onChange={event => this.handleChange(event)}
                />
                <Input
                  label="Keystore Password"
                  placeholder="Enter the password for your keystore"
                  name=""
                  value={""}
                  onChange={event => this.handleChange(event)}
                />
                <Information>
                  Upload your encrypted Keystore File and enter the password
                  associated with it to unlock and access your funds.
                </Information>
              </>
            )}
          </Body>

          <Buttons>
            <Cancel to="/">Cancel</Cancel>
            <Submit disabled={this.state.disabled} onClick={this.submitLogin}>
              {this.state.loading ? <Spinner color={"white"} /> : "Login"}
            </Submit>
          </Buttons>
        </Main>
        <Footer>
          <Label>Don't have a Vault?</Label>
          <Route to={"/create"}>Create a Vault</Route>
        </Footer>
      </Container>
    );
  }
}
