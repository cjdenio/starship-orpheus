import { Team } from "./types/team";
import { currentChallenges } from "./state";
import challenges from "./challenges";
import { ChallengeContext } from "./challenges/lib/challenge";

import { app, listener, httpListener } from "./state";

const onSolve = (team: number, index: number) => {
  return async () => {
    await setChallenge(await Team.findOneOrFail(team), index + 1, true);
  };
};

export const setChallenge = async (
  team: Team,
  index: number | null,
  shouldCallStart: boolean
): Promise<void> => {
  // First, de-init the existing challenge (if necessary)
  if (currentChallenges[team.id]) {
    if (currentChallenges[team.id]?.deinit) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      currentChallenges[team.id].deinit();
    }

    currentChallenges[team.id] = null;
  }

  if (index === null) {
    team.currentChallenge = null;
    await team.save();
    return;
  }

  // Is such a challenge nonexistent?
  if (!challenges[index]) {
    if (shouldCallStart) {
      console.log(`Team ${team.id} won!!!`);
    }

    team.currentChallenge = -1;
    await team.save();
    return;
  }

  team.currentChallenge = index;
  await team.save();

  currentChallenges[team.id] = {
    challenge: challenges[team.currentChallenge],
    index: index,
    deinit: undefined,
    context: {
      slack: app,
      team,
      listener,
      httpListener,
      token: process.env.SLACK_TOKEN as string,
      userToken: process.env.SLACK_USER_TOKEN as string,
      solve: onSolve(team.id, index),
      post: async (text: string, divider = true) => {
        app.client.chat.postMessage({
          text,
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text,
              },
            },
            ...(divider
              ? [
                  {
                    type: "divider",
                  },
                ]
              : []),
          ],
          channel: team.channel,
          token: process.env.SLACK_TOKEN as string,
        });
      },
      data: null,
    },
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  currentChallenges[team.id].deinit = await currentChallenges[
    team.id
  ]?.challenge.init(currentChallenges[team.id]?.context as ChallengeContext);

  if (shouldCallStart) {
    currentChallenges[team.id]?.challenge.start(
      currentChallenges[team.id]?.context as ChallengeContext
    );
  }
};
