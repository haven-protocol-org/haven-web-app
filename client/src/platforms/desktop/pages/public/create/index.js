// Library Imports
import React, { Component } from "react";
import { withTheme } from "styled-components";

// Relative Imports
import { Container, Microcopy, Page } from "./styles";
import { MultiCreateDesktop } from "../../_auth/multi_create";

class CreateDesktop extends Component {
  render() {
    return (
      <Page>
        <Container theme={this.props.theme.name}>
          <Microcopy>
            <MultiCreateDesktop />
          </Microcopy>
        </Container>
      </Page>
    );
  }
}

export default withTheme(CreateDesktop);
