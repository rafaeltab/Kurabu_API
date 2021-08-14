import "reflect-metadata";
//load .env file
import { config } from "dotenv";
//import { Logger } from "@overnightjs/logger";
import * as fs from "fs";
import * as path from "path";
import * as tsyringe from "tsyringe";
//Do some imports
import {
  ConsoleLogger,
  Logger,
  Requests,
  DIContainer,
  ILogger,
} from "@kurabu/common/index";

//Setup usage capturing
import { startRecording } from "./services/UsageService/Usage";

config();

//Setup Logger
var logger = new ConsoleLogger();
Logger.setLogger(logger);
var container = DIContainer.getInstance(tsyringe.container);
//var Logger = new Logging.ConsoleLogger();

import controllers from "./controllers";
import { KurabuServer } from "./common/KurabuServer";

container.Container.registerInstance<ILogger>("ILogger", logger);

startRecording(2000, (usage) => {
  logger.Info(usage);
});

//retrieve the port from env variables
let PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 15000;

if (PORT === 15000) {
  Logger.Error(`env port is ${process.env.PORT}`);
  Logger.Warn(`env port is ${process.env.PORT}`);
  Logger.Info(`env port is ${process.env.PORT}`);
  Logger.Important(`env port is ${process.env.PORT}`);
  Logger.Warn(`env port is ${process.env.PORT}`);
  Logger.Warn(`env port is ${process.env.PORT}`);
}

var certs = {
  key: fs.readFileSync(path.join(__dirname, "..", "static/certs/tls.key")),
  cert: fs.readFileSync(path.join(__dirname, "..", "static/certs/tls.crt")),
};

//start the server
const server = new KurabuServer(controllers, certs);
//server.start(PORT);
server.startHTTPS(PORT);
var e = 0;