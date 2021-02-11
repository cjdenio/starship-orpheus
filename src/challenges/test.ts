import {
  AllMiddlewareArgs,
  SlackCommandMiddlewareArgs,
  SlackEventMiddlewareArgs,
} from "@slack/bolt";
import Challenge from "./lib/challenge";

class TestChallenge extends Challenge {
  boundCommandListener: (
    args: AllMiddlewareArgs & SlackEventMiddlewareArgs<"message">
  ) => Promise<void>;

  init() {
    this.boundCommandListener = this.commandListener.bind(this);
  }

  async announce() {
    await this.app.client.chat.postMessage({
      channel: this.team.channel,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text:
              "challenge starting! say `password` in this channel to solve :)",
          },
        },
      ],
      text: "hi",
      token: this.slackToken,
    });
  }

  addListeners() {
    this.listener.event("message", this.boundCommandListener);
  }

  removeListeners() {
    this.listener.removeListener("event:message", this.boundCommandListener);
  }

  async commandListener({
    message,
  }: SlackEventMiddlewareArgs<"message"> & AllMiddlewareArgs) {
    if (message.channel == this.team.channel && message.text == "password") {
      this.markCompleted();
    } else {
      this.app.client.chat.postMessage({
        token: this.slackToken,
        text: `hmm... \`${message.text}\` wasn't the password...`,
        channel: message.channel,
        thread_ts: message.ts,
      });
    }
  }
}

export default TestChallenge;
