// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { authUser, currentUser } from "../../../actions/index.js";
import history from "../../../history.js";

// Relative Imports
import { Container, Haven, Logo, Brand, Button, Logout } from "./styles.js";
import Icon from "../../../assets/haven.svg";

class Navigation extends Component {
  handleLogout = () => {
    const user = {
      auth: false,
      seedPhrase: "",
      privateKey: "",
      spendKey: "",
      viewKey: ""
    };
    this.props.currentUser(user);

    history.push("/wallet/assets");
  };

  render() {
    const { auth } = this.props.user;
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
  user: state.user
});

export default connect(
  mapStateToProps,
  { authUser, currentUser }
)(Navigation);
