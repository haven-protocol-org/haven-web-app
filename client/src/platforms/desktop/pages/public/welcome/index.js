// Library Imports
import React, { Component } from "react";

// Relative Imports
import {
  Container,
  Microcopy,
  Page
} from "./styles";
import {MultiLoginDesktop} from "../../../components/_auth/multi_login";


export class WelcomeDesktop extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }


  render() {
    return (
      <Page>
        <Container>
          <Microcopy>
        <MultiLoginDesktop/>
          </Microcopy>
        </Container>
      </Page>
    );
  }
}
