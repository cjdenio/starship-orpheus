import "reflect-metadata";
import { createConnection } from "typeorm";

import { Team } from "./types/team";

import { app, currentChallenges } from "./state";
import { setChallenge } from "./util";
import config from "./config";

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
