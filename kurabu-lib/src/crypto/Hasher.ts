import * as crypto from "crypto";
import { decrypt, encrypt } from "./Encrypter";

const digest = "sha512";
function iters(iterations: number | undefined): number {
    if (iterations != undefined) return 99999;
    return Math.ceil(Math.random() * 5000 + 5000);
}
const keyLength = 1024;

/** Hash a password */
export async function hash(
    password: string,
    keyPass: string,
    iteration?: number
): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            let salt = crypto.randomBytes(keyLength);
            let iterations = iters(iteration);
            let key = crypto.pbkdf2Sync(
                password,
                salt,
                iterations,
                keyLength,
                digest
            );

            var buffer = Buffer.alloc(keyLength * 2);

            salt.copy(buffer);
            key.copy(buffer, salt.length);

            let hash = buffer.toString("base64");
            resolve(SetIterations(hash, iterations, keyPass));
        } catch (e) {
            reject(e);
        }
    });
}

/** Compare a password to a hash and see if they the same */
export async function Verify(
    password: string,
    hashed: string,
    keyPass: string
): Promise<boolean> {
    return new Promise((resolve, reject) => {
        try {
            let iterations = RemoveIterations(hashed, keyPass);
            let hash = iterations.hash;
            let iters = iterations.iters;

            var buff = Buffer.alloc(keyLength * 2, hash, "base64");
            var salt = buff.slice(0, keyLength);
            var keyA = buff.slice(keyLength, keyLength * 2);

            let keyB = crypto.pbkdf2Sync(
                password,
                salt,
                iters,
                keyLength,
                digest
            );

            resolve(keyA.compare(keyB) == 0);
        } catch (err) {
            console.log("Maybe wrong key was used for Verifyieng :/");
            resolve(false);
        }
    });
}
function RemoveIterations(
    hash: string,
    keyPass: string
): { hash: string; iters: number } {
    if (!hash.startsWith("-")) return { hash: hash, iters: 99999 };

    let sliced = hash.slice(1);
    let index = sliced.indexOf("-");
    let number = sliced.substr(0, index);

    let newHash = hash.slice(index + 2);
    let iterations = parseInt(decrypt(number, keyPass));
    return { hash: newHash, iters: iterations };
}

function SetIterations(
    hash: string,
    iterations: number,
    keyPass: string
): string {
    if (iterations == 99999) {
        return hash;
    }
    return `-${encrypt(iterations.toString(), keyPass)}-${hash}`;
}
