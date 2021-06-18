"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationError_1 = require("./AuthenticationError");
class IncorrectCodeError extends AuthenticationError_1.default {
    constructor(message) {
        super(message);
        this.errorCode = "027";
        this.httpCode = 403;
        this.name = "IncorrectCodeError";
    }
}
exports.default = IncorrectCodeError;
