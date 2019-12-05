// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Container, Microcopy, Page } from "./styles";
import { MultiCreateDesktop } from "../../_auth/multi_create";

export class CreateDesktop extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Page>
        <Container>
          <Microcopy>
            <MultiCreateDesktop />
          </Microcopy>
        </Container>
      </Page>
    );
  }
}
