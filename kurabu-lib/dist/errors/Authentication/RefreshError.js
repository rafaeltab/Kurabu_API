"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationError_1 = require("./AuthenticationError");
class RefreshError extends AuthenticationError_1.default {
    constructor(message) {
        super(message);
        this.errorCode = "022";
        this.httpCode = 403;
        this.name = "RefreshError";
    }
}
exports.default = RefreshError;
