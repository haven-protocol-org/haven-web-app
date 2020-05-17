import { Description } from "assets/styles/type";
import * as React from "react";
import { Modal } from "shared/components/modal";
import { Confirm } from "shared/components/modal/styles";
import ManageAddresses from "shared/components/modal_children/manage_addresses";
import Input from "shared/components/_inputs/input";


interface ManageAdressState {
  checked: boolean;
}

interface ManageAdressProps {
  
}


export class ManageAddressModal extends React.Component<any, any> {
  handleChange: any;
  handleCheck: any;
  render() {
    return (
      <>
        <Modal
          title="Manage Address"
          description="Name your vault addresses for easier recognition"
          onConfirm={() => this.onConfirm()}
          onCancel={() => this.onCancel()}
          leftButton="Cancel"
          rightButton="Save"
          disabled={!this.state.checked}
        >
          <ManageAddresses>
            <Input
              width={true}
              label="Address Name"
              placeholder="Name of address"
              type="text"
              name="manage_name"
              value={'test'}
              onChange={this.handleChange}
            />
            <Description
              width={true}
              label="Full Address"
              placeholder="Mining Status"
              type="text"
              readOnly={true}
              name="selected_address"
              value={'test'}
            />

            <Confirm
              checked={this.state.checked}
              onChange={this.handleCheck}
              label="I accept and agree"
              description={`I understand that I cannot recieve funds to my Address Name only the Full Address and any funds recieved to the Address Name will be lost.`}
            />
          </ManageAddresses>
        </Modal>
      </>
    );
  }



  onCancel() {
    // this.props.resetTransferProcess();
  }


onConfirm() {
  // this.props.confirmTransfer(metaData);
}




}
