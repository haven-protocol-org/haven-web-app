import * as React from "react";
import { Modal } from "shared/components/modal";
import { HavenAppState } from "platforms/desktop/reducers/index.js";
import { connect } from "react-redux";
import { hideModal } from "shared/actions/modal";
import LoginTutorial from "../../../../shared/components/tutorial/login/index.js";

class LoginOnboarding extends React.Component<any, any> {
  render() {
    return (
      <Modal
        title="Welcome to Haven"
        description="Take a few moments to learn about your vault"
        leftButton="Learn More"
        rightButton="Ok, I got it"
        disabled={false}
        isLoading={false}
        onConfirm={() => this.onCancel()}
        onCancel={() =>
          window.open("https://havenprotocol.org/knowledge/quick-start-guide")
        }
      >
        <LoginTutorial />
      </Modal>
    );
  }

  onCancel() {
    this.props.hideModal();
  }
}

const mapStateToProps = (state: HavenAppState) => ({});

export const LoginOnboardingModal = connect(null, { hideModal })(
  LoginOnboarding
);
