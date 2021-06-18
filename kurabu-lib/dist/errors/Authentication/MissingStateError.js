"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationError_1 = require("./AuthenticationError");
class MissingStateError extends AuthenticationError_1.default {
    constructor(message) {
        super(message);
        this.errorCode = "023";
        this.httpCode = 403;
        this.name = "MissingStateError";
    }
}
exports.default = MissingStateError;
