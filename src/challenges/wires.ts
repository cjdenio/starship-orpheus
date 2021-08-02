/**
 * 🚨 THIS CHALLENGE WAS SCRAPPED AND WAS NOT USED IN THE EVENT
 */

import {
  AllMiddlewareArgs,
  GenericMessageEvent,
  SlackEventMiddlewareArgs,
} from "@slack/bolt";
import { Challenge, ChallengeContext } from "./lib/challenge";

const INPUT = [];

export default {
  name: "Crossed Wires",
  async init(ctx: ChallengeContext) {
    const onMessage = async ({
      event,
    }: SlackEventMiddlewareArgs<"message"> & AllMiddlewareArgs) => {
      if (
        event.channel === ctx.team.channel &&
        (event as GenericMessageEvent).text === "46553"
      ) {
        await Promise.all([
          ctx.post(
            "Give each other a high-five, you've successfully reconnected the wires and restored power to the communications station."
          ),
          ctx.slack.client.reactions.add({
            timestamp: event.ts,
            token: ctx.token,
            name: "white_check_mark",
            channel: event.channel,
          }),
        ]);
        await ctx.solve();
      }
    };

    ctx.listener.event("message", onMessage);

    return () => {
      ctx.listener.removeListener("event:message", onMessage);
    };
  },
  async start(ctx: ChallengeContext) {
    await ctx.slack.client.chat.postMessage({
      token: ctx.token,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `With your ship's oxygen at a safe level, your team takes a look the communications system. _That can't be good,_ you say as you observe a tangled jumble of wires beneath a desk.

Red, purple, yellow, and green, these wires all seem to have _some_ purpose, but you can't quite figure it out.

:point_right: *Your objective:* write a script (in any language) to do the following:`,
          },
        },
        {
          type: "divider",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `Your challenge input (found in the thread under this message) contains a JSON string with an array of objects (representing wires) that look like this:

\`\`\`
{
  "color": "red",
  "start": 5 // Guaranteed to be unique
}
\`\`\`

Every wire _should_ have a \`start\` and an \`end\` (representing the port that each end of the wire is connected to), but the ends are all disconnected!`,
          },
        },
      ],
      channel: ctx.team.channel,
      text: "With your ship's oxygen at a safe level, your team takes a look the communications system...",
    });
  },
} as Challenge;
