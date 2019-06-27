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
import Dropdown from "../../../components/_inputs/dropdown";
import Footer from "../../../components/_inputs/footer";

import { Container } from "./styles";
import {connect} from "react-redux";
import {transfer} from "../../../actions";

const options = [
  { asset: "Haven Token", ticker: "XHV" },
  { asset: "United States Dollar", ticker: "xUSD" },
  { asset: "Australian Dollar", ticker: "xAUD" }
];

class Exchange extends Component {
  state = {
    status: false,
    send_asset: "Select Asset",
    send_amount: "",
    send_ticker: "",
    recipient_address: "",
    validated: true,
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

  setSendAsset = ({ asset, ticker }) => {
    // Call back function from Dropdown
    this.setState({
      send_asset: asset,
      send_ticker: ticker
    });
  };

  handleSubmit = () => {
  /*  const { send_ticker } = this.state;
    setTimeout(() => this.setState({ status: true, loading: true }), 500);
    setInterval(() => this.setState({ time: this.state.time - 1 }), 1000);
    setTimeout(() => history.push(`/wallet/assets/${send_ticker}`), 7000);*/

      this.props.transfer(this.state.recipient_address, this.state.send_amount);
  };

  render() {
    const {
      status,
      send_asset,
      send_amount,
      send_ticker,
      recipient_address,
      loading
    } = this.state;

    return (


      <Page>
        <Menu />
        <Body>
          <Header title="Transfer" description="Lorem impsum" />
          <Form>
            <Dropdown
              label="Send Asset"
              placeholder="Select Asset"
              name="send_asset"
              ticker={send_ticker}
              value={send_asset}
              options={options}
              onClick={this.setSendAsset}
            />
            <Input
              label="Amount"
              placeholder="Enter amount"
              type="number"
              name="send_amount"
              value={send_amount}
              onChange={this.handleChange}
            />
            <Input
              label="Recipient"
              placeholder="Enter recipient address"
              width="true"
              name="recipient_address"
              value={recipient_address}
              onChange={this.handleChange}
            />
          </Form>
          <Container>
            <Footer
              onClick={this.handleSubmit}
              loading={loading}
              label="Transfer"
              validated={this.state.validated}
            />
          </Container>
        </Body>
        {status && (
          <Status>
            <span role="img" aria-label="Money">
              💸
            </span>
            <span>{this.props.latestTransfer.error}{this.props.latestTransfer.info}</span>
            Congrats, your transfer was submitted. Redirecting you in{" "}
            {this.state.time}'s
          </Status>
        )}
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  latestTransfer: state.transfer,
});

export default connect(
    mapStateToProps,
    { transfer }
)(Exchange);
