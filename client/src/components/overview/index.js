// Library Imports
import React from "react";

// Relative Imports
import { Container, Amount, Value, Wrapper, Pending } from "./styles";
import {NO_BALANCE} from "../../reducers/balance";
import {convertBalanceForReading} from "../../utility";

const Overview = ({ balance, unlocked_balance }) => {


 // const balance = lockedBalance.toFixed(4);

  //  const viewBalance =
  //      this.props.balance === NO_BALANCE ? "loading..." : this.props.balance;
  return (
    <Container>
      <Wrapper>
        <Amount>{convertBalanceForReading(balance)}</Amount>
        <Value>XHV Balance</Value>
          <Amount>{convertBalanceForReading(unlocked_balance)}</Amount>
          <Value>Unlocked XHV Balance</Value>
        {balance > 0 ? (
          <Pending>
            You recently received asas XHV. <br />
            In  it'll be unlocked and added to your balance.
          </Pending>
        ) : null}
      </Wrapper>
    </Container>
  );
};

export default Overview;
