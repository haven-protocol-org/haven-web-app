// Library Imports
import React, { Component } from "react";
import history from "../../../history.js";

// Relative Imports
import Page from "../../../components/_layout/page";
import Body from "../../../components/_layout/body";
import Menu from "../../../components/_layout/menu";
import Header from "../../../components/_layout/header";
import Status from "../../../components/_layout/status/";
import Input from "../../../components/_inputs/input";
import Form from "../../../components/_inputs/form";
import Footer from "../../../components/_inputs/footer";
import Dropdown from "../../../components/_inputs/dropdown";
import Transaction from "../../../components/_transactions/exchange";

import { Container } from "./styles";

const options = [
  { asset: "Haven Token", ticker: "XHV", price: 0.3293 },
  { asset: "United States Dollar", ticker: "xUSD", price: 1.0012 }
];

class Exchange extends Component {
  state = {
    status: false,
    from_asset: "Select Asset",
    from_amount: "",
    from_ticker: "",
    from_price: "",
    to_asset: "Select Asset",
    to_amount: "",
    to_ticker: "",
    to_price: "",
    time: 7
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  setFromAsset = option => {
    const { asset, ticker, price } = option;
    // Call back function from Dropdown
    this.setState({
      from_asset: asset,
      from_ticker: ticker,
      from_price: price
    });
  };

  setToAsset = option => {
    const { asset, ticker, price } = option;
    // Call back function from Dropdown
    this.setState({
      to_asset: asset,
      to_ticker: ticker,
      to_price: price
    });
  };

  handleSubmit = () => {
    const { send_ticker } = this.state;
    setTimeout(() => this.setState({ status: true, loading: true }), 500);
    setInterval(() => this.setState({ time: this.state.time - 1 }), 1000);
    setTimeout(() => history.push(`/wallet/assets/${send_ticker}`), 7000);
  };

  render() {
    const {
      status,
      from_asset,
      from_amount,
      from_ticker,
      to_asset,
      to_ticker,
      to_amount
    } = this.state;

    return (
      <Page>
        <Menu />
        <Body>
          <Header
            title="Exchange "
            description="Swap to and from various Haven Assets"
          />
          <Form onSubmit={this.handleSubmit}>
            <Dropdown
              label="From Asset"
              placeholder="Select Asset"
              name="from_asset"
              ticker={from_ticker}
              value={from_asset}
              options={options}
              onClick={this.setFromAsset}
            />
            <Input
              label="From Amount"
              placeholder="Enter amount"
              type="number"
              name="from_amount"
              value={from_amount}
              onChange={this.handleChange}
            />
            <Dropdown
              label="To Asset"
              placeholder="Select Asset"
              name="to_asset"
              value={to_asset}
              ticker={to_ticker}
              options={options}
              onClick={this.setToAsset}
            />
            <Input
              label="To Amount"
              placeholder="Enter amount"
              name="to_amount"
              type="number"
              value={to_amount}
              onChange={this.handleChange}
            />
          </Form>
          <Container>
            <Transaction state={this.state} />
            <Footer
              onClick={this.handleSubmit}
              label="Exchange"
              validated={true}
            />
          </Container>
        </Body>
        {status && (
          <Status>
            <span role="img" aria-label="Money">
              💸
            </span>
            Congrats, your exchange was submitted. Redirecting you in{" "}
            {this.state.time}'s
          </Status>
        )}
      </Page>
    );
  }
}

export default Exchange;
