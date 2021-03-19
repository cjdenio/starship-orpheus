import { App } from "@slack/bolt";

import { Team } from "../../types/team";
import SlackEventListener from "../../listener";

export interface ChallengeContext {
  slack: App;
  team: Team;
  listener: SlackEventListener;
  token: string;

  data: any;

  solve: () => Promise<void>;
}

export interface Challenge {
  // Used to register event listeners and such
  init(ctx: ChallengeContext): Promise<void>;

  // Called when a team starts this challenge
  start(ctx: ChallengeContext): Promise<void>;

  // Used to remove event listeners
  remove(ctx: ChallengeContext): Promise<void>;
}
