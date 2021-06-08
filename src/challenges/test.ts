import { AllMiddlewareArgs, SlackCommandMiddlewareArgs } from "@slack/bolt";

import { Challenge, ChallengeContext } from "./lib/challenge";

function onCommand(ctx: ChallengeContext) {
  return async ({ ack }: AllMiddlewareArgs & SlackCommandMiddlewareArgs) => {
    console.log("challenge 1 got command");
    await ack({ text: "solved" });
    await ctx.solve();
  };
}

export default {
  name: "Restoring Oxygen",

  async start(ctx) {
    await ctx.slack.client.chat.postMessage({
      channel: ctx.team.channel,
      text: "Thus, your journey has reached its beginning. You spot a dusty book in the corner, which says _type `/solve` to continue_",
      token: ctx.token,
    });
  },

  async init(ctx) {
    ctx.data = {
      commandListener: onCommand(ctx),
    };

    console.log(`init challenge for team ${ctx.team.id}`);

    ctx.listener.command("/solve", ctx.team.channel, ctx.data.commandListener);
  },

  async remove(ctx) {
    ctx.listener.removeCommand(
      "/solve",
      ctx.team.channel,
      ctx.data.commandListener
    );
  },
} as Challenge;
