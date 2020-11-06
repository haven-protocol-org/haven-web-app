import CreateSeed from "../../../../shared/components/_create/create_seed/index.js";

import * as React from "react";
import { Modal } from "shared/components/modal";
import { Confirm } from "shared/components/modal/styles";
import ManageAddresses from "shared/components/modal_children/manage_addresses";
import Input from "shared/components/_inputs/input";

interface ManageAdressState {
  checked: boolean;
  disabled: boolean;
  manage_name: string;
  full_address: string;
}

interface ManageAdressProps {}

export class ManageAddressModal extends React.Component<any, any> {
  state = {
    manage_name: "",
    full_address:
      "hvtaeLT9QfHS6FG8o6gR1AgPXRtje9DyGNGBLidjrmaLcw9rJFWdRwg9g9a57wA77vE31RtobBS37Pja8n3L5MsEf4jxdiAv2oU",
  };

  handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value });
  };

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
          isLoading={false}
          disabled={false}
        >
          <ManageAddresses>
            <Input
              width={true}
              label="Address Name"
              placeholder="Name of address"
              type="text"
              name="manage_name"
              value={this.state.manage_name}
              onChange={this.handleChange}
            />
            <CreateSeed
              label="Address"
              value={this.state.full_address}
              rows={4}
              readOnly={true}
            />
          </ManageAddresses>
        </Modal>
      </>
    );
  }

  onCancel() {}

  onConfirm() {}
}

// <Confirm
//   checked={this.state.checked}
//   onChange={this.handleCheck}
//   label="I accept and agree"
//   description={`I understand that I cannot recieve funds to my Address Name only the Full Address and any funds recieved to the Address Name will be lost.`}
// />
