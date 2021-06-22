"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralError_1 = require("../errors/GeneralError");
const logging_1 = require("../logging");
function RequestHandlerDecorator(log = true) {
    return function (target, key, descriptor) {
        const original = descriptor.value;
        descriptor.value = function (req, res, arg = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let val = original.apply(this, [req, res, arg]);
                    if (val instanceof Promise) {
                        val = yield val;
                    }
                    if (val) {
                        res.status(200).json(val);
                        return val;
                    }
                }
                catch (err) {
                    if (err instanceof GeneralError_1.default) {
                        res.status(err.getHttpCode()).json({
                            status: "error",
                            code: err.getErrorCode(),
                            message: err.message,
                        });
                    }
                    else {
                        res.status(500).json({
                            status: "error",
                            message: "unknown error",
                        });
                        if (log)
                            logging_1.Logger.Info(err);
                    }
                }
            });
        };
    };
}
exports.default = RequestHandlerDecorator;
