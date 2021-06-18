"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParameterError_1 = require("./ParameterError");
class PasswordStrengthError extends ParameterError_1.default {
    constructor(message) {
        super(message);
        this.errorCode = "014";
        this.httpCode = 422;
        this.name = "PasswordStrengthError";
    }
}
exports.default = PasswordStrengthError;
