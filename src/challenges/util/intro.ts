import { AllMiddlewareArgs, SlackCommandMiddlewareArgs } from "@slack/bolt";
import { Challenge, ChallengeContext } from "../lib/challenge";

function onCommand(ctx: ChallengeContext) {
  return async ({ ack }: AllMiddlewareArgs & SlackCommandMiddlewareArgs) => {
    await ack({
      response_type: "in_channel",
    });
    await ctx.solve();
  };
}

export default function (part: number, text: string): Challenge {
  return {
    name: `Introduction Part ${part}`,

    async start(ctx) {
      await ctx.post(text + "\n\n_Type /next to continue._");
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
