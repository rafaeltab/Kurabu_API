"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationError_1 = require("./AuthenticationError");
class AttemptError extends AuthenticationError_1.default {
    constructor(message) {
        super(message);
        this.errorCode = "026";
        this.httpCode = 403;
        this.name = "AttemptError";
    }
}
exports.default = AttemptError;
