import {
  App,
  Middleware,
  SlackCommandMiddlewareArgs,
  SlackEventMiddlewareArgs,
} from "@slack/bolt";
import { EventEmitter } from "events";

class SlackEventListener extends EventEmitter {
  app: App;

  commandListeners: string[] = [];
  eventListeners: string[] = [];

  constructor(app: App) {
    super();

    this.app = app;
  }

  command(
    command: string,
    listener: Middleware<SlackCommandMiddlewareArgs>
  ): void {
    if (!this.commandListeners.includes(command)) {
      this.app.command(command, this.commandListener(command));
      this.commandListeners.push(command);
    }

    this.addListener(`command:${command}`, listener);
  }

  event<T extends string>(
    event: T,
    listener: Middleware<SlackEventMiddlewareArgs<T>>
  ): void {
    if (!this.eventListeners.includes(event)) {
      this.app.event(event, this.eventListener(event));
      this.eventListeners.push(event);
    }

    this.addListener(`event:${event}`, listener);
  }

  private commandListener(
    command: string
  ): Middleware<SlackCommandMiddlewareArgs> {
    return async (args) => {
      this.emit(`command:${command}`, args);
    };
  }

  private eventListener<T extends string>(
    event: T
  ): Middleware<SlackEventMiddlewareArgs<T>> {
    return async (args) => {
      this.emit(`event:${event}`, args);
    };
  }
}

export default SlackEventListener;
