// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { selectTheme } from "../../../actions";
// Relative Imports
import Body from "../../../components/_layout/body";
import Header from "../../../components/_layout/header";
import Input from "../../../components/_inputs/input";
import Description from "../../../components/_inputs/description";
import RevealSeed from "../../../components/_inputs/revealSeed";

import Form from "../../../components/_inputs/form";
import Theme from "../../../components/_inputs/theme";
import DoubleFooter from "../../../components/_inputs/double_footer";

import { Container } from "./styles";
import { storeKeyFileToDisk } from "platforms/web/actions/storage";
import { dark, light, sepia } from "../../../../assets/styles/themes.js";
import { HavenAppState } from "platforms/desktop/reducers";
import { IKeys } from "typings";
import { isTemporaryWallet as selectIsTemporaryWallet } from "shared/reducers/walletSession";

const options = [
  { theme: "dark", value: "Dark Theme" },
  { theme: "light", value: "Light Theme" },
  { theme: "sepia", value: "Sepia Theme" },
];

interface SettingsProps extends IKeys {
  theme: any;
  selectTheme: (theme: any) => void;
  chain: any;
  wallet: any;
  storeKeyFileToDisk: (walletname: string) => void;
  tempWallet: boolean;
}

interface SettingsState {
  status: boolean;
  value: string;
  reveal: boolean;
  validated: boolean;
  psk: string;
  seed: string;
  synced: boolean;
}

class SettingsPage extends Component<SettingsProps, SettingsState> {
  state: SettingsState = {
    status: false,
    value: "",
    reveal: false,
    validated: true,
    psk: "",
    seed: "",
    synced: true,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({
      value: this.props.theme.value,
    });
  }

  handleClick = ({ theme, value }: { theme: string; value: string }) => {
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
    } else if (theme === "sepia") {
      this.props.selectTheme(sepia);
      this.setState({
        value: value,
      });
    } else {
      return null;
    }
  };

  toggleVisibility = () => {
    this.setState({
      reveal: !this.state.reveal,
    });
  };

  downloadKeystore = () => {
    this.props.storeKeyFileToDisk(this.props.wallet.activeWallet);
  };

  render() {
    const { value, reveal } = this.state;
    const seed = this.props.mnemonic;
    let truncated = "";
    if (seed.length > 0) {
      const first = seed.substring(0, 32);
      const last = seed.substring(seed.length - 32);
      truncated = first + last;
    }

    console.log(" PROPS", this.props);

    const windowWidth = window.innerWidth;
    const { nodeHeight, walletHeight } = this.props.chain;

    return (
      <Body>
        <Header
          title="Theme "
          description="Choose between light and dark themes"
        />
        <Form>
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
          title="Private Keys"
          description="Manage your vault's private keys"
        />
        <Form>
          <>
            {reveal ? (
              <RevealSeed
                label="Seed Phrase"
                name="Seed Phrase"
                error=""
                value={this.props.mnemonic}
                readOnly
              />
            ) : (
              <Input
                name="Seed Phrase"
                placeholder=""
                label="Seed Phrase"
                width={true}
                value={this.props.mnemonic}
                readOnly
                type={reveal ? "type" : "password"}
              />
            )}
            <Input
              name="Public View Key"
              placeholder=""
              label="Public View Key"
              width={true}
              value={this.props.publicView}
              readOnly
              type={reveal ? "type" : "password"}
            />
            <Input
              name="Private View Key"
              placeholder=""
              label="Private View Key"
              width={true}
              value={this.props.privateView}
              readOnly
              type={reveal ? "type" : "password"}
            />
            <Input
              name="Private Spend Key"
              placeholder=""
              label="Private Spend Key"
              width={true}
              value={this.props.privateSpend}
              readOnly
              type={reveal ? "type" : "password"}
            />
            <Input
              name="Public Spend Key"
              placeholder=""
              label="Public Spend Key"
              width={true}
              value={this.props.publicSpend}
              readOnly
              type={reveal ? "type" : "password"}
            />
          </>
        </Form>
        <Container>
          <DoubleFooter
            // Left section
            leftLabel={"Download Vault File"}
            leftDisabled={walletHeight !== nodeHeight || this.props.tempWallet}
            leftLoading={false}
            leftOnClick={this.downloadKeystore}
            leftVisible={!this.props.tempWallet}
            // Right section
            rightLabel={this.state.reveal ? "Hide Keys" : "Show Keys"}
            rightDisabled={walletHeight !== nodeHeight ? true : false}
            rightLoading={false}
            rightOnClick={this.toggleVisibility}
          />
        </Container>
      </Body>
    );
  }
}

const mapStateToProps = (state: HavenAppState) => ({
  theme: state.theme,
  chain: state.chain,
  wallet: state.walletSession,
  tempWallet: selectIsTemporaryWallet(state),
});

export const Settings = connect(mapStateToProps, {
  selectTheme,
  storeKeyFileToDisk,
})(SettingsPage);
