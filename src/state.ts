// global state cool stuff

import { App, ExpressReceiver } from "@slack/bolt";
import { Challenge, ChallengeContext } from "./challenges/lib/challenge";
import { HttpListener, SlackEventListener } from "./listener";

export const currentChallenges: {
  [team: number]: {
    challenge: Challenge;
    context: ChallengeContext;
    deinit: (() => unknown) | undefined;
    index: number;
  } | null;
} = {};

export const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET as string,
});

export const app = new App({
  token: process.env.SLACK_TOKEN,
  receiver,
});

export const listener = new SlackEventListener(app);
export const httpListener = new HttpListener(receiver);
