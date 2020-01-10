import SHA3 = require("keccakjs");

export function cn_fast_hash(input: string) {
	if (input.length % 2 !== 0 || !valid_hex(input)) {
		throw Error("Input invalid");
	}

	const hasher = new SHA3(256);
	hasher.update(Buffer.from((hextobin(input).buffer as any) as Buffer));
	return hasher.digest("hex");
}


export function hextobin(hex: string) {
	if (hex.length % 2 !== 0) throw Error("Hex string has invalid length!");
	const res = new Uint8Array(hex.length / 2);
	for (let i = 0; i < hex.length / 2; ++i) {
		res[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
	}
	return res;
}


export function valid_hex(hex: string) {
	const exp = new RegExp("[0-9a-fA-F]{" + hex.length + "}");
	return exp.test(hex);
}
