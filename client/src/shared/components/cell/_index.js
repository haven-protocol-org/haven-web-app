// Library Imports
import React from "react";

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
  const bal = 1;
  return (
    <Container fullwidth={fullwidth} to={`/wallet/assets/${ticker}`}>
      <Space>
        <Column>
          <Row>
            <Title left>{tokenName}</Title>
            <Ticker left>{ticker}</Ticker>
          </Row>
          <Subtitle left>{totalBalance}</Subtitle>
        </Column>
        <Wrapper>
          <Column>
            <Title>{price}</Title>
            <Subtitle>{value}</Subtitle>
          </Column>
          <Inner>
            <Icon src={chevron} />
          </Inner>
        </Wrapper>
      </Space>
      <Column>
        {bal !== 0 && (
          <Pending>
            <Space>
              <Column>
                <Space>
                  <Status left>{`Total balance is`}</Status>
                  <Status left>{totalBalance}</Status>
                </Space>
                <Status left>{`Locked balance is ${lockedBalance} `}</Status>
                <Status
                  left
                >{`Unlocked balance is ${unlockedBalance} `}</Status>
              </Column>
              <Inner>
                <Icon src={chevron} />
              </Inner>
            </Space>
          </Pending>
        )}
      </Column>
    </Container>
  );
};

export default Cell;
