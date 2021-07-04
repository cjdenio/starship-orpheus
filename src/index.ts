import "reflect-metadata";
import { createConnection } from "typeorm";

import { Team } from "./types/team";

import { app, currentChallenges } from "./state";
import { setChallenge } from "./util";
import config from "./config";
import { SectionBlock } from "@slack/bolt";
import challenges from "./challenges";

app.command("/start", async ({ ack, command: { text, user_id: user } }) => {
  if (!config.admin.includes(user)) {
    await ack("wat");
  }

  const teams = await Team.find();

  await ack();
  teams.forEach(async (team) => {
    if (text === "null") {
      await setChallenge(team, null, true);
      console.log(currentChallenges);

      return;
    }

    setChallenge(team, parseInt(text) || 0, true);
  });
});

app.command("/starship-status", async ({ ack }) => {
  const blocks: SectionBlock[] = [];

  const teams = await Team.createQueryBuilder("team").orderBy("id").getMany();

  teams.forEach((team) => {
    if (team.currentChallenge !== null) {
      blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Team ${team.id} (${
            team.name || "_no name yet_"
          }) is on challenge ${team.currentChallenge}/${challenges.length}: *${
            challenges[team.currentChallenge].name
          }*`,
        },
      });
    } else {
      blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Team ${team.id} (${
            team.name || "_no name yet_"
          }) isn't working on a challenge right now.`,
        },
      });
    }
  });

  await ack({
    blocks,
  });
});

(async () => {
  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [Team],
    synchronize: true,
  });

  // Init challenges
  const teams = await Team.find();
  teams.forEach(async (team) => {
    if (team.currentChallenge !== null) {
      await setChallenge(team, team.currentChallenge, false);
    }
  });

  await app.start(parseInt(process.env.PORT!) || 3000);
  console.log("App started!");
})();
