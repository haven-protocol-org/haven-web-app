import Nodes from "shared/components/_inputs/nodes";
import Header from "shared/components/_layout/header";
import Form from "shared/components/_inputs/form";
import Input from "shared/components/_inputs/input";
import { Container } from "./styles";

import DoubleFooter from "shared/components/_inputs/double_footer/index.js";
import React, { SyntheticEvent } from "react";
import { DesktopAppState } from "platforms/desktop/reducers";
import { connect } from "react-redux";
import { selectisLocalNode } from "platforms/desktop/reducers/havenNode";
import { setHavenNode } from "platforms/desktop/actions/havenNode";
import { NodeLocation, NodeState } from "platforms/desktop/types";
import { REMOTE_NODES } from "platforms/desktop/nodes";
import { selectIsWalletSyncingRemote } from "platforms/desktop/reducers/walletRPC";
import { Information } from "../../../../../assets/styles/type.js";

enum NodeSelectionType {
  local,
  remote,
  custom,
}

export interface NodeOption {
  name: string;
  location: NodeLocation;
  address: string;
  port: string;
  selectionType: NodeSelectionType;
}

export interface NodeSettingProps {
  isRemoteSyncing: boolean;
  localNode: boolean;
  node: NodeState;
  isConnected: boolean;
  nodeOptions: NodeOption[];
  setHavenNode: (
    selectedNodeOption: NodeOption,
    address: string,
    port: string
  ) => void;
}

export interface NodeSettingState {
  selectedNodeOption: NodeOption;
  address: string;
  port: string;
  connected: boolean;
  locked: boolean;
}

class NodeSettingComponent extends React.Component<
  NodeSettingProps,
  NodeSettingState
> {
  state = {
    address: this.props.node.address,
    connected: this.props.isConnected,
    locked: this.props.isConnected,
    selectedNodeOption: this.props.nodeOptions.find(
      (nodeOption) => nodeOption.address === this.props.node.address
    )!,
    port: this.props.node.port,
  };

  onConnect = (e: SyntheticEvent) => {
    e.preventDefault();

    const { address, selectedNodeOption, port } = this.state;

    if (address === this.props.node.address && port === this.props.node.port) {
      return;
    }

    this.props.setHavenNode(selectedNodeOption, address, port);
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
    this.setState({
      locked: false,
    });
  };

  static getDerivedStateFromProps(
    nextProps: Readonly<NodeSettingProps>,
    prevState: Readonly<NodeSettingState>
  ) {
    let newState = {};

    // when we are connected to a daemon again lock
    if (nextProps.isConnected && !prevState.connected) {
      newState = { ...newState, locked: true };

      if (nextProps.node.address !== prevState.address) {
        const changes = {
          address: nextProps.node.address,
          selectedNodeOption: nextProps.nodeOptions.find(
            (nodeOption) => nodeOption.address === nextProps.node.address
          )!,
        };
        newState = { ...newState, ...changes };
      }
    }

    if (nextProps.isConnected !== prevState.connected) {
      newState = { ...newState, connected: nextProps.isConnected };
    }

    return newState;
  }

  render() {
    const selectedNodeOption = this.state.selectedNodeOption;

    const { isRemoteSyncing } = this.props;
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
            <Information>
              Your vault is connected to a {this.state.selectedNodeOption.name}.
              To change nodes click "Disconnect", select a new node from the
              dropdown, then click "Connect".
            </Information>
            <DoubleFooter
              // Left section
              onClick={() => {}}
              leftLabel={"Disconnect"}
              leftDisabled={!locked}
              leftOnClick={this.onDisconnect}
              leftLoading={false}
              // Right section
              rightOnClick={this.onConnect}
              rightDisabled={locked}
              rightLoading={isRemoteSyncing}
              rightLabel={isRemoteSyncing === true ? "Syncing..." : "Connect"}
            />
          </Container>
        </Form>
      </>
    );
  }
}

const mapStateToProps = (state: DesktopAppState) => ({
  node: state.havenNode,
  isRemoteSyncing: selectIsWalletSyncingRemote(state),
  isConnected: state.walletRPC.isConnectedToDaemon,
  localNode: selectisLocalNode(state.havenNode),
  nodeOptions: createNodeOptions(state.havenNode),
});

export const HavenNodeSetting = connect(mapStateToProps, {
  setHavenNode,
})(NodeSettingComponent);

const createNodeOptions = (havendState: NodeState): NodeOption[] => {
  const remoteNodes: NodeOption[] = REMOTE_NODES.map((node) => {
    const host = new URL(node.address).host;
    return {
      location: NodeLocation.Remote,
      address: node.address,
      port: node.port,
      name: `Remote Node ( ${host} )`,
      selectionType: NodeSelectionType.local,
    };
  });

  const localNode: NodeOption = {
    location: NodeLocation.Local,
    address: "",
    port: "",
    name: "Local Node",
    selectionType: NodeSelectionType.local,
  };

  const customNode: NodeOption = isCustomNode(havendState)
    ? {
        location: NodeLocation.Remote,
        address: havendState.address,
        port: havendState.port,
        name: createCustomNodeName(havendState),
        selectionType: NodeSelectionType.custom,
      }
    : {
        location: NodeLocation.Remote,
        address: "",
        port: "",
        name: "Custom Node",
        selectionType: NodeSelectionType.custom,
      };

  return [localNode, ...remoteNodes, customNode];
};

const createCustomNodeName = (havendState: NodeState) => {
  try {
    return `Custom Node ( ${new URL(havendState.address).host} )`;
  } catch (e) {
    return "Custom Node";
  }
};

const isCustomNode = (havendState: NodeState): boolean => {
  return (
    havendState.location === NodeLocation.Remote &&
    !REMOTE_NODES.some(
      (remoteNode) => remoteNode.address === havendState.address
    )
  );
};
