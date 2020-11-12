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
          <Key>Convert From</Key>
          <Value>
            {fromAmount.toFixed(2)} {fromTicker}
          </Value>
        </Row>
        <Row>
          <Key>Convert To</Key>
          <Value>
            {toAmount.toFixed(2)} {toTicker}
          </Value>
        </Row>
        {isOwnAddress ? null : (
          <Row>
            <Key>Convert To</Key>
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
                    <Value>Unlocks ~10d</Value>
                  </>
                );
              case 1:
                return (
                  <>
                    <Key>Low Priority</Key>
                    <Value>Unlocks ~5d</Value>
                  </>
                );
              case 2:
                return (
                  <>
                    <Key>Medium Priority</Key>
                    <Value>Unlocks ~48hr</Value>
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
          <Key>Final Conversion Fee</Key>
          <Tag priority={priority}>
            <Value>
              {fee.toFixed(2)} {fromTicker}
            </Value>
          </Tag>
        </Row>
        <Confirm
          description="I reviewed the transaction and I accept the Fees and Terms"
          checked={checked}
          onChange={onChange}
        />
      </Container>
      <Information>
        <strong>Terms:</strong> You accept any and all responsibility for your
        Conversion including the verification of Recipient Addresses, Amounts
        and Fees. Upon clicking <strong>Confirm</strong> a portion of your
        balance may be locked for the entirety of your Priority Unlock Time,
        until the transaction is complete. The Vault will indicate any pending
        balances which can be seen by clicking the{" "}
        <strong>Show Pending Balances</strong> button in the Assets page.
      </Information>
    </Fragment>
  );
};

export default Transaction;
