// Library Imports
import React, { Fragment } from "react";

// Relative Imports
import {
  Container,
  Row,
  Key,
  Value,
  Tag,
  Information,
  Url,
  Strong,
} from "./styles";
import Confirm from "../../confirm/index.js";
import Cell from "../cells/index.js";

//TOKENOMICS below - priority needs updating
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

//TOKENOMICS below - text / formating and markup needs updating
  return (
    <Fragment>
      <Container>
        <Cell left="Convert From" right={from} />
        <Cell left="Convert To" right={to} />
        {!isOwnAddress && (
          <Cell left="Recipient Address" right={truncatedAddress} />
        )}
        {xasset_conversion ? (
          <Cell left="Standard Priority" right="Unlocks ~48h" />
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
            xasset_conversion ? "48h" : priorityInfo
          } Unlock Time, Details, Terms & Fees`}
          checked={checked}
          onChange={onChange}
        />
      </Container>
      <Information>
        {change > 0 ? (
          <>
            <strong style={{ textDecoration: 'underline'}}>ALERT</strong>: Approximately{" "}
            <strong style={{ fontWeight: 600 }}>
              {change} {fromTicker} will be temporarily locked and unusable for ~20m
            </strong>
            . To understand why this happens and how it
            might impact your experience, please{" "}
            <strong>
              <Url
                target="_blank"
                href="https://havenprotocol.org/knowledge/haven-transactions/"
              >
                click here.
              </Url>
            </strong>
          </>
        ) : (
          <>
            Details: This {fromTicker} transaction will be unlocked in{" "}
            {xasset_conversion ? "~20m" : priorityInfo}. I have reviewed my
            transaction details and accept all responsibility for this
            transaction.
          </>
        )}
      </Information>
    </Fragment>
  );
};

export default Transaction;
