//load .env file
import { config } from 'dotenv';
//import { Logger } from "@overnightjs/logger";
import * as fs from 'fs';
//Do some imports
import {
  ConsoleLogger,
  Logger,
  Requests,
} from 'kurabu-lib';
//Load the di container
import {
  DIContainer,
  ILogger,
} from 'kurabu-lib';

import controllers from './controllers';
//Setup usage capturing
import { startRecording } from './services/UsageService/Usage';

config();

//Setup Logger
var logger = new ConsoleLogger();
Logger.setLogger(logger);
var container = DIContainer.getInstance();
//var Logger = new Logging.ConsoleLogger();

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
    key: fs.readFileSync(`${__dirname}/certs/tls.key`),
    cert: fs.readFileSync(`${__dirname}/certs/tls.crt`),
};

//start the server
const server = new Requests.KurabuServer(controllers, certs);
//server.start(PORT);
server.startHTTPS(PORT);
