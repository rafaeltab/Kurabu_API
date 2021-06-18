"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralError_1 = require("../GeneralError");
class AuthenticationError extends GeneralError_1.default {
    constructor(message) {
        super(message);
        this.errorCode = "020";
        this.httpCode = 403;
        this.name = "AuthenticationError";
    }
}
exports.default = AuthenticationError;
