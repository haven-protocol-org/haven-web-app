import * as React from "react";
import { Modal } from "shared/components/modal";
import QrCode from "../../../../shared/components/qrCode/index.js";
import { HavenAppState } from "platforms/desktop/reducers/index.js";
import { connect } from "react-redux";
import { hideModal } from "shared/actions/modal";

class LoginOnboarding extends React.Component<any, any> {
  render() {
    return (
      <Modal
        title="Welcome to Haven"
        description="lorem ipsum text"
        leftButton="Cancel"
        rightButton="Finish"
        disabled={false}
        isLoading={false}
        onConfirm={() => this.onCancel()}
        onCancel={() => this.onCancel()}
      >
        <p>SHOW ONBOARDING MODAL</p>
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
