// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Container } from "./styles";
import {connect} from "react-redux";
import {getNotification} from "../../../reducers/notification";

class Status extends Component {
  render() {

    if (!this.props.notification)
      return null;
    return <Container>{this.props.children}</Container>;
  }
}

export const mapStateToProps = state => ({
  notification: getNotification(state)
});

export default connect(
    mapStateToProps,

)(Status);
