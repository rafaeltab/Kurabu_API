import "reflect-metadata";
import * as tsyringe from "tsyringe";
import { Logger } from "@overnightjs/logger";

export default class DIContainer {
    private container: tsyringe.DependencyContainer;
    constructor(container = tsyringe.container) {
        this.container = container;
    }

    public get Container() {
        return this.container;
    }

    private static _instance: DIContainer;
    public static getInstance(container?: any) {
        if (!this._instance && container === undefined) {
            this._instance = new DIContainer();
        } else if (container !== undefined) {
            this._instance = new DIContainer(container);
        }
        return this._instance;
    }
}
