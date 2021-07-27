import { Challenge } from "./lib/challenge";

const airlock: Challenge = {
  name: "",
  async init(ctx) {
    setTimeout(() => ctx.solve(), 1000);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  },
  async start(ctx) {
    await ctx.post(
      `Opening the secret room reveals two things: a manned space rover and a wall filled with hanging spacesuits. You and your team put on the suits with minimal hassle, and survey the airlock. It seems to be ordinary, though slightly larger as to accommodate the rover.

You try the controls, but nothing seems to happen. _It must have been damaged in the crash._

Forcing the door open is out of the question, as there's no way to maintain an airtight seal without power. Your only option is to somehow fix the door.

`
    );
  },
};

export default airlock;
