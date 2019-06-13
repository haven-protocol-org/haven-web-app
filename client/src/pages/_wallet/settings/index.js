// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { selectTheme } from "../../../actions";

// Relative Imports
import Page from "../../../components/_layout/page";
import Body from "../../../components/_layout/body";
import Menu from "../../../components/_layout/menu";
import Header from "../../../components/_layout/header";
import Status from "../../../components/_layout/status/";
import Toggle from "../../../components/_inputs/toggle";
import Form from "../../../components/_inputs/form";
import Theme from "../../../components/_inputs/theme";

import { dark, light } from "../../../constants/themes.js";

const options = [
  { theme: "dark", value: "Dark Theme" },
  { theme: "light", value: "Light Theme" }
];

class Settings extends Component {
  state = {
    status: false,
    value: "",
    reveal: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({
      value: this.props.theme.value
    });
  }

  handleClick = ({ theme, value }) => {
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

  toggleVisibility = () => {
    this.setState({
      reveal: !this.state.reveal
    });
  };

  render() {
    const { status, value, type, reveal } = this.state;
    const { seedPhrase, privateKey, spendKey, viewKey } = this.props.user;
    return (
      <Page>
        <Menu />
        <Body>
          <Header title="Settings" description="Lorem impsum" />
          <Form span="true">
            <Theme
              label="Select Theme"
              placeholder="Dark Theme"
              name="value"
              value={value}
              options={options}
              onClick={this.handleClick}
            />
          </Form>

          <Header title="Private Keys" description="Lorem impsum" />
          <Form span="true">
            <Toggle
              label="Seed Phrase"
              placeholder="Select Asset"
              width="true"
              value={seedPhrase}
              readOnly
              type={type}
              reveal={reveal}
              attrs={reveal}
              onClick={this.toggleVisibility}
            />
            <Toggle
              label="Private Key"
              placeholder="Enter amount"
              width="true"
              value={privateKey}
              readOnly
              reveal={reveal}
              type={type}
            />
            <Toggle
              label="Spend Key"
              placeholder="Select Asset"
              width="true"
              value={spendKey}
              readOnly
              reveal={reveal}
              type={type}
            />
            <Toggle
              label="View Key"
              placeholder="Select Asset"
              width="true"
              value={viewKey}
              readOnly
              reveal={reveal}
              type={type}
            />
          </Form>
        </Body>
        {status ? <Status>Pending transaction</Status> : null}
      </Page>
    );
  }
}

export const mapStateToProps = state => ({
  theme: state.theme,
  user: state.user
});

export default connect(
  mapStateToProps,
  { selectTheme }
)(Settings);
