// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { selectTheme } from "../../../actions";

import PropTypes from "prop-types";

// Relative Imports
import Body from "../../../components/_layout/body";
import Header from "../../../components/_layout/header";
import Input from "../../../components/_inputs/input";
import Description from "../../../components/_inputs/description";
import Form from "../../../components/_inputs/form";
import Theme from "../../../components/_inputs/theme";
import Footer from "../../../components/_inputs/footer";

import { Container } from "./styles";

import { dark, light } from "../../../../assets/styles/themes.js";

const options = [
  { theme: "dark", value: "Dark Theme" },
  { theme: "light", value: "Light Theme" }
];

class SettingsPage extends Component {
  state = {
    status: false,
    value: "",
    reveal: false,
    validated: true,
    psk: "",
    seed: ""
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
    const seed = this.props.seed;
    let truncated = "";
    if (seed.length > 0) {
      const first = seed.substring(0, 32);
      const last = seed.substring(seed.length - 32);
      truncated = first + last;
    }

    const windowWidth = window.innerWidth;

    return (
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
            <>
              <Description
                label="Seed Phrase"
                width="true"
                value={this.props.seed}
                readOnly
                type={reveal ? "type" : "password"}
                rows={windowWidth < 600 && "6"}
              />
              <Description
                label="Public View Key"
                width="true"
                value={this.props.pub_viewKey_string}
                readOnly
                type={reveal ? "type" : "password"}
                rows={windowWidth < 600 && "2"}
              />
              <Description
                label="Private View Key"
                width="true"
                value={this.props.sec_viewKey_string}
                readOnly
                type={reveal ? "type" : "password"}
                rows={windowWidth < 600 && "2"}
              />
              <Description
                label="Private Spend Key"
                width="true"
                value={this.props.psk}
                readOnly
                type={reveal ? "type" : "password"}
                rows={windowWidth < 600 && "2"}
              />
              <Description
                label="Public Spend Key"
                width="true"
                value={this.props.pub_spendKey_string}
                readOnly
                type={reveal ? "type" : "password"}
                rows={windowWidth < 600 && "2"}
              />
            </>
          ) : (
            <>
              <Input
                label="Seed Phrase"
                width="true"
                value={truncated}
                readOnly
                type={"password"}
              />
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
                value={this.props.psk}
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
            </>
          )}
        </Form>
        <Container>
          <Footer
            onClick={this.toggleVisibility}
            label={this.state.reveal ? "Hide Keys" : "Show Keys"}
            validated={this.state.validated}
          />
        </Container>
      </Body>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.theme
});

export const Settings = connect(
  mapStateToProps,
  { selectTheme }
)(SettingsPage);

Settings.propTypes = {
  psk: PropTypes.string.isRequired,
  seed: PropTypes.string.isRequired,
  sec_viewKey_string: PropTypes.string.isRequired,
  pub_spendKey_string: PropTypes.string.isRequired,
  pub_viewKey_string: PropTypes.string.isRequired
};
