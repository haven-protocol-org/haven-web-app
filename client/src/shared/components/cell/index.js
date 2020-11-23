// Library Imports
import React, { useState } from "react";

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
  ShortRow,
} from "./styles";
import Dots from "../_animations/dots/index.js";

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
                <Balance>
                  {price === 0 ? (
                    <ShortRow>
                      $ <Dots />
                    </ShortRow>
                  ) : (
                    `${"$" + balance.toFixed(2)}`
                  )}
                </Balance>
              </Row>
              <Row>
                <Subtitle>
                  {ticker} {totalBalance === 0 ? "0.00" : totalBalance}
                </Subtitle>
                <Subtitle>
                  {price === 0 ? (
                    <Row>
                      $ <Dots />
                    </Row>
                  ) : (
                    `${"$" + price.toFixed(2)}`
                  )}
                </Subtitle>
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
                <Balance>{"$" + balance.toFixed(2)}</Balance>
              </Row>
              <Row>
                <Subtitle>
                  {ticker} {totalBalance}
                </Subtitle>
                <Subtitle>{"$" + price.toFixed(2)}</Subtitle>
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
                <Subtitle>{lockedBalance.toFixed(2)}</Subtitle>
              </Pending>
              <Pending>
                <Subtitle>Unlocked Balance</Subtitle>
                <Subtitle>{unlockedBalance.toFixed(2)}</Subtitle>
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
