// Library Imports
import React, { Component } from "react";
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

const options: AssetOption[] = [{ name: "Haven Token", ticker: Ticker.XHV }];

if (OFFSHORE_ENABLED) {
  options.push({ name: "United States Dollar", ticker: Ticker.xUSD });
}

interface TransferProps {
  sendFunds: (
    address: string,
    amount: number,
    paymentId: string,
    ticker: Ticker
  ) => void;
  address: string;
  isProcessing: boolean;
}

interface TransferState {
  selectedAsset: AssetOption | null;
  send_amount: string;
  recipient_address: string;
  payment_id: string;
  validated: boolean;
  firstTabState: boolean;
  secondTabState: boolean;
  checked: boolean;
  copyButtonState: string;
  address: string;
}

export class Transfer extends Component<TransferProps, TransferState> {
  private addressValue: any = React.createRef();

  state: TransferState = {
    selectedAsset: null,
    send_amount: "",
    recipient_address: "",
    payment_id: "",
    validated: false,
    firstTabState: true,
    secondTabState: false,
    checked: false,
    copyButtonState: "Copy Address",
    address: ""
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ address: this.props.address });
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
      this.setState({ validated: false });
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

  handleCheckboxChange = (event: any) => {
    const { checked } = event.target;
    this.setState({ checked: checked, validated: true });
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
      checked,
      payment_id
    } = this.state;

    const checkValidation =
      send_amount.length > 0 && recipient_address.length > 97;
    const windowWidth = window.innerWidth;




    return (
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
          toggleSend={this.toggleSend}
          toggleReceive={this.toggleReceive}
          onClick={() => {}}
        />
        {this.state.firstTabState ? (
          <>
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
                label="Amount"
                placeholder="Enter amount"
                type="number"
                name="send_amount"
                value={send_amount}
                onChange={this.handleChange}
              />
              {windowWidth < 1380 ? (
                <>
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
                    type="number"
                    name="payment_id"
                    width={true}
                    value={payment_id}
                    onChange={this.handleChange}
                  />
                </>
              ) : (
                <>
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
                </>
              )}
            </Form>
            <Container>
              <Transaction
                state={this.state}
                checked={this.state.checked}
                onChange={this.handleCheckboxChange}
              />

              <Footer
                onClick={this.handleSubmit}
                loading={this.props.isProcessing}
                label="Transfer"
                validated={checked && checkValidation}
              />
            </Container>
          </>
        ) : (
          <>
            <Form onSubmit={this.handleSubmit}>
              <Dropdown
                label="Asset"
                placeholder="Select Asset"
                name="send_asset"
                width="true"
                ticker={selectedAsset ? selectedAsset.ticker : ""}
                value={selectedAsset ? selectedAsset.name : "Select Asset"}
                options={options}
                onClick={this.setSendAsset}
              />
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
          </>
        )}
      </Body>
    );
  }
}
