// NOTE: NOT CURRENTLY IN USE

// Library Imports
import React, { Component, Fragment } from "react";

// Relative Imports
import { Container, Header, Cell, Heading, Row, Label, Column } from "./styles";
import data from "../../../constants/assets.js";

class Table extends Component {
  state = {
    tokens: data
  };

  renderCells = () => {
    const { tokens } = this.state;
    return tokens.map(data => {
      const { ticker, token, price, change } = data;
      return (
        <Cell>
          <Row>
            <Column>
              <Heading>{ticker}</Heading>
              <Label>{token}</Label>
            </Column>
            <Column>
              <Heading right>{price}</Heading>
              <Label right>{change}</Label>
            </Column>
          </Row>
        </Cell>
      );
    });
  };

  render() {
    return (
      <Container>
        <Header>HAVEN ASSETS</Header>
        {this.renderCells()}
      </Container>
    );
  }
}

export default Table;
