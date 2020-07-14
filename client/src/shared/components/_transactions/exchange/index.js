// Library Imports
import React, { Fragment, useState } from "react";

// Relative Imports
import { Container, Row, Key, Value } from "./styles";
import Confirm from "../../confirm/index.js";

const Transaction = ({
  xRate,
  fromAmount,
  toAmount,
  fromTicker,
  toTicker,
  fee,
  externAddress,
  onChange,
  checked,
}) => {
  // ####  Add in the fromAmount ####
  const first = externAddress.substring(0, 4);
  const last = externAddress.substring(externAddress.length - 4);
  const truncatedAddress = first + "...." + last;

  return (
    <Fragment>
      <Container>
        <Row>
          <Key>From Asset</Key>
          <Value>
            {(fromTicker ? fromTicker : "") +
              " " +
              (fromAmount && !isNaN(fromAmount) ? fromAmount : "**REPLACE**")}
          </Value>
        </Row>
        <Row>
          <Key>To Asset</Key>
          <Value>
            {(toTicker ? toTicker : "") +
              " " +
              (toAmount && !isNaN(toAmount) ? toAmount : "--")}
          </Value>
        </Row>
        {externAddress && (
          <Row>
            <Key>Exchange To</Key>
            <Value>{truncatedAddress}</Value>
          </Row>
        )}
        <Row>
          <Key>Exchange Priority</Key>
          <Value>{"**REPLACE**"}</Value>
        </Row>
        <Row>
          <Key>Transaction Fee</Key>
          <Value>{"**REPLACE**"}</Value>
        </Row>
        <Confirm
          description="I have reviewed my Exchange and accept the transaction fee"
          checked={checked}
          onChange={onChange}
        />
      </Container>
    </Fragment>
  );
};

export default Transaction;
