import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import { setChallenge } from "../util";
import { Challenge, ChallengeContext } from "./lib/challenge";

function onMessage(ctx: ChallengeContext) {
  return async ({
    event,
  }: SlackEventMiddlewareArgs<"message"> & AllMiddlewareArgs) => {
    if (event.channel === ctx.team.channel && event.text === "46553") {
      await ctx.post(
        "`Access granted. Oxygen reserve successfully switched to backup.`",
        false
      );
      await ctx.solve();
    } else if (event.channel === ctx.team.channel && event.text === "back") {
      await setChallenge(ctx.team, ctx.team.currentChallenge - 1, true);
    }
  };
}

export default {
  name: "Restoring Oxygen, Part 1",

  async init(ctx: ChallengeContext) {
    ctx.data = {
      messageListener: onMessage(ctx),
    };

    ctx.listener.event("message", ctx.data.messageListener);
  },
  async start(ctx: ChallengeContext) {
    await ctx.post(
      `You suddenly remember that oxygen can only be fully switched over with an admin code. Please type the admin code below :arrow_down:
 
_hint: don't know it? type \`back\` to try the previous challenge again_`
    );
  },
  async remove(ctx: ChallengeContext) {
    ctx.listener.removeListener("event:message", ctx.data.messageListener);
  },
} as Challenge;
