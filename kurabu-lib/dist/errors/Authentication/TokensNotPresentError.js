"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationError_1 = require("./AuthenticationError");
class TokensNotPresentError extends AuthenticationError_1.default {
    constructor(message) {
        super(message);
        this.errorCode = "028";
        this.httpCode = 403;
        this.name = "TokensNotPresentError";
    }
}
exports.default = TokensNotPresentError;
