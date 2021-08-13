import {
  json,
  urlencoded,
} from 'body-parser';
import { Server as HttpServe } from 'http';
import {
  createServer,
  Server as HttpsServe,
} from 'https';

import { Server } from '@overnightjs/core';

import { Logger } from '../logging';

type Certs = {
    key: Buffer;
    cert: Buffer;
};

class KurabuServer extends Server {
    private readonly SERVER_STARTED = "Server started on port: ";
    private readonly certs!: Certs;

    constructor(controllers: any[], certs: Certs) {
        super(false);

        this.certs = certs;

        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));
        this.app.use((req, res, next) => {
            if (process.env.NODE_ENV === "production") {
                if (req.headers["x-forwarded-proto"] !== "https")
                    // the statement for performing our redirection
                    return res.redirect(
                        "https://" + req.headers.host + req.url
                    );
                else return next();
            } else return next();
        });
        var controllerLog = `Initializing server with ${controllers.length} controllers:`;

        for (let c = 0; c < controllers.length; c++) {
            controllerLog += `\n  ${controllers[c].constructor.name}`;
        }

        Logger.Info(controllerLog);

        super.addControllers(controllers);
    }

    public startHTTPS(port: number): HttpsServe {
        return createServer(this.certs, this.app).listen(
            port,
            "0.0.0.0",
            () => {
                Logger.Important(this.SERVER_STARTED + port);
            }
        );
    }

    public start(port: number): HttpServe {
        return this.app.listen(port, "0.0.0.0", () => {
            Logger.Important(this.SERVER_STARTED + port);
        });
    }
}

export { KurabuServer };