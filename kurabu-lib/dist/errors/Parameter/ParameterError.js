"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralError_1 = require("../GeneralError");
class ParameterError extends GeneralError_1.default {
    constructor(message) {
        super(message);
        this.errorCode = "010";
        this.httpCode = 422;
        this.name = "ParameterError";
    }
}
exports.default = ParameterError;
