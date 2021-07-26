/* eslint-disable @typescript-eslint/no-empty-function */
import { AllMiddlewareArgs, SlackCommandMiddlewareArgs } from "@slack/bolt";
import { Challenge } from "./lib/challenge";

const keys: Challenge = {
  name: "Locating The Rover",
  async init(ctx) {
    let runs: { [user: string]: boolean } = {};
    let timeout: NodeJS.Timeout | undefined;

    const commandListener = async ({
      ack,
      command: { user_id: user },
    }: AllMiddlewareArgs & SlackCommandMiddlewareArgs) => {
      await ack();

      if (!timeout) {
        // Start the timer
        timeout = setTimeout(async () => {
          const users = Object.keys(runs);

          if (users.length === 2) {
            await ctx.post(
              `:white_check_mark: \`Door unlocked. Users authenticated: ${users
                .map((u) => `<@${u}>`)
                .join(", ")}\``
            );
            await ctx.solve();
          } else if (users.length === 1) {
            await ctx.post(`:rotating_light: _buzzer noises_

Nice try, <@${users[0]}>, but someone else needs to turn their key with you.`);
          } else {
            await ctx.post(`:rotating_light: _buzzer noises_

AAAAAAAAAAAA ${users.length} PEOPLE IS TOO MUCH`);
          }

          runs = {};
          timeout = undefined;
        }, 1000);
      }

      runs[user] = true;
    };

    ctx.listener.command("/opendoor", ctx.team.channel, commandListener);

    return () => {
      ctx.listener.removeCommand(
        "/opendoor",
        ctx.team.channel,
        commandListener
      );
    };
  },
  async start(ctx) {
    ctx.post(
      "*Your objective:* To open the door, two, and *exactly two*, of your team members must simultaneously run the `/opendoor` slash command inside this channel.",
      false
    );
  },
};

export default keys;
