"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParameterError_1 = require("./ParameterError");
class MalformedParameterError extends ParameterError_1.default {
    constructor(message) {
        super(message);
        this.errorCode = "012";
        this.httpCode = 422;
        this.name = "MalformedParameterError";
    }
}
exports.default = MalformedParameterError;
