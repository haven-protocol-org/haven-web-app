import { NetworkType } from "typings";

const GOVERNANCE_WALLET_ADDRESS = [
  [
    "hvxy7YfeE8SdTrCmSqLB59WoQn3ZQun1aLX36X3eb1R7Fb26VuNpc235q4fguGUxfGKerywFPnweu15S8RB8DzTJ8Q4hGJCgvv",
    "hvxy3f2PhAhimkeLf617BsbVn6UTbofVcMzofXGsSNLoMFr2SrSxRJ9f52Am1QLVddKetXPKHoTLbBaLNT1kMU6Q3kYRc3t6pF",
  ],
  [
    "hvtaG41PNGsT5mWQGeqXFvScaNxHQj6YeJK7Vuq2uRF8fa58D6KawrcXS1EVt6g4PiBnSvYMqVRxoAMZaM7AVCqo4LknAJJBR9",
    "hvtaKW6432sck8vBR2AbkR5ZV5vU9gzfW2AyexzU2dF9Yhvm2rAEGMaS5RskxfC3JSL5xW2xCczAFKBg6Et7dubtAUhMPRX75D",
  ],
  [
    "hvsaeLCg4ZkjLRQf8ciYSjHFX8y2CmrnibNBRDZiyyANTFtXQbxHy5PFD79MvmB9mtHeX8XLa36BJ33QoEDh8PH8hULLZnpdNx7",
    "hvsaeLCg4ZkjLRQf8ciYSjHFX8y2CmrnibNBRDZiyyANTFtXQbxHy5PFD79MvmB9mtHeX8XLa36BJ33QoEDh8PH8hULLZnpdNx7",
  ],
];

export const getGovernanceWalletAddressByNetwork = (
  network: NetworkType
): string[] => {
  return GOVERNANCE_WALLET_ADDRESS[network];
};
