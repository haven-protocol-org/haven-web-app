// Library Imports
import React, { Component, Fragment } from "react";
import * as clipboard from "clipboard-polyfill";
// Relative Imports
import Body from "../../../components/_layout/body";
import Header from "../../../components/_layout/header";
import Input from "../../../components/_inputs/input";
import Description from "../../../components/_inputs/description";
import Form from "../../../components/_inputs/form";
import Dropdown from "../../../components/_inputs/dropdown";
import Footer from "../../../components/_inputs/footer";
import Tab from "../../../components/tab";
import { Transaction } from "../../../components/_transactions/transfer";
import { Container } from "./styles";
import { Ticker } from "shared/reducers/types";
import { AssetOption } from "shared/pages/_wallet/exchange";
import { OFFSHORE_ENABLED } from "constants/env";
import { XBalances } from "shared/reducers/xBalance";
import { convertBalanceForReading } from "utility/utility";


import { connect } from "react-redux";

import TransferSummary from "../../../components/_summaries/transfer-summary";

const options: AssetOption[] = [{ name: "Haven Token", ticker: Ticker.XHV }];

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
  address: string;
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
  firstTabState: boolean;
  secondTabState: boolean;
  copyButtonState: string;
  address: string;
}

type TransferProps = TransferOwnProps & TransferReduxProps;

class TransferContainer extends Component<TransferProps, TransferState> {
  private addressValue: any = React.createRef();

  state: TransferState = {
    selectedAsset: options.length === 1 ? options[0] : null,
    send_amount: "",
    recipient_address: "",
    payment_id: "",
    firstTabState: true,
    secondTabState: false,
    copyButtonState: "Copy Address",
    address: "",
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({
      address: this.props.address,
    });
  }

  handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState<never>({
      [name]: value
    });
  };

  setSendAsset = (asset: AssetOption) => {
    // Call back function from Dropdown
    this.setState({
      selectedAsset: asset
    });
  };

  handleSubmit = () => {
    const {
      payment_id,
      send_amount,
      recipient_address,
      selectedAsset
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

  toggleSend = () => {
    this.setState({
      firstTabState: true,
      secondTabState: false
    });
  };

  toggleReceive = () => {
    this.setState({
      firstTabState: false,
      secondTabState: true
    });
  };



  clipboardAddress = () => {
    const { address } = this.state;

    this.setState({
      copyButtonState: "Copied Address"
    });

    clipboard.writeText(address);

    setTimeout(() => {
      this.setState({
        copyButtonState: "Copy Address"
      });
    }, 1000);
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
    const windowWidth = window.innerWidth;

    let availableBalance = null;
    if (selectedAsset) {
      availableBalance = convertBalanceForReading(
        this.props.xBalances[selectedAsset.ticker].unlockedBalance
      );
    }

    const amountLabel: string = availableBalance
      ? `Amount (Avail. ${availableBalance})`
      : "Amount";

    return (
      <Fragment>
        <Body>
          <Header
            title="Transfer"
            description="Send or receive assets to and from your Haven Vault"
          />
          <Tab
            firstTabLabel="Send"
            secondTabLabel="Receive"
            firstTabState={this.state.firstTabState}
            secondTabState={this.state.secondTabState}
            firstTabClickEvent={this.toggleSend}
            secondTabClickEvent={this.toggleReceive}
            onClick={() => {}}
          />

          {this.state.firstTabState ? (
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
                  label={amountLabel}
                  placeholder="Enter amount"
                  type="number"
                  name="send_amount"
                  value={send_amount}
                  onChange={this.handleChange}
                />
                {windowWidth < 1380 ? (
                  <Fragment>
                    <Description
                      label="Recipient"
                      placeholder="Enter recipients address"
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
                      label="Payment ID (Optional)"
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
                  transferAsset={
                    selectedAsset === null ? "--" : selectedAsset.ticker
                  }
                  transferAmount={send_amount === "" ? "--" : send_amount}
                />

                <Footer
                  onClick={() => this.handleSubmit()}
                  loading={this.props.isProcessing}
                  label="Review"
                  validated={checkValidation}
                />
              </Container>
            </Fragment>
          ) : (
            <Fragment>
              <Form onSubmit={this.handleSubmit}>
                {windowWidth < 1380 ? (
                  <Description
                    label="Haven Address"
                    placeholder="...load address"
                    width={true}
                    name="address"
                    value={this.props.address}
                    readOnly={true}
                    rows={windowWidth < 600 ? "3" : "2"}
                  />
                ) : (
                  <Input
                    ref={textarea => (this.addressValue = textarea)}
                    label="Haven Address"
                    placeholder="...load address"
                    width={true}
                    type={"text"}
                    name="address"
                    value={this.props.address}
                    readOnly={true}
                  />
                )}
              </Form>
              <Container>
                <Footer
                  label={this.state.copyButtonState}
                  onClick={this.clipboardAddress}
                />
              </Container>
            </Fragment>
          )}
        </Body>
      </Fragment>
    );
  }
}

const mapStateToProps = (
  state: any,
  ownProps: TransferOwnProps
): TransferReduxProps => ({
  xBalances: state.xBalance
});

export const Transfer = connect<TransferReduxProps, null, TransferOwnProps>(
  mapStateToProps,
  null
)(TransferContainer);
