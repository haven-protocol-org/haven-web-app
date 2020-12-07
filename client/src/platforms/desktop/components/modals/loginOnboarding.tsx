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
        description="Before you get started lets learn a few things"
        leftButton="Cancel"
        rightButton="Ok, I got it"
        disabled={false}
        isLoading={false}
        onConfirm={() => this.onCancel()}
        onCancel={() => this.onCancel()}
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
