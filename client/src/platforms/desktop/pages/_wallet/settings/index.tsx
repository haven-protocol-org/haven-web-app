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
import Input from "shared/components/_inputs/input";
import Footer from "shared/components/_inputs/footer/index.js";

import { dark, light } from "assets/styles/themes.js";
import { DesktopAppState } from "platforms/desktop/reducers";
import {
  MiningRequestTypes,
  MiningStatus
} from "platforms/desktop/reducers/mining";
import { Spinner } from "shared/components/spinner";
import {
  miningStatus,
  startMining,
  stopMining
} from "platforms/desktop/actions/mining";

type ThemeOption = { theme: string; value: string };
type NodeOptions = { value: string };

interface SettingsProps {
  theme: any;
  mining: MiningStatus;
  selectTheme: (theme: any) => void;
  startMining: () => void;
  stopMining: () => void;
  miningStatus: () => void;
}

const options: ThemeOption[] = [
  { theme: "dark", value: "Dark Theme" },
  { theme: "light", value: "Light Theme" }
];

class SettingsDesktopPage extends Component<SettingsProps, any> {
  refreshTimer: number = -1;

  state = {
    value: "",
    node: "remote"
  };

  componentDidMount() {
    this.props.miningStatus();
    if (this.props.mining.active) {
      this.addMiningStatusRefresh();
    }
    window.scrollTo(0, 0);
    this.setState({
      value: this.props.theme.value
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
        value: value
      });
    } else if (theme === "dark") {
      this.props.selectTheme(dark);
      this.setState({
        value: value
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

  setNodeType = ({ value }: ThemeOption) => {
    alert("Save Changes");
  };

  render() {
    const { value } = this.state;

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
        <Header
          title="Mining"
          description="Decentralize the Haven protocol by mining and have the chance to earn XHV as a reward"
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

        {/*<Header
          title="Nodes"
          description="Choose between running a local or remote node"
        />
        <Form onSubmit={() => {}}>
          <Nodes
            label="Select Node"
            placeholder="Select Node"
            name="node"
            value={"Remote"}
            options={nodes}
            onClick={this.handleNode}
          />
          {localeNode == true && (
            <>
              <Input
                label="Node Address"
                placeholder="Enter node address"
                type="text"
                name="node_address"
                value={""}
              />
              <Input
                label="Node Port"
                placeholder="Enter port number"
                type="text"
                name="port_number"
                value={""}
              />
              <Input
                label="Daemon Username (Optional)"
                placeholder="Enter daemon username"
                type="text"
                name="daemon_username"
                value={""}
              />
              <Input
                label="Daemon Password (Optional)"
                placeholder="Enter daemon password"
                type="text"
                name="daemon_password"
                value={""}
              />
              <Container>
                <Footer
                  onClick={this.setNodeType}
                  loading={false}
                  label="Save"
                />
              </Container>
            </>
          )}
        </Form>*/}
      </Body>
    );
  }
}

const mapStateToProps = (state: DesktopAppState) => ({
  theme: state.theme,
  mining: state.mining
});

export const SettingsDesktop = connect(
  mapStateToProps,
  { selectTheme, startMining, stopMining, miningStatus }
)(SettingsDesktopPage);
