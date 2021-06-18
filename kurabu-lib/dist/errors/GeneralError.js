"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GeneralError extends Error {
    constructor(message) {
        super(message);
        this.errorCode = "000";
        this.httpCode = 500;
        this.name = "GeneralError";
    }
    getErrorCode() {
        return this.errorCode;
    }
    getHttpCode() {
        return this.httpCode;
    }
}
exports.default = GeneralError;
