// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { getBalances } from "../../../actions";
import { selectReadableBalance, NO_BALANCE } from "../../../reducers/balance";

// Relative Imports
import Page from "../../../components/_layout/page";
import Body from "../../../components/_layout/body";
import Menu from "../../../components/_layout/menu";
import Header from "../../../components/_layout/header";
import Overview from "../../../components/overview";
import Cell from "../../../components/cell";
// import Card from "../../../components/card";
// Card can be toggle on later once we have real data

import data from "../../../constants/data.js";

class Assets extends Component {
  state = {
    status: false,
    token: data,
    lockedBalance: 4.124211,
    lockedTime: 20
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleState = () => {
    this.setState(state => ({
      status: !state.status
    }));
  };

  renderTokens = () => {
    const { token } = this.state;
    return token.map(data => {
      const { token, ticker, price, change } = data;
      return (
        <Cell
            fullwidth="fullwidth"
          key={token}
          tokenName={token}
          ticker={ticker}
          price={price}
          change={change}
        />
      );
    });
  };

  render() {

    return (
      <Page>
        <Menu />
        <Body>
          <Header
            title="Available Assets"
            description="Overview of all available Haven Assets"
          />
          <Overview
              {...this.props.balance}
          />
          <Cell
            fullwidth="fullwidth"
            key={1}
            tokenName={"Haven Protocol"}
            ticker={"XHV"}
            price={"$1.23"}
            change={"MISSING VALUE"}
          />

          <Header
            title="Coming Soon"
            description="Overview of Haven Assets coming soon"
          />
          {this.renderTokens()}
        </Body>
      </Page>
    );
  }
}

export const mapStateToProps = state => ({
  balance: state.balance
});

export default connect(
  mapStateToProps,
  { getBalances }
)(Assets);
