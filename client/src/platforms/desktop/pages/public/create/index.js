// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Container, Microcopy, Page } from "./styles";
import { MultiLoginDesktop } from "../../_auth/multi_login/index.tsx";

export class LoginDesktop extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Page>
        <Container>
          <Microcopy>
            <MultiLoginDesktop />
          </Microcopy>
        </Container>
      </Page>
    );
  }
}
