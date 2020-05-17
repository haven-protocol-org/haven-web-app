import React, { Component } from "react";
import { connect } from "react-redux";

// Library Imports
import { selectTheme } from "shared/actions";
// Relative Imports
import { Container } from "./styles";
import Body from "shared/components/_layout/body";
import Header from "shared/components/_layout/header";
import Form from "shared/components/_inputs/form";
import Theme from "shared/components/_inputs/theme";
import BalanceDropdown from "shared/components/_inputs/balances_dropdown";
import AddressDropdown from "shared/components/_inputs/addresses_dropdown";
import Input from "shared/components/_inputs/input";
import Footer from "shared/components/_inputs/footer/index.js";
import Mining from "../../../components/animation/index.js";

import { dark, light } from "assets/styles/themes.js";
import { DesktopAppState } from "platforms/desktop/reducers";
import {
  MiningRequestTypes,
  MiningStatus,
} from "platforms/desktop/reducers/mining";
import { Spinner } from "shared/components/spinner";
import {
  miningStatus,
  startMining,
  stopMining,
} from "platforms/desktop/actions/mining";

type ThemeOption = { theme: string; value: string };
type BalanceOption = { ticker: string; value: string; code: string };
type AddressOption = { name: string; address: string };
type NodeOptions = { value: string };

interface SettingsProps {
  theme: any;
  balance: any;
  mining: MiningStatus;
  selectTheme: (theme: any) => void;
  startMining: () => void;
  stopMining: () => void;
  onChange: () => void;
  miningStatus: () => void;
  title: string;
  description: string;
}

const options: ThemeOption[] = [
  { theme: "dark", value: "Dark Theme" },
  { theme: "light", value: "Light Theme" },
];

const balances: BalanceOption[] = [
  { ticker: "USD", value: "United States Dollars", code: "$" },
  { ticker: "BTC", value: "Bitcoin", code: "₿" },
  { ticker: "XHV", value: "Haven", code: "Ħ" },
  { ticker: "--", value: "Hide", code: "-" },
];

const addresses: AddressOption[] = [
  { name: "Work", address: "xhv1238...4567" },
  { name: "", address: "xhv8411...4910" },
  { name: "Hustle", address: "xhv9810...8301" },
  { name: "", address: "xhv0912...0183" },
  { name: "", address: "xhv0182...9401" },
  { name: "", address: "xhv9301...1930" },
  { name: "", address: "xhv1201...0391" },
  { name: "", address: "xhv92910...0381" },
];

class SettingsDesktopPage extends Component<SettingsProps, any> {
  refreshTimer: number = -1;

  state = {
    value: "",
    node: "remote",
    balance: "United States Dollars",
  };

  componentDidMount() {
    this.props.miningStatus();
    if (this.props.mining.active) {
      this.addMiningStatusRefresh();
    }
    window.scrollTo(0, 0);
    this.setState({
      value: this.props.theme.value,
    });
  }

  componentWillReceiveProps(
    nextProps: Readonly<SettingsProps>,
    nextContext: any
  ): void {
    if (!this.props.mining.active && nextProps.mining.active) {
      this.addMiningStatusRefresh();
      return;
    }

    if (this.props.mining.active && !nextProps.mining.active) {
      this.removeMiningStatusRefresh();
    }
  }

  componentWillUnmount(): void {
    this.removeMiningStatusRefresh();
  }

  addMiningStatusRefresh() {
    this.refreshTimer = window.setInterval(
      () => this.props.miningStatus(),
      2000
    );
  }

  removeMiningStatusRefresh() {
    window.clearInterval(this.refreshTimer);
  }

  handleClick = ({ theme, value }: ThemeOption) => {
    if (theme === "light") {
      this.props.selectTheme(light);
      this.setState({
        value: value,
      });
    } else if (theme === "dark") {
      this.props.selectTheme(dark);
      this.setState({
        value: value,
      });
    } else {
      return null;
    }
  };

  onMiningButtonClicked = () => {
    const mining: MiningStatus = this.props.mining;
    if (mining.miningRequest !== MiningRequestTypes.None) {
      return;
    }

    if (mining.active) {
      this.props.stopMining();
    } else {
      this.props.startMining();
    }
  };

  handleNode = ({ value }: ThemeOption) => {
    alert("Select Node type");
  };

  handleCheck = () => {
    this.setState({
      checked: true,
    });
  };

  setNodeType = ({ value }: ThemeOption) => {
    alert("Save Changes");
  };

  handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  };

  showModal = () => {
    this.setState({
      showModal: false,
    });
  };

  setBalance = ({ ticker, value }: BalanceOption) => {
    alert("set state here");
  };

  manageAddress = ({ name, address }: AddressOption) => {



  };

  render() {
    const { value, balance } = this.state;

    const mining: MiningStatus = this.props.mining;
    let buttonLabel =
      mining.miningRequest !== MiningRequestTypes.None &&
      mining.miningRequest !== MiningRequestTypes.Status ? (
        <Spinner />
      ) : mining.active ? (
        "Stop Mining"
      ) : (
        "Start Mining"
      );

    return (
      <Body>
        <Header
          title="Theme "
          description="Choose between light and dark themes"
        />
        <Form onSubmit={() => {}}>
          <Theme
            label="Select Theme"
            placeholder="Dark Theme"
            name="value"
            value={value}
            options={options}
            onClick={this.handleClick}
          />
        </Form>
       {/*  <Header
          title="Balances "
          description="Select your desired balances view and reference pair"
        />

        <BalanceDropdown
          label="Overview"
          placeholder="USD Dollars"
          name="balances"
          value={balance}
          options={balances}
          onClick={this.setBalance}
        />
        <BalanceDropdown
          label="Reference Pair"
          placeholder="Australian Dollars"
          name="balances"
          value={"Canadian Dollars"}
          options={balances}
          onClick={this.setBalance}
        /> */}

        <Header
          title="Addresses"
          description="Manage the sub-addresses connected to your account"
        />
        <>
          <AddressDropdown
            width={true}
            label="Vault Addresses"
            placeholder="List of addresses"
            type="text"
            readOnly={true}
            name="addresses"
            value={"xhv...123"}
            options={addresses}
            onClick={this.manageAddress}
          />
        </>
        <Header
          title="Mining "
          description="Mine from your computer and earn Haven"
        />
            <>
            <Input
              width={true}
              label="Status"
              placeholder="Mining Status"
              type="text"
              readOnly={true}
              name="daemon_password"
              value={
                mining.active
                  ? `Mining with ${mining.speed} hashes per second`
                  : "Not Mining"
              }
            />
            <Container>
              <Footer
                onClick={this.onMiningButtonClicked}
                loading={false}
                label={buttonLabel}
              />
            </Container>
          </>
      </Body>
    );
  }
}

const mapStateToProps = (state: DesktopAppState) => ({
  theme: state.theme,
  mining: state.mining,
});

export const SettingsDesktop = connect(mapStateToProps, {
  selectTheme,
  startMining,
  stopMining,
  miningStatus,
})(SettingsDesktopPage);
