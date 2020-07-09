// Library Imports
import React, { Fragment } from "react";

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
  checked,
  onChange,
}) => {
  return (
    <Fragment>
      <Container>
        <Row>
          <Key>Conversion Rate</Key>
          <Value>
            {xRate && fromTicker && toTicker
              ? `1 ${fromTicker} =  ${xRate.toFixed(4)} ${toTicker}`
              : "Syncing..."}
          </Value>
        </Row>
        <Row>
          <Key>From Asset</Key>
          <Value>
            {(fromTicker ? fromTicker : "") +
              " " +
              (fromAmount && !isNaN(fromAmount) ? fromAmount : "--")}
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
            <Value>{externAddress}</Value>
          </Row>
        )}
        <Row>
          <Key>Priority ({"Medium"}) </Key>
          <Value>{"Unlocks ~2 hours"}</Value>
        </Row>
        <Row>
          <Key>Transaction Fee (${"0.02 USD"})</Key>
          <Value>
            {"0.1234"} {"XHV"}
          </Value>
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
