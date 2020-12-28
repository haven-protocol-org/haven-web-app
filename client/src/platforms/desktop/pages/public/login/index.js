// Library Imports
import React, { Component } from "react";
import { withTheme } from "styled-components";

// Relative Imports
import { Container, Microcopy, Page } from "./styles";
import { MultiLoginDesktop } from "../../_auth/multi_login/index.tsx";

class LoginDesktop extends Component {
  render() {
    return (
      <Page>
        <Container theme={this.props.theme.name}>
          <Microcopy>
            <MultiLoginDesktop />
          </Microcopy>
        </Container>
      </Page>
    );
  }
}

export default withTheme(LoginDesktop);
