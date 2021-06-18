"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParameterError_1 = require("./ParameterError");
class MissingParameterError extends ParameterError_1.default {
    constructor(message) {
        super(message);
        this.errorCode = "011";
        this.httpCode = 422;
        this.name = "MissingParameterError";
    }
}
exports.default = MissingParameterError;
