"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralError_1 = require("../GeneralError");
class MailServiceNoSendGridKeyError extends GeneralError_1.default {
    constructor(message) {
        super(message);
        this.errorCode = "031";
        this.httpCode = 500;
        this.name = "MailServiceNoSendGridKeyError";
    }
}
exports.default = MailServiceNoSendGridKeyError;
