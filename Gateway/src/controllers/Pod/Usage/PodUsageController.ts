import { Request, Response } from "express";
import { Controller, Get } from "@overnightjs/core";
import * as Options from "./PodUsageControllerOptions";
import { Requests, Decorators } from "kurabu-lib";
import { injectable } from "tsyringe";
import { PodUsageQueryHandler } from "#root/queries/Pod/Usage/PodUsageQueryHandler";

@Controller(Options.ControllerPath)
@injectable()
export class PodUsageController {
    constructor(private _podUsageQuery: PodUsageQueryHandler) {}

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
