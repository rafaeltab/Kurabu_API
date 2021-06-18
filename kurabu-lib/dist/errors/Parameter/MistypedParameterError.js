"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParameterError_1 = require("./ParameterError");
class MistypedParameterError extends ParameterError_1.default {
    constructor(message) {
        super(message);
        this.errorCode = "013";
        this.httpCode = 422;
        this.name = "MistypedParameterError";
    }
}
exports.default = MistypedParameterError;
