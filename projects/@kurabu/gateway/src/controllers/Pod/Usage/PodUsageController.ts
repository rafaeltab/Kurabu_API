import { PodUsageQueryHandler } from "@kurabu/gateway/queries/Pod/Usage/PodUsageQueryHandler";
import { Request, Response } from "express";
import { Decorators, Requests } from "@kurabu/common/index";
import { autoInjectable, inject, injectable } from "tsyringe";

import { Controller, Get } from "@overnightjs/core";

import * as Options from "./PodUsageControllerOptions";

@Controller(Options.ControllerPath)
@injectable()
export default class PodUsageController {
    constructor(
    private _podUsageQuery: PodUsageQueryHandler) { }

    @Get(Options.ControllerName)
    @Decorators.RequestHandler()
    @Decorators.LogArg()
    private async get(req: Request, res: Response, arg: Options.params) {
        var result = await this._podUsageQuery.handle({});

        return {
            status: Requests.SUCCESS_STATUS,
            message: result.usage,
        };
    }
}
