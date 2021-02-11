import "reflect-metadata";
import { App } from "@slack/bolt";
import { createConnection } from "typeorm";

import { Team } from "./types/team";

import SlackEventListener from "./listener";

import Challenge from "./challenges/lib/challenge";
import challenges from "./challenges";

const app = new App({
  token: process.env.SLACK_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

let currentChallenges: {
  [team: number]: { challenge: Challenge; index: number } | null;
} = {};

(async () => {
  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [Team],
    synchronize: true,
  });

  const listener = new SlackEventListener(app);

  const teams = await Team.find();
  teams.forEach((team) => {
    currentChallenges[team.id] = team.currentChallenge
      ? {
          challenge: new challenges[team.currentChallenge](
            app,
            team,
            process.env.SLACK_TOKEN as string,
            listener
          ),
          index: team.currentChallenge,
        }
      : null;
  });

  await app.start(process.env.PORT || 3000);
  console.log("App started!");
})();
