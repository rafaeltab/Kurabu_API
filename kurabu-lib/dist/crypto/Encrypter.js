"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
function encrypt(text, pass) {
    let key = GetKey(pass);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return encrypted.toString("hex") + iv.toString("hex");
}
exports.encrypt = encrypt;
function decrypt(hash, pass) {
    let key = GetKey(pass);
    //split hash into iv and actual hash
    const bytes = Buffer.from(hash, "hex");
    const iv = bytes.slice(bytes.length - 16, bytes.length);
    const hashed = bytes.slice(0, bytes.length - 16);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrpyted = Buffer.concat([
        decipher.update(hashed),
        decipher.final(),
    ]);
    return decrpyted.toString();
}
exports.decrypt = decrypt;
function GetKey(pass) {
    if (pass != undefined)
        throw new Error("No pass provided to GetKey");
    return crypto.scryptSync(pass, "salt", 32);
}
