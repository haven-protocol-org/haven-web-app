import * as React from "react";
import {Modal} from "shared/components/modal";
import {Transaction} from "shared/components/_transactions/transfer";
import {DesktopAppState} from "platforms/desktop/reducers";
import {connect} from "react-redux";
import {hideModal} from "shared/actions/modal";
import {confirmTransfer, resetTransferProcess} from "platforms/desktop/actions/transfer";
import {TxProcessInfo} from "platforms/desktop/reducers/transferProcess";



interface ConfirmTxModalProps {
    transfer:TxProcessInfo,
    confirmTransfer: (hex: string) => void;
    resetTransferProcess: () => void;
    hideModal:() => void;
}



class ConfirmTxModal extends React.Component<ConfirmTxModalProps, any> {



    render () {


        const {paymentId, fromTicker, fromAmount, address, fee} = this.props.transfer;

        return (

            <Modal
                title="Transfer Confirmation"
                description="Please confirm and finalize your transfer transaction"
                leftButton="Cancel"
                rightButton="Confirm"
                disabled={false}
                onConfirm={() => this.onConfirm()}
                onCancel={() => this.onCancel()}
            >
                <Transaction
                    onChange={() => {}}
                    checked={true}
                    paymentId={paymentId === "" ? "--" : paymentId}
                    recipientAddress={
                        address === "" ? "--" : address
                    }
                    ticker={
                        fromTicker === null ? "--" : fromTicker
                    }
                    transferAmount={fromAmount === null ? "--" : fromAmount}
                    fee={fee}
                />
            </Modal>

        )}


    onCancel() {

        this.props.hideModal();
        this.props.resetTransferProcess();
    }


    onConfirm() {

        const {metaData} = this.props.transfer;
        this.props.confirmTransfer(metaData);

    }

}



const mapStateToProps = (state: DesktopAppState) => ({
    transfer:state.transferProcess
});

export const ConfirmTxModalDesktop = connect(
    mapStateToProps,
    { confirmTransfer, hideModal, resetTransferProcess }
)(ConfirmTxModal);

