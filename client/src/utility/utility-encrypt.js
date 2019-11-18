import {isDevMode} from "../constants/env";


let encKey = null;
let iv = crypto.getRandomValues(new Uint8Array(12));

export const createKey = async () => {
    if (encKey) {
        return encKey;
    } else {
        encKey = await window.crypto.subtle.generateKey(
            {
                name: "AES-GCM",
                length: 256
            },
            true,
            ["encrypt", "decrypt"]
        );

        return encKey;
    }
};



export const encrypt = async (message) => {

    if (isDevMode()) {
        return message;
    }

    const enc = new TextEncoder();
    const encMessage = enc.encode(message);

    return await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        encKey,
        encMessage
    );
};

export const decrypt = async (cipher) => {

    if (isDevMode()) {
        return cipher;
    }

    const decrypted = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        encKey,
        cipher
    );
    let dec = new TextDecoder();
    return dec.decode(decrypted);
};
