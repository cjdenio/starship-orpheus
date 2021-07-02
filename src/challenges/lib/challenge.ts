import { App } from "@slack/bolt";

import { Team } from "../../types/team";
import { HttpListener, SlackEventListener } from "../../listener";

export interface ChallengeContext {
  slack: App;
  team: Team;
  listener: SlackEventListener;
  httpListener: HttpListener;
  token: string;
  userToken: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;

  solve: () => Promise<void>;

  // Posts a message to the current team's channel
  post: (text: string, divider?: boolean) => Promise<void>;
}

export interface Challenge {
  name: string;

  hint?: {
    // The hint text
    hint: string;

    // The number of seconds to wait before revealing the hint
    delay: number;
  };

  // Used to register event listeners and such
  init(ctx: ChallengeContext): Promise<() => unknown>;

  // Called when a team starts this challenge
  start(ctx: ChallengeContext): unknown;
}
