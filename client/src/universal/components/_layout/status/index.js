// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Container } from "./styles";
import { connect } from "react-redux";
import { getNotification } from "../../../reducers/notification";
import { removeNotification } from "../../../actions/notification";

class Status extends Component {
  componentWillReceiveProps(nextProps, nextContext) {
    if (
      nextProps.notification &&
      this.props.notification !== nextProps.notification
    ) {
      setTimeout(() => {
        this.props.removeNotification(nextProps.notification.id);
      }, 3000);
    }
  }

  render() {
    if (!this.props.notification) return null;
    return (
      <Container type={this.props.notification.type}>
        {this.props.notification.message}
      </Container>
    );
  }
}

export const mapStateToProps = state => ({
  notification: getNotification(state)
});

export default connect(
  mapStateToProps,
  { removeNotification }
)(Status);
