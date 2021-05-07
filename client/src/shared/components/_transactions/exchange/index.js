// Library Imports
import React, { Fragment } from "react";

// Relative Imports
import { Container, Row, Key, Value, Tag, Information, Url } from "./styles";
import Confirm from "../../confirm/index.js";
import Cell from "../cells/index.js";

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
  xasset_conversion,
  change,
}) => {
  const first = externAddress.substring(0, 4);
  const last = externAddress.substring(externAddress.length - 4);
  const truncatedAddress = first + "...." + last;

  const priorityInfo =
    priority === 0
      ? "~7d"
      : priority === 1
      ? "~48h"
      : priority === 2
      ? "~24h"
      : priority === 3
      ? "~6h"
      : null;

  // Adding for simplicity and clarity
  const from = `${fromAmount} ${fromTicker}`;
  const to = `${toAmount} ${toTicker}`;

  return (
    <Fragment>
      <Container>
        <Cell left="Convert From" right={from} />
        <Cell left="Convert To" right={to} />
        {!isOwnAddress && (
          <Cell left="Recipient Address" right={truncatedAddress} />
        )}
        {xasset_conversion ? (
          <Cell left="Standard Priority" right="Unlocks ~20m" />
        ) : (
          (function () {
            switch (priority) {
              case 0:
                return <Cell left="Normal Priority" right="Unlocks ~7d" />;
              case 1:
                return <Cell left="Low Priority" right="Unlocks ~48h" />;
              case 2:
                return <Cell left="Medium Priority" right="Unlocks ~24h" />;
              case 3:
                return <Cell left="High Priority" right="Unlocks ~6h" />;
              default:
            }
          })()
        )}
        <Row>
          <Key>Final Conversion Fee</Key>
          <Tag priority={priority}>
            <Value>
              {fee} {fromTicker}
            </Value>
          </Tag>
        </Row>
        <Confirm
          description={`I accept the ${
            xasset_conversion ? "~20m" : priorityInfo
          } Locked Balance, Unlock Time, Terms & Fees`}
          checked={checked}
          onChange={onChange}
        />
      </Container>
      <Information>
        I have reviewed my conversion details and accept all responsibility for
        this transaction. Once I click confirm, I understand that {change}{" "}
        {fromTicker} will be locked for the entirety of the{" "}
        {xasset_conversion ? "~20m" : priorityInfo} unlock priority time. To
        learn more about how locked balances work, and how they might impact
        your experience{" "}
        <strong>
          <Url
            target="_blank"
            href="https://havenprotocol.org/knowledge/haven-transactions/"
          >
            click here.
          </Url>
        </strong>
      </Information>
    </Fragment>
  );
};

export default Transaction;
