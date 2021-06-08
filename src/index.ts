import "reflect-metadata";
import { createConnection } from "typeorm";

import { Team } from "./types/team";

import { app } from "./state";
import { setChallenge } from "./util";

app.command("/start", async ({ ack, command: { channel_id: channel } }) => {
  const team = await Team.findOne({ channel });

  if (!team) {
    ack("Please run this in your team's channel.");
    return;
  }

  await ack("starting");
  await setChallenge(team, 0, true);
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
    if (team.currentChallenge != null) {
      await setChallenge(team, team.currentChallenge, false);
    }
  });

  await app.start(process.env.PORT || 3000);
  console.log("App started!");
})();
