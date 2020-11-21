import { App } from "@slack/bolt";
import { MongoClient } from "mongodb";

import Team from "../../types/team";

abstract class Challenge {
  app: App;
  db: MongoClient;
  index: number;
  team: Team;

  constructor(app: App, db: MongoClient, index: number, team: Team) {
    this.app = app;
    this.db = db;
    this.index = index;
    this.team = team;
  }

  abstract addListeners(): void;
  abstract removeListeners(): void;

  markCompleted() {}
}

export default Challenge;
