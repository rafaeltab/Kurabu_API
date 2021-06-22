"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KurabuServer = void 0;
const body_parser_1 = require("body-parser");
const https_1 = require("https");
const core_1 = require("@overnightjs/core");
const logging_1 = require("../logging");
class KurabuServer extends core_1.Server {
    constructor(controllers, certs) {
        super(false);
        this.SERVER_STARTED = "Server started on port: ";
        this.certs = certs;
        this.app.use(body_parser_1.json());
        this.app.use(body_parser_1.urlencoded({ extended: true }));
        this.app.use((req, res, next) => {
            if (process.env.NODE_ENV === "production") {
                if (req.headers["x-forwarded-proto"] !== "https")
                    // the statement for performing our redirection
                    return res.redirect("https://" + req.headers.host + req.url);
                else
                    return next();
            }
            else
                return next();
        });
        var controllerLog = `Initializing server with ${controllers.length} controllers:`;
        for (let c = 0; c < controllers.length; c++) {
            controllerLog += `\n  ${controllers[c].constructor.name}`;
        }
        logging_1.Logger.Info(controllerLog);
        super.addControllers(controllers);
    }
    startHTTPS(port) {
        return https_1.createServer(this.certs, this.app).listen(port, "0.0.0.0", () => {
            logging_1.Logger.Important(this.SERVER_STARTED + port);
        });
    }
    start(port) {
        return this.app.listen(port, "0.0.0.0", () => {
            logging_1.Logger.Important(this.SERVER_STARTED + port);
        });
    }
}
exports.KurabuServer = KurabuServer;
