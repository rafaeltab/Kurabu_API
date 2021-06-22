"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratedCodes_1 = require("../crypto/GeneratedCodes");
const logging_1 = require("../logging");
function LogArg() {
    return function (target, key, descriptor) {
        const original = descriptor.value;
        descriptor.value = function (req, res, arg = {}) {
            const requestCode = GeneratedCodes_1.getUUID();
            const { user } = arg, logArg = __rest(arg, ["user"]);
            logging_1.Logger.Info(`${requestCode} ${target.constructor.name}: ${JSON.stringify(logArg, null, 2)}`);
            let val = original.apply(this, [req, res, arg]);
            return val;
        };
    };
}
exports.default = LogArg;
