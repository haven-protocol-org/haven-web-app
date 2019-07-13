// Library Imports
import React from "react";

// Relative Imports
import { Container, Amount, Value, Wrapper, Pending } from "./styles";

const Overview = ({ amount, lockedBalance, lockedTime }) => {
  const balance = lockedBalance.toFixed(4);
  return (
    <Container>
      <Wrapper>
        <Amount>{amount}</Amount>
        <Value>XHV Balance</Value>
        {balance > 0 ? (
          <Pending>
            You recently received {balance} XHV. <br />
            In ~{lockedTime} mins it'll be unlocked and added to your balance.
          </Pending>
        ) : null}
      </Wrapper>
    </Container>
  );
};

export default Overview;
