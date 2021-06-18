import { Request, Response } from "express";
import { Controller, Get } from "@overnightjs/core";
import * as Options from "./versionControllerOptions";
import { injectable } from "tsyringe";
import { Requests, Decorators } from "kurabu-lib";
import version from "#root/version";

@Controller(Options.ControllerPath)
@injectable()
export class versionController {
    @Get(Options.ControllerName)
    @Decorators.RequestHandler()
    @Decorators.LogArg()
    private async get(req: Request, res: Response, arg: Options.params) {
        return {
            status: Requests.SUCCESS_STATUS,
            message: version.version,
        };
    }
}
