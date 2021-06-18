"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationError_1 = require("./AuthenticationError");
class MailUsedError extends AuthenticationError_1.default {
    constructor(message) {
        super(message);
        this.errorCode = "025";
        this.httpCode = 403;
        this.name = "MailUsedError";
    }
}
exports.default = MailUsedError;
