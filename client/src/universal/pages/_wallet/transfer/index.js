// Library Imports
import React, { Component } from "react";
import * as clipboard from "clipboard-polyfill";
import PropTypes from "prop-types";
// Relative Imports
import Page from "../../../components/_layout/page";
import Body from "../../../components/_layout/body";
import Menu from "../../../components/_layout/menu";
import Header from "../../../components/_layout/header";
import Input from "../../../components/_inputs/input";
import Description from "../../../components/_inputs/description";
import Form from "../../../components/_inputs/form";
import Dropdown from "../../../components/_inputs/dropdown";
import Footer from "../../../components/_inputs/footer";
import Tab from "../../../components/tab";
import { Transaction } from "../../../components/_transactions/transfer";
import { Container } from "./styles";
import {
  convertBalanceForReading,
  estimateFee
} from "../../../../utility/utility";
import { core } from "../../../../platforms/web/declarations/open_monero.service";
// import InputButton from "../../../components/_inputs/input_button";

const options = [{ asset: "Haven", ticker: "XHV" }];

export class Transfer extends Component {
  constructor(props) {
    super(props);
    this.addressValue = React.createRef();
  }

  state = {
    send_asset: "Haven",
    send_amount: "",
    send_ticker: "XHV",
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
    const { send_amount, recipient_address } = this.state;
    if (send_amount.length === 0 && recipient_address.length === 0) {
      this.setState({ validated: false });
    } else if (send_amount.length > 0 && recipient_address.length > 0) {
      this.props.sendFunds(
        this.state.recipient_address,
        this.state.send_amount,
        this.state.payment_id
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

  handleCheckboxChange = event => {
    const { checked } = event.target;
    this.setState({ checked: checked, validated: true });
  };

  sendMax = () => {
    const unlockedBalance = this.props.unlockedBalance;
    const fee = core.JSBigInt(estimateFee());

    let availableBalance = unlockedBalance.subtract(fee);

    if (availableBalance < 0) {
      availableBalance = core.JSBigInt("0");
    }

    availableBalance = convertBalanceForReading(availableBalance);
    this.setState({ send_amount: availableBalance.toString() });
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
      send_asset,
      send_amount,
      send_ticker,
      recipient_address,
      checked,
      payment_id
    } = this.state;

    const checkValidation =
      send_amount.length > 0 && recipient_address.length > 97;
    const windowWidth = window.innerWidth;

    return (
      <Page>
        <Menu />
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
          />
          {this.state.firstTabState ? (
            <>
              <Form>
                <Dropdown
                  label="Asset"
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
                  onClick={this.sendMax}
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
                      width="true"
                      name="recipient_address"
                      value={recipient_address}
                      rows={windowWidth < 600 ? "3" : "2"}
                      onChange={this.handleChange}
                    />
                    <Input
                      label="Payment ID (Optional)"
                      placeholder="Enter an optional payment ID"
                      width="true"
                      name="payment_id"
                      value={payment_id}
                      onChange={this.handleChange}
                    />
                  </>
                ) : (
                  <>
                    <Input
                      label="Recipient"
                      placeholder="Enter recipient address"
                      width="true"
                      name="recipient_address"
                      value={recipient_address}
                      onChange={this.handleChange}
                    />
                    <Input
                      label="Payment ID (Optional)"
                      placeholder="Enter an optional payment ID"
                      width="true"
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
              <Form>
                <Dropdown
                  label="Asset"
                  placeholder="Select Asset"
                  name="send_asset"
                  width="true"
                  ticker={send_ticker}
                  value={send_asset}
                  options={options}
                  onClick={this.setSendAsset}
                />
                {windowWidth < 1380 ? (
                  <Description
                    label="Haven Address"
                    placeholder="...load address"
                    width="true"
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
                    width="true"
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
      </Page>
    );
  }
}

Transfer.propTypes = {
  sendFunds: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  unlockedBalance: PropTypes.any.isRequired
};
