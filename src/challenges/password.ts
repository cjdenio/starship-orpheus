import {
  AllMiddlewareArgs,
  GenericMessageEvent,
  SlackEventMiddlewareArgs,
} from "@slack/bolt";
import { Challenge, ChallengeContext } from "./lib/challenge";

const PASSWORD = "GaDz00k$!!";

const password: Challenge = {
  name: "Finding The Password",
  async init(ctx: ChallengeContext) {
    const onMessage = async (
      args: SlackEventMiddlewareArgs<"message"> & AllMiddlewareArgs
    ) => {
      const event = args.event as GenericMessageEvent;

      if (
        event.channel === ctx.team.channel &&
        !event.thread_ts &&
        event.text === PASSWORD
      ) {
        await ctx.solve();
      }
    };

    ctx.listener.event("message", onMessage);

    return () => {
      ctx.listener.removeListener("event:message", onMessage);
    };
  },
  async start(ctx: ChallengeContext) {
    await ctx.post(`An EEBY DEEBY-ified login screen appears, but nobody on your team can remember the password.

Fortunately, there's a hint on a sticky note taped to the monitor:
\`\`\`
${Buffer.from(Buffer.from(PASSWORD).toString("base64")).toString("hex")}
\`\`\`

Enter the password down in the chat :arrow_down:`);
  },
};

export default password;
