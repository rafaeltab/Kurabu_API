"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationError_1 = require("./AuthenticationError");
class BadLoginError extends AuthenticationError_1.default {
    constructor(message) {
        super(message);
        this.errorCode = "021";
        this.httpCode = 403;
        this.name = "BadLoginError";
    }
}
exports.default = BadLoginError;
