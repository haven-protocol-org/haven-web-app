export const getTransfers = () => {};

const filterForDoubleEntries = (entries: any[] | undefined) => {
  if (entries === undefined) {
    return undefined;
  }

  return entries.filter((entry: any, index: number) => {
    return (
      index ===
      entries.findIndex(
        (tempEntry) =>
          tempEntry.txid === entry.txid && tempEntry.type === entry.type
      )
    );
  });
};

export const mergeAndSort = (result: {
  [key: string]: any | undefined[];
  in?: any[] | undefined;
  out?: any[] | undefined;
  pending?: any[] | undefined;
  pool?: any[] | undefined;
}) => {
  result.out = filterForDoubleEntries(result.out);

  const txTypes: string[] = Object.keys(result);
  let all: any[] = [];

  txTypes.forEach((txType: string) => {
    const txArray = result[txType];
    if (!txArray) {
      return;
    }
    txArray.forEach((txEntry: any) => (txEntry["direction"] = txType));
    all = [...all, ...txArray];
  });

  all.sort((a, b) => b.timestamp - a.timestamp);
  return all;
};
