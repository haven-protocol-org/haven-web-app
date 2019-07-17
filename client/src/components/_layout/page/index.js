// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { transfer } from "../../../actions";

// Relative Imports
import { Container } from "./styles";
import Status from "../status/index.js";

class Page extends Component {
  state = {
    status: false
  };

  render() {
    return (
      <Container>
        {this.props.children}
        {this.state.status && (
          <Status>
            <span role="img" aria-label="Money">
              💸
            </span>
            <span>
              {this.props.latestTransfer.error}
              {this.props.latestTransfer.info}
            </span>
            Congrats, your transfer was submitted. Redirecting you in{" "}
            {this.state.time}'s
          </Status>
        )}
      </Container>
    );
  }
}

export const mapStateToProps = state => ({
  latestTransfer: state.transfer,
  transferList: state.transferList.list
});

export default connect(
  mapStateToProps,
  { transfer }
)(Page);
