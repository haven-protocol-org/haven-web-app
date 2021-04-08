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
    console.log("STATE:", this.state.count);
    const { count } = this.state;

    return (
      <Modal
        title="Welcome to Haven 2.0"
        description="Take a few moments to learn about your vault"
        leftButton={"Back"}
        rightButton={count === 3 ? "Finish" : "Next"}
        disabledRight={false}
        disabledLeft={count === 0 ? true : false}
        isLoading={false}
        onConfirm={count === 3 ? () => this.onCancel() : this.incrementCount}
        onCancel={count === 3 ? () => this.onCancel() : this.decrementCount}

        // onConfirm={() => this.onCancel()}
        // onCancel={() =>
        //   window.open("https://havenprotocol.org/knowledge/quick-start-guide")
        // }
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
