import * as React from "react";
import { Modal } from "shared/components/modal";
import { HavenAppState } from "platforms/desktop/reducers/index.js";
import { connect } from "react-redux";
import { hideModal } from "shared/actions/modal";
import { AuditProcessInfo } from "shared/reducers/auditProcess";
import { confirmAudit, resetAuditProcess } from "shared/actions/audit";
import Confirm from "shared/components/confirm";
import { Container, Information, Url } from "shared/components/_transactions/exchange/styles";

interface ConfirmTxModalProps {
  audit: AuditProcessInfo;
  confirmAudit: (metaList: Array<string>) => void;
  resetAuditProcess: () => void;
  hideModal: () => void;
}

class AuditM extends React.Component<any, any> {
  state = {
    checked: false,
    loading: false,
  };

  onAgreementChange = () => {
    this.setState({
      checked: !this.state.checked,
    });
  };

  onCancel() {
    this.props.hideModal();
    this.props.resetAuditProcess();
  }

  onConfirm() {
    const { metaList } = this.props.audit;

    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.props.confirmAudit(metaList);
    }, 30000);
  }

  render() {
    //const { isLoading } = this.state;
    return (
      <Modal
        title="Audit Confirmation"
        description="Please read and agree to the terms below before proceeding"
        leftButton="Cancel"
        rightButton="Confirm"
        disabledLeft={false}
        disabledRight={!this.state.checked}
        isLoading={this.state.loading}
        onCancel={() => this.onCancel()}
        onConfirm={() => this.onConfirm()}
      >
        <Information>
        <strong>Note:</strong> Your entire balance may be locked and unusable for the entirety of the ~20m unlock priority time. However, this
        amount will be unlocked and usable once the <strong>{this.props.audit.metaList.length} audit transactions</strong> is/are complete.
        To understand why this happens and how it might impact your experience,
        please{" "}
        <strong>
          <Url
            target="_blank"
            href="https://havenprotocol.org/knowledge/haven-transactions/"
          >
            click here.
          </Url>
        </strong>
        </Information>
        <Container>
          <Confirm
            description="I accept the ~20m Unlock Time, Details, Terms & Fees."
            checked={this.state.checked}
            onChange={this.onAgreementChange}
            label=""
          />
        </Container>
      </Modal>
    );
  }
}

const mapStateToProps = (state: HavenAppState) => ({
  audit: state.auditProcess
});

export const AuditModal = connect(mapStateToProps, {
  confirmAudit,
  hideModal,
  resetAuditProcess
})(AuditM);
