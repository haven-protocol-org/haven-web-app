// Library Imports
import React, { Component } from "react";

// Relative Imports
import {
  Container,
  SubContainer,
  SubDescription,
  Title,
  Header,
  Tabs,
  Tab,
} from "./styles";
import { RestoreWebComponent } from "./restore/restore";
import { CreateWalletWebComponent } from "./create/create";

interface CreateWebState {
  selectedCreate: boolean;
  selectedRestore: boolean;
  animate: boolean;
}

export class CreateWebComponent extends Component<any, CreateWebState> {
  state = {
    selectedCreate: true,
    selectedRestore: false,
    animate: true,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  selectCreate = () => {
    this.setState({
      selectedCreate: true,
      selectedRestore: false,
    });
  };

  selectRestore = () => {
    this.setState({
      selectedCreate: false,
      selectedRestore: true,
    });
  };

  render() {
    return (
      <Container>
        <SubContainer>
          <Header>
            <Title>
              {this.state.selectedCreate ? "Create a Vault" : "Restore a Vault"}
            </Title>
            <SubDescription>
              {"Privately store, exchange and transfer assets"}
            </SubDescription>
          </Header>
          <Tabs>
            <Tab active={this.state.selectedCreate} onClick={this.selectCreate}>
              Create
            </Tab>
            <Tab
              active={this.state.selectedRestore}
              onClick={this.selectRestore}
            >
              Restore
            </Tab>
          </Tabs>

          {this.state.selectedCreate ? (
            <CreateWalletWebComponent />
          ) : (
            <RestoreWebComponent />
          )}
        </SubContainer>
      </Container>
    );
  }
}
