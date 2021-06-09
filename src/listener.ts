import {
  App,
  ExpressReceiver,
  Middleware,
  SlackCommandMiddlewareArgs,
  SlackEventMiddlewareArgs,
} from "@slack/bolt";
import { EventEmitter } from "events";

import config from "./config";

export class HttpListener extends EventEmitter {
  receiver: ExpressReceiver;

  constructor(receiver: ExpressReceiver) {
    super();

    this.receiver = receiver;

    receiver.app.use((req, res, next) => {
      if (this.listenerCount(req.path) > 0) {
        this.emit(req.path, req, res);
      } else {
        next();
      }
    });
  }
}

export class SlackEventListener extends EventEmitter {
  app: App;

  commandListeners: string[] = [];
  eventListeners: string[] = [];

  constructor(app: App) {
    super();

    this.app = app;

    config.commands.forEach((c) => {
      app.command(c, this.commandListener(c));
    });

    config.events.forEach((e) => {
      app.event(e, this.eventListener(e));
    });
  }

  command(
    command: string,
    channel: string,
    listener: Middleware<SlackCommandMiddlewareArgs>
  ): void {
    this.addListener(`command:${command}:${channel}`, listener);
  }

  removeCommand(
    command: string,
    channel: string,
    listener: Middleware<SlackCommandMiddlewareArgs>
  ): void {
    this.removeListener(`command:${command}:${channel}`, listener);
  }

  event<T extends string>(
    event: T,
    listener: Middleware<SlackEventMiddlewareArgs<T>>
  ): void {
    this.addListener(`event:${event}`, listener);
  }

  private commandListener(
    command: string
  ): Middleware<SlackCommandMiddlewareArgs> {
    return async (args) => {
      if (
        this.listenerCount(`command:${command}:${args.command.channel_id}`) > 0
      ) {
        this.emit(`command:${command}:${args.command.channel_id}`, args);
      } else {
        console.log("ack-ing unhandled command");
        await args.ack();
      }
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
