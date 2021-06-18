//load .env file
import { config } from "dotenv";
config();

//Do some imports
import { DIContainer } from "kurabu-lib";
import HTTPServer from "./server";
import { Logger } from "@overnightjs/logger";

//retrieve the port from env variables
let PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 15000;

if (PORT === 15000) {
    Logger.Warn(`env port is ${process.env.PORT}`);
}

//Load the di container
DIContainer.getInstance();

//start the server
const server = new HTTPServer();
server.start(PORT);
