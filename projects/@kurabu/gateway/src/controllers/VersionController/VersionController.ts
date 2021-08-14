import "reflect-metadata";

import version from "@kurabu/gateway/version";
import { Request, Response } from "express";
import { Decorators, Requests } from "@kurabu/common/index";
import { autoInjectable, injectable } from "tsyringe";

import { Controller, Get } from "@overnightjs/core";

import * as Options from "./VersionControllerOptions";

@Controller(Options.ControllerPath)
// @injectable()
export default class VersionController {
    @Get(Options.ControllerName)
    @Decorators.RequestHandler()
    @Decorators.LogArg()
    private get(req: Request, res: Response, arg: Options.params) {
        return {
          status: Requests.SUCCESS_STATUS,
          message: version.version,
        };
    }
}