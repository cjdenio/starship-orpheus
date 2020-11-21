import Challenge from "./lib/challenge";

class TestChallenge extends Challenge {
  announce() {
    this.app.client.chat.postMessage({
      channel: "",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "hi",
          },
        },
      ],
      text: "hi",
    });
  }

  addListeners() {
    this.app.event("message", this.onMessage);
  }

  removeListeners() {}

  async onMessage() {}
}

export default TestChallenge;
