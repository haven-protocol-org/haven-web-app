// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import history from "../../../history.js";

// Relative Imports
import { Container, Haven, Logo, Brand, Button, Logout } from "./styles.js";
import Icon from "../../../assets/haven.svg";
import {IN_SESSION} from "../../../reducers/appState";

class Navigation extends Component {
  handleLogout = () => {


    history.push("/wallet/assets");
  };

  render() {
    const auth = this.props.session === IN_SESSION;
    return (
      <Container>
        <Brand to={auth === true ? "/wallet/assets" : "/"}>
          <Logo src={Icon} />
          <Haven>HAVEN</Haven>
        </Brand>
        {auth === false ? (
          <Button to="/wallet/login">Login</Button>
        ) : (
          <Logout onClick={this.handleLogout}>Logout</Logout>
        )}
      </Container>
    );
  }
}

export const mapStateToProps = state => ({
  session: state.appState.session
});

export default connect(
  mapStateToProps,
)(Navigation);
