// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";

// Relative Imports
import { Container, Haven, Logo, Brand, Button, Logout } from "./styles.js";
import Icon from "../../../assets/haven.svg";
import { closeWallet } from "../../../actions";
import {selectIsLoggedIn} from "../../../reducers/account";
import {HeadingWrapper} from "../../../pages/_public/welcome/styles";
import {APP_VERSION, NET_TYPE_NAME} from "../../../constants/env";

class Navigation extends Component {
  handleLogout = () => {
    this.props.logout();
    //TODO handle routing to private/public by checking session in root component
    //history.push("/");
  };

  render() {
    const auth = this.props.isLoggedIn;
    return (
      <Container>
        <Brand to={auth === true ? "/wallet/assets" : "/"}>
          <Logo src={Icon} />
          <Haven>HAVEN</Haven>
        </Brand>
        <span style={{color: 'white'}}>V {APP_VERSION} {NET_TYPE_NAME}</span>
        {auth === false ? (
          <Button to="/login">Login</Button>
        ) : (
          <Logout onClick={this.handleLogout}>Logout</Logout>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn:selectIsLoggedIn(state)
});

export default connect(
  mapStateToProps,
  { logout: closeWallet }
)(Navigation);
