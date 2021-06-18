"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNumeric = exports.getPKCE = exports.getUUID = exports.isUUID = void 0;
const crypto = require("crypto");
function base64URLEncode(buff) {
    return buff
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
}
function isUUID(uuid) {
    const stateRe = /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/;
    return uuid.match(stateRe) != null;
}
exports.isUUID = isUUID;
function getUUID() {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
}
exports.getUUID = getUUID;
function getPKCE(length) {
    var l = Math.ceil(length / (4 / 3));
    return base64URLEncode(crypto.randomBytes(l));
}
exports.getPKCE = getPKCE;
function generateNumeric(length) {
    var result = "";
    var characters = "0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.generateNumeric = generateNumeric;
