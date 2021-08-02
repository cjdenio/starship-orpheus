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

export default function (
  name: number | string,
  text: string | ((ctx: ChallengeContext) => string)
): Challenge {
  return {
    name: typeof name === "number" ? `Introduction Part ${name}` : name,

    async start(ctx) {
      if (typeof text === "string") {
        await ctx.post(text + "\n\n_*Type /next to continue.*_");
      } else {
        await ctx.post(text(ctx) + "\n\n_*Type /next to continue.*_");
      }
    },

    async init(ctx) {
      const commandListener = onCommand(ctx);

      ctx.listener.command("/next", ctx.team.channel, commandListener);

      return () => {
        ctx.listener.removeCommand("/next", ctx.team.channel, commandListener);
      };
    },
  };
}
