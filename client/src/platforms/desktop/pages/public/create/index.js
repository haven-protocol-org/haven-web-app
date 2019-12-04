// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Container, Microcopy, Page } from "./styles";
import { CreateDesktop as Create } from "../../_auth/create/index.tsx";

export class CreateDesktop extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Page>
        <Container>
          <Microcopy>
            <Create />
          </Microcopy>
        </Container>
      </Page>
    );
  }
}
