import Nodes from "shared/components/_inputs/nodes";
import Header from "shared/components/_layout/header";
import Form from "shared/components/_inputs/form";
import Input from "shared/components/_inputs/input";
import { Container, Intstructions } from "../styles";

import DoubleFooter from "shared/components/_inputs/double_footer/index.js";
import React, { SyntheticEvent } from "react";
import { DesktopAppState } from "platforms/desktop/reducers";
import { connect } from "react-redux";
import { selectisLocalNode } from "platforms/desktop/reducers/selectedNode";
import { changeNodeForWallet, disconnectNode } from "platforms/desktop/actions/selectNode";
import { NodeConnection, NodeLocation, SelectedNode } from "platforms/desktop/types";
import { Information } from "assets/styles/type.js";
import { createNodeOptions, getDefaultNode } from "platforms/desktop/pages/_wallet/settings/node/options";

export enum NodeSelectionType {
  local,
  remote,
  custom,
}

export interface NodeOption {
  trusted: boolean;
  name: string;
  location: NodeLocation;
  address: string;
  port: string;
  selectionType: NodeSelectionType;
  username?: string;
  password?: string;
}

interface NodeSettingProps {
  localNode: boolean;
  node: SelectedNode & NodeConnection;
  isConnected: boolean;
  nodeOptions: NodeOption[];
  defaultNode: NodeOption;
  disconnectNode: () => void;
  changeNodeForWallet: (
    selectedNodeOption: NodeOption,
    address: string,
    port: string
  ) => void;
}

interface NodeSettingState {
  selectedNodeOption: NodeOption;
  address: string;
  port: string;
  isConnecting: boolean;
  locked: boolean;
}

class NodeSettingComponent extends React.Component<
  NodeSettingProps,
  NodeSettingState
> {
  state = {
    address: this.props.node.address!,
    isConnecting: this.props.node.isConnecting,
    locked: this.props.isConnected,
    selectedNodeOption: this.props.node.location === NodeLocation.None ? this.props.defaultNode
    :  
    this.props.nodeOptions.find(
      (nodeOption) => nodeOption.address === this.props.node.address
    )!,
    port: this.props.node.port!,
  };

  onConnect = (e: SyntheticEvent) => {
    e.preventDefault();

    const { address, selectedNodeOption, port } = this.state;

    if (
      selectedNodeOption.address === this.props.node.address &&
      selectedNodeOption.port === this.props.node.port &&
      this.props.isConnected === true
    ) {
      return;
    }

    if (selectedNodeOption.selectionType === NodeSelectionType.custom) {
      this.props.changeNodeForWallet(selectedNodeOption, address, port);
    }
    else {
      this.props.changeNodeForWallet(selectedNodeOption, selectedNodeOption.address, selectedNodeOption.port);
    }


    this.setState({locked: true});

  };

  selectLocation = (option: NodeOption) => {
    this.setState({
      selectedNodeOption: option,
      address: option.address,
      port: option.port,
    });
  };

  handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState<never>({
      [name]: value,
    });
  };

  onDisconnect = () => {

    this.props.disconnectNode();
    this.setState({
      locked: false,
    });
  };

   static getDerivedStateFromProps(
    nextProps: Readonly<NodeSettingProps>,
    prevState: Readonly<NodeSettingState>
  ) {
    
    let newState:Partial<NodeSettingState> = {};

    //track previous isConnecting state
    if (prevState.isConnecting !== nextProps.node.isConnecting) {
      newState = {isConnecting: nextProps.node.isConnecting}
    }


    //when we attempt to connect to another node, but failed, lets unlock again
    if (prevState.isConnecting && !nextProps.node.isConnecting && !nextProps.node.isWalletConectedToDaemon && !prevState.locked)
    {
        newState = {...newState, locked: false};
    }

    return newState;
  }


  buttonLogic = () => {
    const { locked } = this.state;
    const { isConnected } = this.props;
    const { isConnecting } = this.props.node;

    if (isConnecting ) {
      // Don't change this label as it's equality checked on child
      return "Loading";
    } else if (locked && isConnected === true) {
      return "Connected";
    } else if (!locked) {
      return "Connect";
    } else {
      return "Connect";
    }
  };

  render() {
    const selectedNodeOption = this.state.selectedNodeOption;
    const { locked } = this.state;

    return (
      <>
        <Header
          title="Nodes"
          description="Choose between running a local or remote node"
        />
        <Form onSubmit={this.onConnect}>
          <Nodes
            label={"Select Node"}
            placeholder="Select Node"
            name="node"
            value={this.state.selectedNodeOption.name}
            options={this.props.nodeOptions}
            onClick={this.selectLocation}
            disabled={this.state.locked}
          />
          {selectedNodeOption.selectionType === NodeSelectionType.custom && (
            <>
              <Input
                label="Node Address"
                placeholder="Enter node address"
                type="text"
                name="address"
                value={this.state.address}
                onChange={this.handleChange}
              />
              <Input
                label="Node Port"
                placeholder="Enter port number"
                type="text"
                name="port"
                value={this.state.port}
                onChange={this.handleChange}
              />
            </>
          )}

          <Container>
            <Intstructions>
              <Information>
                {this.props.isConnected
                  ? "Vault is connected to "
                  : this.props.node.location !== NodeLocation.None && this.props.node.isConnecting
                  ? "Vault is trying to connect to "
                  : "Vault is not connected to "}
                <strong>{this.state.selectedNodeOption.name}</strong>. Change
                nodes by clicking <strong>Disconnect</strong>, then select a new
                node from the dropdown, then click <strong>Connect</strong>.
              </Information>
            </Intstructions>
            <DoubleFooter
              // Left section
              leftLabel={"Disconnect"}
              leftDisabled={!locked}
              leftOnClick={this.onDisconnect}
              leftLoading={false}
              leftVisible={true}
              // Right section
              rightOnClick={this.onConnect}
              rightDisabled={locked}
              rightLoading={false}
              rightLabel={this.buttonLogic()}
            />
          </Container>
        </Form>
      </>
    );
  }
}

const mapStateToProps = (state: DesktopAppState) => ({
  node: state.connectedNode,
  isConnected: state.connectedNode.isWalletConectedToDaemon,
  localNode: selectisLocalNode(state.connectedNode),
  nodeOptions: createNodeOptions(state.connectedNode, state.nodeList),
  defaultNode: getDefaultNode(state.nodeList)
});

export const HavenNodeSetting = connect(mapStateToProps, {
  changeNodeForWallet, disconnectNode
})(NodeSettingComponent);
