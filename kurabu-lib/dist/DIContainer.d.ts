import "reflect-metadata";
import * as tsyringe from "tsyringe";
export default class DIContainer {
    private container;
    constructor(container?: tsyringe.DependencyContainer);
    get Container(): tsyringe.DependencyContainer;
    private static _instance;
    static getInstance(mock?: any): DIContainer;
}
