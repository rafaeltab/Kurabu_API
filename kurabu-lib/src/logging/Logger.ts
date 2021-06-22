import {
  Request,
  Response,
} from 'express';

export { ConsoleLogger, ILogger, Logger };

interface ILogger {
    Info(message: any): void;
    Warn(message: any): void;
    Important(message: any): void;
    Error(message: any): void;

    Request(req: Request, res: Response, excludeParams?: string[]): void;
}

class Logger {
    private static logger: ILogger;
    public static Info(message: any): void {
        this.logger.Info(message);
    }
    public static Warn(message: any): void {
        this.logger.Warn(message);
    }
    public static Important(message: any): void {
        this.logger.Important(message);
    }
    public static Error(message: any): void {
        this.logger.Error(message);
    }

    public static Request(
        req: Request,
        res: Response,
        excludeParams?: string[]
    ): void {
        this.logger.Request(req, res, excludeParams);
    }

    public static setLogger(logger: ILogger) {
        this.logger = logger;
    }
}

function getDateString(): string {
    return new Date().toJSON();
}

class ConsoleLogger implements ILogger {
    public Info(message: any): void {
        var caller = _getCallerFile();
        console.info(`[${caller}@${getDateString()}]`, message);
    }
    public Warn(message: any): void {
        var caller = _getCallerFile();
        console.warn(
            "\x1b[33m%s",
            `[${caller}@${getDateString()}]`,
            message,
            "\x1b[0m"
        );
    }
    public Important(message: any): void {
        var caller = _getCallerFile();
        console.log(
            "\x1b[35m%s",
            `[${caller}@${getDateString()}]`,
            message,
            "\x1b[0m"
        );
    }
    public Error(message: any): void {
        var caller = _getCallerFile();
        console.error(
            "\x1b[31m%s",
            `[${caller}@${getDateString()}]`,
            message,
            "\x1b[0m"
        );
    }

    public Request(
        req: Request,
        res: Response,
        excludeParams?: string[]
    ): void {
        var caller = _getCallerFile();

        var query: any = {};
        var body: any = {};

        query = req.query as any;
        if (req.is("application/json")) body = req.body as any;

        var params = Object.assign(query, body);
        if (excludeParams) params = excludeParameters(params, excludeParams);

        console.log(
            "\x1b[32m%s",
            `[${caller}@${getDateString()}]`,
            req.path,
            res.statusCode,
            "\n",
            params,
            "\x1b[0m"
        );
    }
}

function excludeParameters(params: any, excludeParams: string[]) {
    var subj = Object.assign({}, params);
    for (let exP = 0; exP < excludeParams.length; exP++) {
        const exParam = excludeParams[exP];
        subj = excludeParameter(params, exParam);
    }

    return subj;
}

function excludeParameter(params: any, excludeParam: string) {
    var subj = Object.assign({}, params);

    var spl = excludeParam.split(".");
    if (!(spl[0] in subj)) return subj;

    var currentLevel = subj;
    if (spl.length > 1) {
        for (let s = 0; s < spl.length - 1; s++) {
            const param = spl[s];
            if (param in currentLevel) {
                currentLevel = currentLevel[param];
            }
        }
    }

    var last = spl[spl.length - 1];
    if (last in currentLevel) {
        delete currentLevel[last];
    }
    return subj;
}

function _getCallerFile() {
    var originalFunc = Error.prepareStackTrace;

    var callerfile;
    try {
        var err = new Error();
        var currentfile;

        Error.prepareStackTrace = function (err, stack) {
            return stack;
        };

        currentfile = (err.stack as any).shift().getFileName();

        while (err.stack.length) {
            callerfile = (err.stack as any).shift().getFileName();

            if (currentfile !== callerfile) break;
        }
    } catch (e) {}

    Error.prepareStackTrace = originalFunc;

    var srcSplit = splitMulti(callerfile, ["src", "node_modules"]);
    var last = srcSplit[srcSplit.length - 1];
    return last.substr(1, last.length);
}

function splitMulti(str: string, tokens: string[]): string[] {
    var tempChar = tokens[0]; // We can use the first token as a temporary join character
    for (var i = 1; i < tokens.length; i++) {
        str = str.split(tokens[i]).join(tempChar);
    }
    return str.split(tempChar);
}
