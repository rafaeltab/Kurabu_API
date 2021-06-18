"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isErrResp = exports.isTokenResponse = void 0;
function isTokenResponse(obj) {
    return "token_type" in obj;
}
exports.isTokenResponse = isTokenResponse;
function isErrResp(obj) {
    return "error" in obj;
}
exports.isErrResp = isErrResp;
