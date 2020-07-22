import { NodeLocation, NodeState } from "platforms/desktop/types";
import { REMOTE_NODES } from "platforms/desktop/nodes";
import {
  NodeOption,
  NodeSelectionType,
} from "platforms/desktop/pages/_wallet/settings/node/nodeSetting";

export const createNodeOptions = (havendState: NodeState): NodeOption[] => {
  const remoteNodes: NodeOption[] = REMOTE_NODES.map((node) => {
    return {
      location: NodeLocation.Remote,
      address: node.address,
      port: node.port,
      trusted: node.trusted,
      provider: node.provider,
      name: `Remote Node (${node.provider})`,
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

  //quick check to omit local node option for macOS for first
  if (window.havenProcess.platform === "darwin") {
    return [...remoteNodes, customNode];
  }

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
