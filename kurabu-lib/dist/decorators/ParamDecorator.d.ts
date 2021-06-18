import { Request, Response } from "express";
export declare enum ParamPos {
    body = 0,
    query = 1,
    either = 2
}
export declare enum ParamType {
    int = 0,
    string = 1,
    number = 2,
    object = 3
}
export default function Param(paramName: string, paramType: ParamType, optional: boolean, paramPos?: ParamPos, callback?: (req: Request, res: Response, arg: any, success: boolean) => void): (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => void;
