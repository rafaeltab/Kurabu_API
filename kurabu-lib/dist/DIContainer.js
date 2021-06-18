"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe = require("tsyringe");
class DIContainer {
    constructor(container = tsyringe.container) {
        this.container = container;
    }
    get Container() {
        return this.container;
    }
    static getInstance(mock) {
        if (!this._instance && mock === undefined) {
            this._instance = new DIContainer();
        }
        else if (mock !== undefined) {
            this._instance = new DIContainer(mock);
        }
        return this._instance;
    }
}
exports.default = DIContainer;
