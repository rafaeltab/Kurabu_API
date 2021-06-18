"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamType = exports.ParamPos = void 0;
var ParamPos;
(function (ParamPos) {
    ParamPos[ParamPos["body"] = 0] = "body";
    ParamPos[ParamPos["query"] = 1] = "query";
    ParamPos[ParamPos["either"] = 2] = "either";
})(ParamPos = exports.ParamPos || (exports.ParamPos = {}));
var ParamType;
(function (ParamType) {
    ParamType[ParamType["int"] = 0] = "int";
    ParamType[ParamType["string"] = 1] = "string";
    ParamType[ParamType["number"] = 2] = "number";
    ParamType[ParamType["object"] = 3] = "object";
})(ParamType = exports.ParamType || (exports.ParamType = {}));
function Param(paramName, paramType, optional, paramPos = ParamPos.either, callback = () => { }) {
    return function (target, key, descriptor) {
        const original = descriptor.value;
        descriptor.value = function (req, res, arg = {}) {
            let query = req.query[paramName];
            let body = req.body[paramName];
            let val;
            if (paramPos == ParamPos.either)
                val = query !== null && query !== void 0 ? query : body;
            if (paramPos == ParamPos.body)
                val = body;
            if (paramPos == ParamPos.query)
                val = query;
            if (paramType == ParamType.object &&
                (optional == true || val != undefined)) {
                arg[paramName] = val;
                callback(req, res, arg, true);
                return original.apply(this, [req, res, arg]);
            }
            val = val === null || val === void 0 ? void 0 : val.toString();
            if ((!val || val == "") && optional == true) {
                callback(req, res, arg, true);
                return original.apply(this, [req, res, arg]);
            }
            if ((!val || val == "") && optional == false) {
                callback(req, res, arg, false);
                res.status(403).json({
                    status: "error",
                    message: `Missing required parameter ${paramName}`,
                });
                return;
            }
            val = val;
            if (paramType == ParamType.int) {
                var parsedInt = parseInt(val);
                if (isNaN(parsedInt)) {
                    callback(req, res, arg, false);
                    res.status(403).json({
                        status: "error",
                        message: `Integer parameter, ${paramName}, was not an integer`,
                    });
                    return;
                }
                arg[paramName] = parsedInt;
                callback(req, res, arg, true);
                return original.apply(this, [req, res, arg]);
            }
            if (paramType == ParamType.number) {
                var parsedFloat = parseFloat(val);
                if (isNaN(parsedFloat)) {
                    callback(req, res, arg, false);
                    res.status(403).json({
                        status: "error",
                        message: `Number parameter, ${paramName}, was not a number`,
                    });
                    return;
                }
                arg[paramName] = parsedFloat;
                callback(req, res, arg, true);
                return original.apply(this, [req, res, arg]);
            }
            arg[paramName] = val;
            callback(req, res, arg, true);
            return original.apply(this, [req, res, arg]);
        };
    };
}
exports.default = Param;
