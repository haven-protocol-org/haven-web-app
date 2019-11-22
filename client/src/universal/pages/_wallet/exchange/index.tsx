// Library Imports
import React, { Component } from "react";
import {history} from "../../../../utility/history.js";

// Relative Imports
import Page from "../../../components/_layout/page";
import Body from "../../../components/_layout/body";
import Menu from "../../../components/_layout/menu";
import Header from "../../../components/_layout/header";
import Input from "../../../components/_inputs/input";
import Form from "../../../components/_inputs/form";
import Footer from "../../../components/_inputs/footer";
import Dropdown from "../../../components/_inputs/dropdown";
import Transaction from "../../../components/_transactions/exchange";

import { Container } from "./styles";
import {ConversionRate, Ticker} from "../../../../platforms/desktop/reducers/blockHeaderExchangeRates";

interface Asset {

  ticker: string;
  asset: string;
}


type ExchangeProps = {

  conversionRates:ConversionRate[];

}

type ExchangeState = {

  fromAsset: AssetOption;
  fromAmount: number;
  toAmount: number;
  toAsset: AssetOption;
  xRate: number;

}


interface AssetOption {
  ticker: Ticker;
  asset: string;
}


const options:AssetOption[] = [
  { asset: "Haven Token", ticker: "XHV"},
  { asset: "United States Dollar", ticker: "xUSD" }
];




export class Exchange extends Component<ExchangeProps, ExchangeState> {


  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChange = (event: any) => {



  };

  setFromAsset = ( (option: AssetOption) => {

    // Call back function from Dropdown
    this.setState({ fromAsset: option});
  });

  setToAsset = (option: AssetOption)  => {
    // Call back function from Dropdown
    this.setState({
     toAsset: option
    });
  };

  handleSubmit = () => {



  };

  render() {

    const { fromAsset, toAsset, fromAmount, toAmount } = this.state;

    return (
      <Page>
        <Menu />
        <Body>
          <Header
            title="Exchange "
            description="Swap to and from various Haven Assets"
            back="/"
          />
          <Form onSubmit={this.handleSubmit}>
            <Dropdown
              label="From Asset"
              placeholder="Select Asset"
              name="from_asset"
              ticker={fromAsset.ticker}
              value={fromAsset.asset}
              options={options}
              onClick={this.setFromAsset}
            />
            <Input
              label="From Amount"
              placeholder="Enter amount"
              type="number"
              name="from_amount"
              value={fromAmount}
              onChange={this.handleChange}
            />
            <Dropdown
              label="To Asset"
              placeholder="Select Asset"
              name="to_asset"
              value={toAsset.asset}
              ticker={toAsset.ticker}
              options={options}
              onClick={this.setToAsset}
            />
            <Input
              label="To Amount"
              placeholder="Enter amount"
              name="to_amount"
              type="number"
              value={toAmount}
              onChange={this.handleChange}
            />
          </Form>
          <Container>
            <Transaction state={this.state} />
            <Footer
              onClick={this.handleSubmit}
              label="Exchange"
              validated={true}
              loading={true}
            />
          </Container>
        </Body>
      </Page>
    );
  }
}
