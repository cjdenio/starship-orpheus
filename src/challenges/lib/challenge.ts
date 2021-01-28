import { App } from "@slack/bolt";

import Team from "../../types/team";

abstract class Challenge {
  app: App;
  index: number;
  team: Team;

  constructor(app: App, index: number, team: Team) {
    this.app = app;
    this.index = index;
    this.team = team;
  }

  abstract addListeners(): void;
  abstract removeListeners(): void;

  markCompleted() {}
}

export default Challenge;
