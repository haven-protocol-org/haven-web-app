import * as React from "react";
import { Modal } from "shared/components/modal";
import { HavenAppState } from "platforms/desktop/reducers/index.js";
import { connect } from "react-redux";
import { hideModal } from "shared/actions/modal";
import LoginTutorial from "../../../../shared/components/tutorial/login/index.js";
import { Label } from "../../../../assets/styles/type.js";

class RescanBCM extends React.Component<any, any> {
  render() {
    return (
      <Modal
        title="Rescanning Wallet"
        description={
          "We are rescanning from your first incoming TX at height " +
          this.props.restoreHeight
        }
        leftButton="..."
        rightButton="..."
        disabled={true}
        isLoading={true}
        onConfirm={() => 1}
        onCancel={() => 1}
      >
        <Label>
          If you have a trasnaction that's stuck, then you can click the Refresh
          button below to rescan the blockchain. Once the rescan has started the
          vault will become unresponsive.
        </Label>
      </Modal>
    );
  }

  onCancel() {
    this.props.hideModal();
  }
}

const mapStateToProps = (state: HavenAppState) => ({
  restoreHeight: state.walletSession.restoreHeight,
});

export const RescanBCMModal = connect(mapStateToProps, { hideModal })(
  RescanBCM
);
