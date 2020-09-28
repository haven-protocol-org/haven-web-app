// Library Imports
import React, { Fragment } from "react";

// Relative Imports
import { Container, Row, Key, Value, Tag } from "./styles";
import Confirm from "../../confirm/index.js";
import { Information } from "../../../../assets/styles/type.js";

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
  priority,
  isOwnAddress,
}) => {
  const first = externAddress.substring(0, 4);
  const last = externAddress.substring(externAddress.length - 4);
  const truncatedAddress = first + "...." + last;

  return (
    <Fragment>
      <Container>
        <Row>
          <Key>Exchange From</Key>
          <Value>
            {fromAmount.toFixed(4)} {fromTicker}
          </Value>
        </Row>
        <Row>
          <Key>Exchange To</Key>
          <Value>
            {toAmount.toFixed(4)} {toTicker}
          </Value>
        </Row>
        {isOwnAddress ? null : (
          <Row>
            <Key>Exchange To</Key>
            <Value>{truncatedAddress}</Value>
          </Row>
        )}
        <Row>
          {(function () {
            switch (priority) {
              case 0:
                return (
                  <>
                    <Key>Normal Priority</Key>
                    <Value>Unlocks ~7d</Value>
                  </>
                );
              case 1:
                return (
                  <>
                    <Key>Low Priority</Key>
                    <Value>Unlocks ~48hr</Value>
                  </>
                );
              case 2:
                return (
                  <>
                    <Key>Medium Priority</Key>
                    <Value>Unlocks ~24hr</Value>
                  </>
                );
              case 3:
                return (
                  <>
                    <Key>High Priority</Key>
                    <Value>Unlocks ~6hr</Value>
                  </>
                );

              default:
            }
          })()}
        </Row>
        <Row>
          <Key>Final Exchange Fee</Key>
          <Tag priority={priority}>
            <Value>
              {fee} {fromTicker}
            </Value>
          </Tag>
        </Row>
        <Confirm
          description="I reviewed my Exchange details and I accept the Fees and Terms"
          checked={checked}
          onChange={onChange}
        />
      </Container>
      <Information>
        <strong>Terms:</strong> You accept any and all responsibility for your
        Exchange including the verification of Recipient Addresses, Amounts and
        Fees. Upon clicking <strong>Confirm</strong> a portion of your balance
        may be locked for the entirety of your Priority Unlock Time, until the
        transaction is complete. The Vault will indicate any pending balances
        which can be seen by clicking the <strong>Show Pending Balances</strong>{" "}
        button in the Assets page.
      </Information>
    </Fragment>
  );
};

export default Transaction;
