import { Request, Response } from "express";
import { Challenge } from "./lib/challenge";

const airlock: Challenge = {
  name: "Airlock Trouble",
  async init(ctx) {
    const requestListener = (req: Request, res: Response) => {
      ctx.solve();
      res.send("yay");
    };

    ctx.httpListener.addListener(
      `/airlock/start/${ctx.team.id}`,
      requestListener
    );

    return () => {
      ctx.httpListener.removeListener(
        `/airlock/start/${ctx.team.id}`,
        requestListener
      );
    };
  },
  async start(ctx) {
    const password = ctx.team.id === 1 ? "oAHu9FkzrX" : "4T0HbZe7DF";

    await ctx.post(
      `Opening the secret room reveals two things: a manned space rover and a wall filled with hanging spacesuits. You and your team put on the suits with minimal hassle, and survey the airlock. It seems to be ordinary, though slightly larger as to accommodate the rover.

You try the controls, but nothing seems to happen. It apparently still has power, but _it must have been damaged in the crash._

Forcing the door open is out of the question, as there's no way to maintain an airtight seal without the control system online. Your only option is to somehow fix the door.

The ship's manual reveals that the airlocks are managed via an onboard Linux machine, accessible via \`ssh crew@starship.clb.li -p 222${ctx.team.id}\` (and the password is \`${password}\`). With any luck, you'll be able to bring it back up knowing only that bit of information.`
    );
  },
};

export default airlock;
