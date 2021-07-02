import "reflect-metadata";
import { createConnection } from "typeorm";

import { Team } from "./types/team";

import { app } from "./state";
import { setChallenge } from "./util";

app.command("/start", async ({ ack, command: { text } }) => {
  const teams = await Team.find();

  await ack();
  teams.forEach((team) => {
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

  await app.start(process.env.PORT || 3000);
  console.log("App started!");
})();
