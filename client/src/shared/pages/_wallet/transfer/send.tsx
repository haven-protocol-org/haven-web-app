// Library Imports
import { OFFSHORE_ENABLED } from "constants/env";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { AssetOption } from "shared/pages/_wallet/exchange";
import { Ticker } from "shared/reducers/types";
import { XBalances } from "shared/reducers/xBalance";
import { convertBalanceForReading } from "utility/utility";
import Description from "../../../components/_inputs/description";
import Dropdown from "../../../components/_inputs/dropdown";
import Footer from "../../../components/_inputs/footer";
import Form from "../../../components/_inputs/form";
import Input from "../../../components/_inputs/input";
// import InputButton from "../../../components/_inputs/input_button";
// import TransferSummary from "../../../components/_summaries/transfer-summary";
import { Container } from "./styles";
import TransferSummary from "shared/components/_summaries/transfer-summary";
// Relative Imports

const options: AssetOption[] = [{ name: "Haven", ticker: Ticker.XHV }];

if (OFFSHORE_ENABLED) {
  options.push({ name: "United States Dollar", ticker: Ticker.xUSD });
}

interface TransferOwnProps {
  sendFunds: (
    address: string,
    amount: number,
    paymentId: string,
    ticker: Ticker
  ) => void;
  isProcessing: boolean;
}

interface TransferReduxProps {
  xBalances: XBalances;
}

interface TransferState {
  selectedAsset: AssetOption | null;
  send_amount: string;
  recipient_address: string;
  payment_id: string;
  amountError: string;
  reviewed: boolean;
}

type TransferProps = TransferOwnProps & TransferReduxProps;

class TransferContainer extends Component<TransferProps, TransferState> {
  state: TransferState = {
    selectedAsset: options.length === 1 ? options[0] : null,
    send_amount: "",
    recipient_address: "",
    payment_id: "",
    amountError: "",
    reviewed: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({
      selectedAsset: options[0],
    });
  }

  handleReviewSubmit = (event: any) => {
    const { checked } = event.target;
    this.setState({ reviewed: checked });
  };

  handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState<never>({
      [name]: value,
    });
  };

  setSendAsset = (asset: AssetOption) => {
    this.setState({
      selectedAsset: asset,
    });
  };

  handleSubmit = () => {
    const {
      payment_id,
      send_amount,
      recipient_address,
      selectedAsset,
    } = this.state;

    if (send_amount.length === 0 && recipient_address.length === 0) {
      return;
    }

    if (selectedAsset !== null) {
      this.props.sendFunds(
        recipient_address,
        Number(send_amount),
        payment_id,
        selectedAsset.ticker
      );
    }
  };

  setMaxAmount = () => {
    const { selectedAsset } = this.state;

    let availableBalance = null;
    if (selectedAsset) {
      availableBalance = convertBalanceForReading(
        this.props.xBalances[selectedAsset.ticker].unlockedBalance
      );
    }

    if (availableBalance != null) {
      this.setState({
        send_amount: availableBalance,
      });
    } else {
      this.setState({
        amountError: "Select an asset",
      });
    }
  };

  render() {
    const {
      selectedAsset,
      send_amount,
      recipient_address,
      payment_id,
    } = this.state;

    const checkValidation =
      send_amount.length > 0 && recipient_address.length > 97;
    // && this.state.reviewed;

    const windowWidth = window.innerWidth;

    let availableBalance = null;
    if (selectedAsset) {
      availableBalance = convertBalanceForReading(
        this.props.xBalances[selectedAsset.ticker].unlockedBalance
      );
    }

    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Dropdown
            label="Asset"
            placeholder="Select Asset"
            name="send_asset"
            ticker={selectedAsset ? selectedAsset.ticker : ""}
            value={selectedAsset ? selectedAsset.name : "Select Asset"}
            options={options}
            onClick={this.setSendAsset}
          />
          <Input
            // @ts-ignore
            label={
              availableBalance
                ? `Amount (Avail. ${availableBalance})`
                : "Amount"
            }
            placeholder="Enter amount"
            type="number"
            error={this.state.amountError}
            name="send_amount"
            value={send_amount}
            onChange={this.handleChange}
          />
          {windowWidth < 1380 ? (
            <Fragment>
              <Description
                label="Recipient"
                placeholder="Enter recipient's address"
                name="recipient_address"
                value={recipient_address}
                width={true}
                rows={windowWidth < 600 ? "3" : "2"}
                onChange={this.handleChange}
              />
              <Input
                label="Payment ID (Optional)"
                placeholder="Enter an optional payment ID"
                type={"text"}
                name="payment_id"
                width={true}
                value={payment_id}
                onChange={this.handleChange}
              />
            </Fragment>
          ) : (
            <Fragment>
              <Input
                label="Recipient"
                placeholder="Enter recipient address"
                width={true}
                type={"text"}
                name="recipient_address"
                value={recipient_address}
                onChange={this.handleChange}
              />
              <Input
                label="Payment ID (Optional) "
                placeholder="Enter an optional payment ID"
                type={"text"}
                width={true}
                name="payment_id"
                value={payment_id}
                onChange={this.handleChange}
              />
            </Fragment>
          )}
        </Form>
        <Container>
          <TransferSummary
            paymentId={payment_id === "" ? "--" : payment_id}
            recipientAddress={
              recipient_address === "" ? "--" : recipient_address
            }
            transferAsset={selectedAsset === null ? "--" : selectedAsset.ticker}
            transferAmount={send_amount === "" ? "--" : send_amount}
            checked={this.state.reviewed}
            onChange={this.handleReviewSubmit}
          />
          <Footer
            onClick={() => this.handleSubmit()}
            loading={this.props.isProcessing}
            label="Preview"
            validated={checkValidation}
          />
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = (
  state: any,
  ownProps: TransferOwnProps
): TransferReduxProps => ({
  xBalances: state.xBalance,
});

export const SendFunds = connect<TransferReduxProps, {}, TransferOwnProps>(
  mapStateToProps,
  {}
)(TransferContainer);
