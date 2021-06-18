"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralError_1 = require("../GeneralError");
class MALError extends GeneralError_1.default {
    constructor(message) {
        super(message);
        this.errorCode = "040";
        this.httpCode = 500;
        this.name = "MALError";
    }
}
exports.default = MALError;
