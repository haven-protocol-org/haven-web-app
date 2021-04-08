import * as React from "react";
import { Modal } from "shared/components/modal";
import { connect } from "react-redux";
import { hideModal } from "shared/actions/modal";
import LoginTutorial from "../../../../shared/components/tutorial/login/index.js";

class LoginOnboarding extends React.Component<any, any> {
  state = {
    count: 0,
  };

  incrementCount = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  decrementCount = () => {
    if (this.state.count === 0) {
      this.setState({
        count: 0,
      });
    } else {
      this.setState({
        count: this.state.count - 1,
      });
    }
  };

  render() {
    const { count } = this.state;

    return (
      <Modal
        title="Welcome to Haven"
        description="Lets take a moment to learn about your vault"
        leftButton={"Back"}
        rightButton={count === 3 ? "Finish" : "Next"}
        disabledRight={false}
        disabledLeft={count === 0 ? true : false}
        isLoading={false}
        onConfirm={count === 3 ? () => this.onCancel() : this.incrementCount}
        onCancel={this.decrementCount}
      >
        <LoginTutorial step={this.state.count} />
      </Modal>
    );
  }

  onCancel() {
    this.props.hideModal();
  }
}

export const LoginOnboardingModal = connect(null, { hideModal })(
  LoginOnboarding
);
