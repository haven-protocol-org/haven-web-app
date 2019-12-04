// Library Imports
import React from "react";

// Relative Imports
import { Container, Header, Title, Subtitle, Row, Graph } from "./styles";

const Card = ({ tokenName, ticker, price, change }) => {
  return (
    <Container to={`/wallet/assets/${ticker}`}>
      <Header>
        <Row>
          <Title left>{ticker}</Title>
          <Title>
            {price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD"
            })}
          </Title>
        </Row>
        <Row>
          <Subtitle left>{tokenName}</Subtitle>
          <Subtitle>{change}</Subtitle>
        </Row>
      </Header>
      <Graph />
    </Container>
  );
};

export default Card;
