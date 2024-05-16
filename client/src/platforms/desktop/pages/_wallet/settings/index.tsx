import React, { Component } from "react";
import { connect } from "react-redux";

// Library Imports
import { selectTheme } from "shared/actions";
// Relative Imports
import Body from "shared/components/_layout/body";
import Header from "shared/components/_layout/header";
import Form from "shared/components/_inputs/form";
import Theme from "shared/components/_inputs/theme";
import { showModal } from "shared/actions/modal";
import { MODAL_TYPE } from "shared/reducers/modal";
// For the miner
import { selectisLocalNode } from "platforms/desktop/reducers/selectedNode";
import { DesktopAppState } from "platforms/desktop/reducers";
import {
  MiningRequestTypes,
  MiningStatus,
} from "platforms/desktop/reducers/localMining";
import {downloadTransfers} from "shared/actions/transferHistory";
import {
  miningStatus,
  startMining,
  stopMining,
} from "platforms/desktop/actions/localMining";
import { HavenNodeSetting } from "platforms/desktop/pages/_wallet/settings/node/nodeSetting";
import { Container } from "./styles";
import DoubleFooter from "shared/components/_inputs/double_footer";
import Footer from "shared/components/_inputs/footer";

type ThemeOption = { theme: string; value: string };
type BalanceOption = { ticker: string; value: string; code: string };
type AddressOption = { name: string; address: string };

export interface NodeSettingProps {
  localNode: boolean;
}

interface SettingsProps {
  theme: any;
  balance: any;
  mining: MiningStatus;
  selectTheme: (theme: any) => void;
  startMining: () => void;
  stopMining: () => void;
  downloadTransfers: (type: string) => void;
  onChange: () => void;
  miningStatus: () => void;
  title: string;
  description: string;
  localNode: boolean;
  showModal: (modalType: MODAL_TYPE) => void;
}

const options: ThemeOption[] = [
  { theme: "dark", value: "Dark Theme" },
  { theme: "light", value: "Light Theme" },
  { theme: "sepia", value: "Sepia Theme" },
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
    this.props.selectTheme(theme);
    this.setState({
      value: value,
    });
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

  downloadTxJson = () => {
    this.props.downloadTransfers("json");
  };

  downloadTxCsv = () => {
    this.props.downloadTransfers("csv");
  };

  refreshVault = () => {
    this.props.showModal(MODAL_TYPE.RescanBC);
  };

  handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  };

  setBalance = ({ ticker, value }: BalanceOption) => {
    alert("set state here");
  };

  manageAddress = ({ name, address }: AddressOption) => {};

  render() {
    const { value } = this.state;

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
        <HavenNodeSetting />
        <Header
          title="Transaction History"
          description="Download your transaction history"
        />
        <Container>
            <DoubleFooter
              // Left Section
              leftLabel={"Download JSON"}
              leftDisabled={false}
              leftLoading={false}
              leftOnClick={this.downloadTxJson}
              leftVisible={true}
              // Right Section
              rightLabel={"Download CSV"}
              rightDisabled={false}
              rightLoading={false}
              rightOnClick={this.downloadTxCsv}
            />
          </Container>
        <Header
          title="Refresh Vault"
          description="Use this option to resolve issues with transactions not displaying correctly in the vault"
        />
        <Container>
            <Footer
              label={"Refresh Vault"}
              disabled={false}
              loading={false}
              onClick={this.refreshVault}
            />
        </Container>
      </Body>
    );
  }
}

const mapStateToProps = (state: DesktopAppState) => ({
  theme: state.theme,
  mining: state.mining,
  localNode: selectisLocalNode(state.connectedNode),
});

export const SettingsDesktop = connect(mapStateToProps, {
  selectTheme,
  startMining,
  stopMining,
  miningStatus,
  downloadTransfers,
  showModal
})(SettingsDesktopPage);
