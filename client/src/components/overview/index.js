// Library Imports
import React from "react";

// Relative Imports
import { Container, Amount, Value, Wrapper, Pending } from "./styles";
import { NO_BALANCE } from "../../reducers/balance";
import { convertBalanceForReading } from "../../utility";
import { Spinner } from "../spinner/index.js";

const Overview = ({ balance, unlockedBalance, lockedBalance }) => {

  return (
    <Container>
      <Wrapper>
        <Amount>
          {unlockedBalance === NO_BALANCE ? (
            <Spinner />
          ) : (
            convertBalanceForReading(unlockedBalance)
          )}
        </Amount>
        <Value>XHV Balance</Value>
        {lockedBalance > 0 ? (
          <div>
            <Pending>
              You have {convertBalanceForReading(lockedBalance)}{" "}
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
