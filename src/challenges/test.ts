import {
  AllMiddlewareArgs,
  SlackCommandMiddlewareArgs,
  SlackEventMiddlewareArgs,
} from "@slack/bolt";

import { Challenge, ChallengeContext } from "./lib/challenge";

function onCommand(ctx: ChallengeContext) {
  return async ({
    command,
    ack,
  }: AllMiddlewareArgs & SlackCommandMiddlewareArgs) => {
    console.log("challenge 1 got command");
    await ack({ text: "solved" });
    await ctx.solve();
  };
}

export default {
  async start(ctx) {
    await ctx.slack.client.chat.postMessage({
      channel: ctx.team.channel,
      text:
        "Thus, your journey has reached its beginning. You spot a dusty book in the corner, which says _type `/solve` to continue_",
      token: ctx.token,
    });
  },

  async init(ctx) {
    ctx.data = {
      commandListener: onCommand(ctx),
    };

    console.log(`init challenge for team ${ctx.team.id}`);

    ctx.listener.command("/solve", ctx.data.commandListener);
  },

  async remove(ctx) {
    ctx.listener.removeListener("command:/solve", ctx.data.commandListener);
  },
} as Challenge;
