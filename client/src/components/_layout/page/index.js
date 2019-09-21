// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";

// Relative Imports
import { Container } from "./styles";

class Page extends Component {
  state = {
    status: false
  };

  render() {
    return <Container>{this.props.children}</Container>;
  }
}

export const mapStateToProps = state => ({
  latestTransfer: state.transfer,
  transferList: state.transferList.list
});

export default connect(
  mapStateToProps,
  null
)(Page);
