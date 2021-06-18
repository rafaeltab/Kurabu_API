import { json, urlencoded } from "body-parser";
import controllers from "./controllers";
import { Server } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import { Server as Serve } from "http";

class HTTPServer extends Server {
  private readonly SERVER_STARTED = "Server started on port: ";

  constructor() {
    super(true);
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.setupControllers();
  }

  private setupControllers(): void {
    super.addControllers(controllers);
  }

  public start(port: number): Serve {
    return this.app.listen(port, "0.0.0.0", () => {
      Logger.Imp(this.SERVER_STARTED + port);
    });
  }
}

export default HTTPServer;
