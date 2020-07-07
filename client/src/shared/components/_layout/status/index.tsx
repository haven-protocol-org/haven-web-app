// Library Imports
// Relative Imports
import { Container, Content } from "./styles";
import {
  getNotification,
  HavenNotification,
  NotificationDuration,
} from "shared/reducers/notification";
import { removeNotification } from "shared/actions/notification";
import { DesktopAppState } from "platforms/desktop/reducers";
import { WebAppState } from "platforms/web/reducers";
import { connect } from "react-redux";
import React from "react";

interface StatusProps {
  notification: HavenNotification | undefined;
  removeNotification: typeof removeNotification;
}

class Status extends React.Component<StatusProps, any> {
  componentDidUpdate(
    prevProps: Readonly<StatusProps>,
    prevState: Readonly<any>,
    snapshot?: any
  ): void {
    // check if we handle a new notification
    if (
      this.props.notification &&
      this.props.notification !== prevProps.notification &&
      this.props.notification.duration !== NotificationDuration.STICKY
    ) {
      setTimeout(() => {
        this.props.removeNotification(this.props.notification!.id);
      }, this.props.notification.duration);
    }
  }

  render() {
    if (!this.props.notification) return null;
    return (
      <Container>
        <Content type={this.props.notification.type}>
          {this.props.notification.message}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state: DesktopAppState | WebAppState) => ({
  notification: getNotification(state),
});

export const StatusComponent = connect(mapStateToProps, { removeNotification })(
  Status
);
