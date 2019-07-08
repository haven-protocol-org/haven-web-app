// Library Imports
import React, { Component } from "react";

// Relative Imports
import Page from "../../../components/_layout/page";
import Body from "../../../components/_layout/body";
import Menu from "../../../components/_layout/menu";
import Header from "../../../components/_layout/header";
import Status from "../../../components/_layout/status/";
import Transaction from "../../../components/transaction";
import Statistic from "../../../components/statistic";
import Chart from "../../../components/chart";

import { History, Row } from "./styles";
import {connect} from "react-redux";
import {transfer} from "../../../actions";

class Details extends Component {
  state = {
    status: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  renderTransactions = () => {};

  render() {
    const { id } = this.props.match.params;
    const price = 1.23;
    const amount = 9867.54;
    const value = price * amount;
    const { status } = this.state;

    return (
      <Page>
        <Menu />
        <Body>
          <Header
            back
            title={`${id} Overview`}
            description="Pricing history and asset values"
          />
          <Chart />
          <Row>
            <Statistic label="Amount" value={amount} />
            <Statistic
              label="Price"
              value={price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
              })}
            />
            <Statistic
              label="Value"
              value={value.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
              })}
            />
          </Row>

          <Header
            title="History"
            description={`Review your ${id} transaction history`}
          />
          <History>
            <Transaction
              status="pending"
              date="April 1, 2019"
              hash=" 25a6….19b7"
              amount="123"
            />
            <Transaction
              status="completed"
              date="April 1, 2019"
              hash=" 25a6….19b7"
              amount="123"
            />
            <Transaction
              status="completed"
              date="April 1, 2019"
              hash=" 25a6….19b7"
              amount="123"
            />
            <Transaction
              status="completed"
              date="April 1, 2019"
              hash=" 25a6….19b7"
              amount="123"
            />
            <Transaction
              status="completed"
              date="April 1, 2019"
              hash=" 25a6….19b7"
              amount="123"
            />
          </History>
        </Body>
        {status ? <Status>Pending transaction</Status> : null}
      </Page>
    );
  }
}

export const mapStateToProps = state => ({
  transferList: state.transferList
});

export default connect(
    mapStateToProps,
    { transfer }
)(Details);

