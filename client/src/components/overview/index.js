// Library Imports
import React from "react";

// Relative Imports
import { Container, Amount, Value, Wrapper, Pending } from "./styles";
import { NO_BALANCE } from "../../reducers/balance";
import { convertBalanceForReading } from "../../utility";
import { Spinner } from "../spinner/index.js";

const Overview = ({ balance, unlocked_balance, blocks_to_unlock }) => {
  return (
    <Container>
      <Wrapper>
        <Amount>
          {unlocked_balance === NO_BALANCE ? (
            <Spinner />
          ) : (
            convertBalanceForReading(unlocked_balance)
          )}
        </Amount>
        <Value>XHV Balance</Value>
        {balance !== unlocked_balance ? (
          <div>
            <Pending>
              You have {convertBalanceForReading(balance - unlocked_balance)}{" "}
              XHV pending
              <br />
              Your balances will be updated shortly.
            </Pending>
          </div>
        ) : null}
      </Wrapper>
    </Container>
  );
};

export default Overview;
