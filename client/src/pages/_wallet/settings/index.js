// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { selectTheme } from "../../../actions";
import { queryKeys } from "../../../actions";

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
import {NO_KEY} from "../../../reducers/keys";

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


    if (this.props.privateViewKey.key === NO_KEY) {
      this.props.queryKeys();
    }

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
    const  privateKey = "private key";
    const  spendKey = "spend key";
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
              value={this.props.mnemonicKey.key}
              readOnly
              type={type}
              reveal={reveal}
              attrs={reveal}
              onClick={this.toggleVisibility}
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
              value={this.props.privateViewKey.key}
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
  ...state.keys

});

export default connect(
  mapStateToProps,
  { selectTheme, queryKeys }
)(Settings);
