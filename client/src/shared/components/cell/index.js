// Library Imports
import React, { useState } from "react";

// Relative Imports
import {
  Container,
  Column,
  Title,
  Subtitle,
  Icon,
  Inner,
  Wrapper,
  Ticker,
  Row,
  Status,
  Pending,
  Card,
  Space,
  Route,
  Balances,
  PendingWrapper,
  PendingSpacer,
} from "./styles";
import chevron from "../../../assets/icons/chevron.svg";

const Cell = ({
  tokenName,
  ticker,
  price,
  value,
  fullwidth,
  totalBalance,
  lockedBalance,
  unlockedBalance,
}) => {
  const [open, openBalance] = useState(false);
  return (
    <>
      {lockedBalance === 0 ? (
        <Container>
          <Wrapper
            lockedBalance={lockedBalance}
            to={`/wallet/assets/${ticker}`}
          >
            <Column>
              <Row>
                <Title>{tokenName}</Title>
                <Title>{price}</Title>
              </Row>
              <Row>
                <Subtitle>{value}</Subtitle>
                <Subtitle>{totalBalance}</Subtitle>
              </Row>
            </Column>
            <Route>
              <Icon src={chevron} />
            </Route>
          </Wrapper>
        </Container>
      ) : (
        <Container>
          <Wrapper to={`/wallet/assets/${ticker}`}>
            <Column>
              <Row>
                <Title>
                  {tokenName} {ticker}
                </Title>
                <Title>{price}</Title>
              </Row>
              <Row>
                <Subtitle>${value}</Subtitle>
                <Subtitle>{totalBalance}</Subtitle>
              </Row>
            </Column>
            <Route>
              <Icon src={chevron} />
            </Route>
          </Wrapper>
          {open && (
            <PendingWrapper>
              <PendingSpacer />
              <Pending>
                <Subtitle>Total Balance</Subtitle>
                <Subtitle>{totalBalance}</Subtitle>
              </Pending>
              <Pending>
                <Subtitle>Locked Balance</Subtitle>
                <Subtitle>{lockedBalance}</Subtitle>
              </Pending>
              <Pending>
                <Subtitle>Unlocked Balance</Subtitle>
                <Subtitle>{unlockedBalance}</Subtitle>
              </Pending>

              <PendingSpacer />
            </PendingWrapper>
          )}
          <Balances onClick={() => openBalance(!open)}>
            <Row>
              <Subtitle>
                {open ? "Hide Pending Balances" : "Show Pending Balances"}
              </Subtitle>
            </Row>
          </Balances>
        </Container>
      )}
    </>
  );
};

export default Cell;
