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
const ContainerManager_1 = require("../helpers/ContainerManager");
const CheckRequestStateQueryHandler_1 = require("../queries/Request/CheckState/CheckRequestStateQueryHandler");
function State() {
    return function (target, key, descriptor) {
        const original = descriptor.value;
        descriptor.value = function (req, res, arg = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                const container = ContainerManager_1.default.getInstance().Container;
                const checkRequestStateQuery = container.resolve(CheckRequestStateQueryHandler_1.CheckRequestStateQueryHandler);
                let state = yield checkRequestStateQuery.handle({ req: req, res: res });
                return original.apply(this, [
                    req,
                    res,
                    Object.assign(Object.assign({}, arg), { state: state.state, user: state.user }),
                ]);
            });
        };
    };
}
exports.default = State;
