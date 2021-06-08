import { AllMiddlewareArgs, SlackCommandMiddlewareArgs } from "@slack/bolt";
import { Challenge, ChallengeContext } from "../lib/challenge";

function onCommand(ctx: ChallengeContext) {
  return async ({ ack }: AllMiddlewareArgs & SlackCommandMiddlewareArgs) => {
    await ack();
    await ctx.solve();
  };
}

export default function (text: string): Challenge {
  return {
    name: "Introduction",

    async start(ctx) {
      await ctx.slack.client.chat.postMessage({
        channel: ctx.team.channel,
        text,
        token: ctx.token,
      });
    },

    async init(ctx) {
      ctx.data = {
        commandListener: onCommand(ctx),
      };

      ctx.listener.command("/next", ctx.team.channel, ctx.data.commandListener);
    },

    async remove(ctx) {
      ctx.listener.removeCommand(
        "/next",
        ctx.team.channel,
        ctx.data.commandListener
      );
    },
  };
}
