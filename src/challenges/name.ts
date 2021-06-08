import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import { Challenge, ChallengeContext } from "./lib/challenge";

const NUM_REACTIONS = process.env.NODE_ENV === "production" ? 3 : 1;
const EMOJI = "white_check_mark";

function onReaction(ctx: ChallengeContext) {
  return async ({
    event,
  }: SlackEventMiddlewareArgs<"reaction_added"> & AllMiddlewareArgs) => {
    if (
      event.reaction === EMOJI &&
      event.item.type === "message" &&
      event.item.channel === ctx.team.channel &&
      event.item_user !== event.user
    ) {
      const resp = await ctx.slack.client.conversations.history({
        latest: event.item.ts,
        inclusive: true,
        limit: 1,
        channel: ctx.team.channel,
        token: ctx.token,
      });

      const message = (
        resp as unknown as {
          messages: {
            text: string;
            reactions: { name: string; users: string[] }[];
          }[];
        }
      ).messages[0];

      if (message) {
        const { text, reactions } = message;
        if (
          (reactions
            .find((i) => i.name === EMOJI)
            ?.users.filter((u) => u !== event.item_user).length || 0) >=
          NUM_REACTIONS
        ) {
          ctx.team.name = text;
          await ctx.team.save();
          await ctx.slack.client.conversations.rename({
            channel: ctx.team.channel,
            name: `spaceteam-${text
              .trim()
              .toLowerCase()
              .replace(/\s/g, "-")
              .replace(/[^a-z0-9-]/g, "")}`,
            token: ctx.userToken,
          });

          await ctx.post(`I've set your team name to *${text}*!`, false);

          await ctx.solve();
        }
      }
    }
  };
}

export default {
  name: "Team Name",

  async init(ctx: ChallengeContext) {
    ctx.data = {
      reactionListener: onReaction(ctx),
    };

    ctx.listener.event("reaction_added", ctx.data.reactionListener);
  },
  async start(ctx: ChallengeContext) {
    await ctx.post(
      `One quick thing before you start: you'll need to work together to come up with a team name. Put your ideas down in the chat :arrow_down:, then react with :${EMOJI}: to the ones you like the most.

I'll continue once a message has ${NUM_REACTIONS} :${EMOJI}: reactions.`
    );
  },
  async remove(ctx: ChallengeContext) {
    ctx.listener.removeListener(
      "event:reaction_added",
      ctx.data.reactionListener
    );
  },
} as Challenge;
