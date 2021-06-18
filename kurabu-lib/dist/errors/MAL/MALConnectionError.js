"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MALError_1 = require("./MALError");
class MALConnectionError extends MALError_1.default {
    constructor(message) {
        super(message);
        this.errorCode = "041";
        this.httpCode = 500;
        this.name = "MALConnectionError";
    }
}
exports.default = MALConnectionError;
