// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { selectTheme } from "../../../actions";

// Relative Imports
import Page from "../../../components/_layout/page";
import Body from "../../../components/_layout/body";
import Menu from "../../../components/_layout/menu";
import Header from "../../../components/_layout/header";
import Input from "../../../components/_inputs/input";
import Description from "../../../components/_inputs/description";
import Form from "../../../components/_inputs/form";
import Theme from "../../../components/_inputs/theme";
import Footer from "../../../components/_inputs/footer";

import { Container } from "./styles";

import { dark, light } from "../../../constants/themes.js";

const options = [
  { theme: "dark", value: "Dark Theme" },
  { theme: "light", value: "Light Theme" }
];

class Settings extends Component {
  state = {
    status: false,
    value: "",
    reveal: false,
    validated: true
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
    const { value, reveal } = this.state;
    const seed = this.props.mnemonic_string;

    const first = seed.substring(0, 32);
    const last = seed.substring(seed.length - 32);
    const truncated = first + last;

    return (
      <Page>
        <Menu />
        <Body>
          <Header
            title="Theme "
            description="Choose between light and dark themes"
          />
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

          <Header
            title="Private Keys"
            description="Manage your wallets private keys"
          />
          <Form span="true">
            {reveal ? (
              <Description
                label="Seed Phrase"
                width="true"
                value={this.props.mnemonic_string}
                readOnly
                type={"password"}
              />
            ) : (
              <Input
                label="Seed Phrase"
                width="true"
                value={truncated}
                readOnly
                type={"password"}
              />
            )}
            <Input
              label="Public View Key"
              width="true"
              value={this.props.pub_viewKey_string}
              readOnly
              type={reveal ? "type" : "password"}
            />
            <Input
              label="Private View Key"
              width="true"
              value={this.props.sec_viewKey_string}
              readOnly
              type={reveal ? "type" : "password"}
            />
            <Input
              label="Private Spend Key"
              width="true"
              value={this.props.sec_spendKey_string}
              readOnly
              type={reveal ? "type" : "password"}
            />
            <Input
              label="Public Spend Key"
              width="true"
              value={this.props.pub_spendKey_string}
              readOnly
              type={reveal ? "type" : "password"}
            />
          </Form>
          <Container>
            <Footer
              onClick={this.toggleVisibility}
              label={this.state.reveal ? "Hide Keys" : "Show Keys"}
              validated={this.state.validated}
            />
          </Container>
        </Body>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.theme,
  ...state.keys
});

export default connect(
  mapStateToProps,
  { selectTheme }
)(Settings);
