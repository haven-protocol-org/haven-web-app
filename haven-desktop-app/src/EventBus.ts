import { EventEmitter } from "events";

const appEventBus = new EventEmitter();

export { appEventBus };

export const LOCAL_NODE_STOPPED_EVENT: string = "local_node_stopped_event";
