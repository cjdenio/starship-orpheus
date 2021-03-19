// global state cool stuff

import { App } from "@slack/bolt";
import { Challenge, ChallengeContext } from "./challenges/lib/challenge";
import SlackEventListener from "./listener";

export let currentChallenges: {
  [team: number]: {
    challenge: Challenge;
    context: ChallengeContext;
    index: number;
  } | null;
} = {};

export const app = new App({
  token: process.env.SLACK_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

export const listener = new SlackEventListener(app);
