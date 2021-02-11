import { App } from "@slack/bolt";
import { EventEmitter } from "events";

import { Team } from "../../types/team";
import SlackEventListener from "../../listener";

abstract class Challenge extends EventEmitter {
  app: App;
  team: Team;
  slackToken: string;
  listener: SlackEventListener;

  isRunning: boolean = true;

  constructor(
    app: App,
    team: Team,
    slackToken: string,
    listener: SlackEventListener
  ) {
    super();

    this.app = app;
    this.team = team;
    this.listener = listener;

    this.slackToken = slackToken;

    this.init();
    this.addListeners();
  }

  abstract init(): void;

  abstract addListeners(): void;
  abstract removeListeners(): void;

  markCompleted() {
    this.emit("completed");
    this.removeListeners();
    this.isRunning = false;
  }
}

export default Challenge;
