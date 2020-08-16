import { EventEmitter } from "events";

const appEventBus = new EventEmitter();

export { appEventBus };


export const HAVEND_LOCATION_CHANGED: string = "havend_location_changed";
export const DAEMONS_STOPPED_EVENT: string = "daemons_stopped_event";
