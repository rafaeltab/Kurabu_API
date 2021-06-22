"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.ConsoleLogger = void 0;
class Logger {
    static Info(message) {
        this.logger.Info(message);
    }
    static Warn(message) {
        this.logger.Warn(message);
    }
    static Important(message) {
        this.logger.Important(message);
    }
    static Error(message) {
        this.logger.Error(message);
    }
    static Request(req, res, excludeParams) {
        this.logger.Request(req, res, excludeParams);
    }
    static setLogger(logger) {
        this.logger = logger;
    }
}
exports.Logger = Logger;
function getDateString() {
    return new Date().toJSON();
}
class ConsoleLogger {
    Info(message) {
        var caller = _getCallerFile();
        console.info(`[${caller}@${getDateString()}]`, message);
    }
    Warn(message) {
        var caller = _getCallerFile();
        console.warn("\x1b[33m%s", `[${caller}@${getDateString()}]`, message, "\x1b[0m");
    }
    Important(message) {
        var caller = _getCallerFile();
        console.log("\x1b[35m%s", `[${caller}@${getDateString()}]`, message, "\x1b[0m");
    }
    Error(message) {
        var caller = _getCallerFile();
        console.error("\x1b[31m%s", `[${caller}@${getDateString()}]`, message, "\x1b[0m");
    }
    Request(req, res, excludeParams) {
        var caller = _getCallerFile();
        var query = {};
        var body = {};
        query = req.query;
        if (req.is("application/json"))
            body = req.body;
        var params = Object.assign(query, body);
        if (excludeParams)
            params = excludeParameters(params, excludeParams);
        console.log("\x1b[32m%s", `[${caller}@${getDateString()}]`, req.path, res.statusCode, "\n", params, "\x1b[0m");
    }
}
exports.ConsoleLogger = ConsoleLogger;
function excludeParameters(params, excludeParams) {
    var subj = Object.assign({}, params);
    for (let exP = 0; exP < excludeParams.length; exP++) {
        const exParam = excludeParams[exP];
        subj = excludeParameter(params, exParam);
    }
    return subj;
}
function excludeParameter(params, excludeParam) {
    var subj = Object.assign({}, params);
    var spl = excludeParam.split(".");
    if (!(spl[0] in subj))
        return subj;
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
        currentfile = err.stack.shift().getFileName();
        while (err.stack.length) {
            callerfile = err.stack.shift().getFileName();
            if (currentfile !== callerfile)
                break;
        }
    }
    catch (e) { }
    Error.prepareStackTrace = originalFunc;
    var srcSplit = splitMulti(callerfile, ["src", "node_modules"]);
    var last = srcSplit[srcSplit.length - 1];
    return last.substr(1, last.length);
}
function splitMulti(str, tokens) {
    var tempChar = tokens[0]; // We can use the first token as a temporary join character
    for (var i = 1; i < tokens.length; i++) {
        str = str.split(tokens[i]).join(tempChar);
    }
    return str.split(tempChar);
}
