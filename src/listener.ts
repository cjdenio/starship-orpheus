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
    channel: string,
    listener: Middleware<SlackCommandMiddlewareArgs>
  ) {
    if (!this.commandListeners.includes(command)) {
      this.app.command(command, this.commandListener(command));
      this.commandListeners.push(command);
    }

    this.addListener(`command:${command}:${channel}`, listener);
  }

  removeCommand(
    command: string,
    channel: string,
    listener: Middleware<SlackCommandMiddlewareArgs>
  ) {
    this.removeListener(`command:${command}:${channel}`, listener);
  }

  event<T extends string>(
    event: T,
    listener: Middleware<SlackEventMiddlewareArgs<T>>
  ) {
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

export default SlackEventListener;
