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
