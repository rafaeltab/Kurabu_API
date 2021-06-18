"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationError_1 = require("./AuthenticationError");
class StateStatusError extends AuthenticationError_1.default {
    constructor(message) {
        super(message);
        this.errorCode = "024";
        this.httpCode = 403;
        this.name = "StateStatusError";
    }
}
exports.default = StateStatusError;
