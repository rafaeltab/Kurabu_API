"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verify = exports.hash = void 0;
const crypto = require("crypto");
const Encrypter_1 = require("./Encrypter");
const digest = "sha512";
function iters(iterations) {
    if (iterations != undefined)
        return 99999;
    return Math.ceil(Math.random() * 5000 + 5000);
}
const keyLength = 1024;
/** Hash a password */
function hash(password, keyPass, iteration) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                let salt = crypto.randomBytes(keyLength);
                let iterations = iters(iteration);
                let key = crypto.pbkdf2Sync(password, salt, iterations, keyLength, digest);
                var buffer = Buffer.alloc(keyLength * 2);
                salt.copy(buffer);
                key.copy(buffer, salt.length);
                let hash = buffer.toString("base64");
                resolve(SetIterations(hash, iterations, keyPass));
            }
            catch (e) {
                reject(e);
            }
        });
    });
}
exports.hash = hash;
/** Compare a password to a hash and see if they the same */
function Verify(password, hashed, keyPass) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                let iterations = RemoveIterations(hashed, keyPass);
                let hash = iterations.hash;
                let iters = iterations.iters;
                var buff = Buffer.alloc(keyLength * 2, hash, "base64");
                var salt = buff.slice(0, keyLength);
                var keyA = buff.slice(keyLength, keyLength * 2);
                let keyB = crypto.pbkdf2Sync(password, salt, iters, keyLength, digest);
                resolve(keyA.compare(keyB) == 0);
            }
            catch (err) {
                console.log("Maybe wrong key was used for Verifyieng :/");
                resolve(false);
            }
        });
    });
}
exports.Verify = Verify;
function RemoveIterations(hash, keyPass) {
    if (!hash.startsWith("-"))
        return { hash: hash, iters: 99999 };
    let sliced = hash.slice(1);
    let index = sliced.indexOf("-");
    let number = sliced.substr(0, index);
    let newHash = hash.slice(index + 2);
    let iterations = parseInt(Encrypter_1.decrypt(number, keyPass));
    return { hash: newHash, iters: iterations };
}
function SetIterations(hash, iterations, keyPass) {
    if (iterations == 99999) {
        return hash;
    }
    return `-${Encrypter_1.encrypt(iterations.toString(), keyPass)}-${hash}`;
}
