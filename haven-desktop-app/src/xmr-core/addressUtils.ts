
import {isMainnet} from "../env";
import {BigInt} from "./biginteger/src";
import {cnBase58} from "./xmr-b58/src";
import {cn_fast_hash} from "./xmr-fast-hash/src";


const CRYPTONOTE_PUBLIC_ADDRESS_BASE58_PREFIX = isMainnet? 0x5af4: 0x59f4;
const CRYPTONOTE_PUBLIC_INTEGRATED_ADDRESS_BASE58_PREFIX = isMainnet? 0xcd774: 0x499f4;
const CRYPTONOTE_PUBLIC_SUBADDRESS_BASE58_PREFIX = isMainnet? 0x12d974: 0x919f4;

const ADDRESS_CHECKSUM_SIZE = 4;
const INTEGRATED_ID_SIZE = 8;




export function decode_address(address: string) {
	let dec = cnBase58.decode(address);
	const expectedPrefix = encode_varint(
		CRYPTONOTE_PUBLIC_ADDRESS_BASE58_PREFIX
	);
	const expectedPrefixInt = encode_varint(
		CRYPTONOTE_PUBLIC_INTEGRATED_ADDRESS_BASE58_PREFIX
	);
	const expectedPrefixSub = encode_varint(
		CRYPTONOTE_PUBLIC_SUBADDRESS_BASE58_PREFIX
	);
	const prefix = dec.slice(0, expectedPrefix.length);
	if (
		prefix !== expectedPrefix &&
		prefix !== expectedPrefixInt &&
		prefix !== expectedPrefixSub
	) {
		throw Error("Invalid address prefix");
	}
	dec = dec.slice(expectedPrefix.length);
	const spend = dec.slice(0, 64);
	const view = dec.slice(64, 128);
	let checksum;
	let expectedChecksum;
	let intPaymentId;

	if (prefix === expectedPrefixInt) {
		intPaymentId = dec.slice(128, 128 + INTEGRATED_ID_SIZE * 2);
		checksum = dec.slice(
			128 + INTEGRATED_ID_SIZE * 2,
			128 + INTEGRATED_ID_SIZE * 2 + ADDRESS_CHECKSUM_SIZE * 2,
		);
		expectedChecksum = cn_fast_hash(
			prefix + spend + view + intPaymentId,
		).slice(0, ADDRESS_CHECKSUM_SIZE * 2);
	} else {
		checksum = dec.slice(128, 128 + ADDRESS_CHECKSUM_SIZE * 2);
		expectedChecksum = cn_fast_hash(prefix + spend + view).slice(
			0,
			ADDRESS_CHECKSUM_SIZE * 2,
		);
	}
	if (checksum !== expectedChecksum) {
		throw Error("Invalid checksum");
	}
	if (intPaymentId) {
		return {
			spend: spend,
			view: view,
			intPaymentId: intPaymentId,
		};
	} else {
		return {
			spend: spend,
			view: view,
		};
	}
}


 function encode_varint(input: number | string) {
	let i = new BigInt(input);
	let out = "";
	// While i >= b10000000
	while (i.compare(0x80) >= 0) {
		// out.append i & b01111111 | b10000000
		out += ("0" + ((i.lowVal() & 0x7f) | 0x80).toString(16)).slice(-2);
		i = i.divide(new BigInt(2).pow(7));
	}
	out += ("0" + i.toJSValue().toString(16)).slice(-2);
	return out;
}

