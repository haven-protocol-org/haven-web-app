// Library Imports
import React, { useState, useEffect } from "react";

// Relative Imports
import {
  Container,
  Column,
  Title,
  Subtitle,
  Locked,
  Unlocked,
  Row,
  Pending,
  Route,
  Asset,
  Balances,
  PendingWrapper,
  PendingSpacer,
  Balance,
  Arrow,
} from "./styles";

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
  const balance = totalBalance * price;
  console.log("balance", balance);

  return (
    <>
      {lockedBalance === 0 ? (
        <Container>
          <Unlocked to={`/wallet/assets/${ticker}`}>
            <Column>
              <Row>
                <Asset>
                  <Title>{tokenName}</Title>
                </Asset>
                <Balance>{"$" + balance.toFixed(4)}</Balance>
              </Row>
              <Row>
                <Subtitle>
                  {ticker} {totalBalance}
                </Subtitle>
                <Subtitle>{"$" + price.toFixed(4)}</Subtitle>
              </Row>
            </Column>
            <Route>
              <Arrow />
            </Route>
          </Unlocked>
        </Container>
      ) : (
        <Container>
          <Locked to={`/wallet/assets/${ticker}`}>
            <Column>
              <Row>
                <Asset>
                  <Title>{tokenName}</Title>
                </Asset>
                <Balance>{"$" + balance.toFixed(4)}</Balance>
              </Row>
              <Row>
                <Subtitle>
                  {ticker} {totalBalance}
                </Subtitle>
                <Subtitle>{"$" + price.toFixed(4)}</Subtitle>
              </Row>
            </Column>
            <Route>
              <Arrow />
            </Route>
          </Locked>
          {open && (
            <PendingWrapper to={`/wallet/assets/${ticker}`}>
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
