// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { transfer, getAddress } from "../../../actions";
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
import Transaction from "../../../components/_transactions/transfer";
import Tab from "../../../components/tab/index.js";

import { Container } from "./styles";

const options = [{ asset: "Haven", ticker: "XHV" }];

class Transfer extends Component {
  constructor(props) {
    super(props);
    this.addressValue = React.createRef();
  }

  state = {
    status: false,
    send_asset: "Haven",
    send_amount: "",
    send_ticker: "XHV",
    recipient_address: "",
    validated: true,
    time: 7,
    firstTabState: true,
    secondTabState: false,
    copyButtonState: "Copy Address"
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    if (this.props.address === "") {
      this.props.getAddress();
    }
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.transferOuts !== this.props.transferOuts) {
      history.push("/wallet/assets/XHV");
    }
  }

  handleSubmit = () => {
    this.props.transfer(this.state.recipient_address, this.state.send_amount);
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

  copyAddressToClipBoard = () => {
    this.addressValue.select();
    document.execCommand("copy");
    document.getSelection().empty();
    this.setState({
      copyButtonState: "Address Copied"
    });

    setTimeout(() => {
      this.setState({
        copyButtonState: "Copy Address"
      });
    }, 1000);
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
                <Transaction state={this.state} />
                <Footer
                  onClick={this.handleSubmit}
                  loading={loading}
                  label="Transfer"
                  validated={this.state.validated}
                />
              </Container>
            </>
          ) : (
            <>
              <Form>
                <Dropdown
                  label="Receiving Asset"
                  placeholder="Select Asset"
                  name="send_asset"
                  width="true"
                  ticker={send_ticker}
                  value={send_asset}
                  options={options}
                  onClick={this.setSendAsset}
                />

                <Input
                  ref={textarea => (this.addressValue = textarea)}
                  label="Haven Address"
                  placeholder="...load address"
                  width="true"
                  name="recipient_address"
                  value={this.props.address}
                  readOnly={true}
                />
              </Form>
              <Container>
                <Footer
                  onClick={this.copyAddressToClipBoard}
                  loading={loading}
                  label={this.state.copyButtonState}
                  validated={this.state.validated}
                />
              </Container>
            </>
          )}
        </Body>
      </Page>
    );
  }
}

export const mapStateToProps = state => ({
  latestTransfer: state.transfer,
  transferOuts: state.transferList.out,
  address: state.address.main
});

export default connect(
  mapStateToProps,
  { transfer, getAddress }
)(Transfer);
