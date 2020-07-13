export interface SyncState {
  isSyncing: boolean;
  blockHeight: number;
  scannedHeight: number;
  scannedDate?: Date;
}

export enum ThreeState {
  True, False, Unset
}
