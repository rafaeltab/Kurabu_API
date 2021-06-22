import { Request, Response } from 'express';
export { ConsoleLogger, ILogger, Logger };
interface ILogger {
    Info(message: any): void;
    Warn(message: any): void;
    Important(message: any): void;
    Error(message: any): void;
    Request(req: Request, res: Response, excludeParams?: string[]): void;
}
declare class Logger {
    private static logger;
    static Info(message: any): void;
    static Warn(message: any): void;
    static Important(message: any): void;
    static Error(message: any): void;
    static Request(req: Request, res: Response, excludeParams?: string[]): void;
    static setLogger(logger: ILogger): void;
}
declare class ConsoleLogger implements ILogger {
    Info(message: any): void;
    Warn(message: any): void;
    Important(message: any): void;
    Error(message: any): void;
    Request(req: Request, res: Response, excludeParams?: string[]): void;
}
