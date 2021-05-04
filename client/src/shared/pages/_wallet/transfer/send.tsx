// Library Imports
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Ticker } from "shared/reducers/types";
import { XBalances } from "shared/reducers/xBalance";
import { convertBalanceToMoney } from "utility/utility";
import Description from "../../../components/_inputs/description";
import Dropdown from "../../../components/_inputs/dropdown";
import Footer from "../../../components/_inputs/footer";
import Form from "../../../components/_inputs/form";
import Input from "../../../components/_inputs/input";
import { Container } from "./styles";
import TransferSummary from "shared/components/_summaries/transfer-summary";

const assetOptions: AssetOption[] = [
  { name: "Haven", ticker: Ticker.XHV },
  { name: "U.S Dollar", ticker: Ticker.xUSD },
  { name: "Bitcoin", ticker: Ticker.xBTC },
  { name: "Yuan", ticker: Ticker.xCNY },
  { name: "Euro", ticker: Ticker.xEUR },
  { name: "Gold", ticker: Ticker.XAU },
  { name: "Silver", ticker: Ticker.XAG },
  { name: "Swiss Franc", ticker: Ticker.xCHF },
  { name: "Australian Dollar", ticker: Ticker.xAUD },
  { name: "British Pound", ticker: Ticker.xGBP },
  { name: "Japanese Yen", ticker: Ticker.xJPY },
];

interface TransferOption {
  name: string;
  ticker: Ticker;
}
interface AssetOption {
  ticker: Ticker;
  name: string;
}
interface TransferOwnProps {
  sendFunds: (
    address: string,
    amount: number,
    ticker: Ticker,
    sweepAll: boolean
  ) => void;
  isProcessing: boolean;
}

interface TransferReduxProps {
  xBalances: XBalances;
  options: Array<TransferOption>;
}

interface TransferState {
  selectedAsset: AssetOption | null;
  send_amount: string;
  recipient_address: string;
  amountError: string;
  reviewed: boolean;
  sweep_all: boolean;
}

type TransferProps = TransferOwnProps & TransferReduxProps;

class TransferContainer extends Component<TransferProps, TransferState> {
  state: TransferState = {
    selectedAsset: this.props.options[0],
    send_amount: "",
    recipient_address: "",
    amountError: "",
    reviewed: false,
    sweep_all: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    this.setState({
      selectedAsset: this.props.options[0],
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

  handleSendAmountChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState<never>({
      [name]: value,
      sweep_all: false,
    });
  };

  setSendAsset = (asset: AssetOption) => {
    this.setState({
      selectedAsset: asset,
      sweep_all: false,
    });
  };

  handleSubmit = () => {
    const { send_amount, recipient_address, selectedAsset } = this.state;

    if (selectedAsset !== null) {
      this.props.sendFunds(
        recipient_address,
        Number(send_amount),
        selectedAsset.ticker,
        this.state.sweep_all
      );
    }
  };

  // setMaxAmount = () => {
  //   const { selectedAsset } = this.state;
  //
  //   let availableBalance = null;
  //   if (selectedAsset) {
  //     availableBalance = convertBalanceToMoney(
  //       this.props.xBalances[selectedAsset.ticker].unlockedBalance
  //     );
  //   }
  //
  //   if (availableBalance != null) {
  //     this.setState({
  //       send_amount: availableBalance.toFixed(2),
  //       sweep_all: true,
  //     });
  //   } else {
  //     this.setState({
  //       amountError: "Select an asset",
  //     });
  //   }
  // };

  amountIsValid = (availableBalance: number): string | true => {
    const { send_amount } = this.state;

    const convertToNum = parseFloat(send_amount);

    //@ts-ignore
    if (convertToNum > availableBalance) {
      return "Not enough funds";
    }

    return true;
  };

  // @ts-ignore
  recipientIsValid = () => {
    const recipient = this.state.recipient_address;
    if (recipient.length > 97) {
      return "";
    } else if (recipient === "") {
      return "";
    } else {
      return "Enter a valid address";
    }
  };

  render() {
    const { selectedAsset, send_amount, recipient_address } = this.state;

    const windowWidth = window.innerWidth;

    let availableBalance = 0;
    if (selectedAsset) {
      availableBalance = convertBalanceToMoney(
        this.props.xBalances[selectedAsset.ticker].unlockedBalance
      );
    }

    const checkValidation =
      send_amount.length > 0 &&
      recipient_address.length > 97 &&
      this.amountIsValid(availableBalance) === true;

    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Dropdown
            label="Asset"
            placeholder="Select Asset"
            name="send_asset"
            ticker={selectedAsset ? selectedAsset.ticker : ""}
            value={selectedAsset ? selectedAsset.name : "Select Asset"}
            options={this.props.options}
            onClick={this.setSendAsset}
          />
          <Input
            // @ts-ignore
            label={
              availableBalance
                ? `Amount (Avail. ${availableBalance.toFixed(2)})`
                : "Amount"
            }
            placeholder="Enter amount"
            type="number"
            // @ts-ignore
            error={this.amountIsValid(availableBalance.toFixed(2))}
            name="send_amount"
            value={send_amount}
            onChange={this.handleSendAmountChange}
          />
          {windowWidth < 1380 ? (
            <Description
              label="Recipient"
              placeholder="Enter recipient's address"
              name="recipient_address"
              value={recipient_address}
              width={true}
              rows={windowWidth < 600 ? "3" : "2"}
              onChange={this.handleChange}
              error={this.recipientIsValid()}
            />
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
                error={this.recipientIsValid()}
              />
            </Fragment>
          )}
        </Form>
        <Container>
          <TransferSummary
            recipientAddress={
              recipient_address === "" ? "--" : recipient_address
            }
            transferAsset={selectedAsset === null ? "--" : selectedAsset.ticker}
            transferAmount={send_amount === "" ? "--" : send_amount}
            onChange={this.handleReviewSubmit}
          />
          <Footer
            onClick={() => this.handleSubmit()}
            loading={this.props.isProcessing}
            label={"Preview"}
            disabled={!checkValidation}
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
  options: assetOptions,
});

export const SendFunds = connect<TransferReduxProps, {}, TransferOwnProps>(
  mapStateToProps,
  {}
)(TransferContainer);
