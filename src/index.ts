import "reflect-metadata";
import { App } from "@slack/bolt";
import { createConnection } from "typeorm";

const app = new App({
  token: process.env.SLACK_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

(async () => {
  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
  });

  await app.start(process.env.PORT || 3000);
  console.log("App started!");
})();
