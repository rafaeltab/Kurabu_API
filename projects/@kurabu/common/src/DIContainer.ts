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
    public static getInstance(mock?: any) {
        if (!this._instance && mock === undefined) {
            this._instance = new DIContainer();
        } else if (mock !== undefined) {
            this._instance = new DIContainer(mock);
        }
        return this._instance;
    }
}
