import twoFactorAuth from "./2fa";
import centering from "./centering";
import { Challenge } from "./lib/challenge";
import name from "./name";
import oxygen from "./oxygen";
import oxygen2 from "./oxygen-2";
import password from "./password";
import intro from "./util/intro";
import wires from "./wires";

const challenges: Challenge[] = [
  intro(
    1,
    `_You wake up._
      
Looking around, you recall that it's 2036, and you're a crew member on the Starship _Orpheus_, a vessel transporting some of the brightest engineering minds to a base on Mars.

Unfortunately, your ship was forced to make an emergency landing due to engine failure, with your base nowhere in sight.

You and your fellow crew members quickly discover that the _Orpheus_' communications and navigational systems are down, and there's no telling how long your oxygen will last.`
  ),
  intro(
    2,
    `It's up to you and your fellow astronauts to restore contact with Mission Control and make it safely to base. You'll need to work together, pooling together your collective skills. The future of the Mars program rests on your shoulders.`
  ),
  name,
  intro(
    3,
    (ctx) =>
      `With your team name decided, you're ready to begin. Good luck, team *${ctx.team.name}*.`
  ),
  oxygen,
  oxygen2,
  wires,
  centering,
  password,
  twoFactorAuth,
  intro(
    "Making Contact",
    `_You hear static._

> _Hello?_ you say.

> _Hello? Who's there?_ an anxious voice replies.

A hush falls over your group.

> This is the crew of the Starship _Orpheus_.`
  ),
  intro(
    "Making Contact: Part 2",
    `A relieved commotion can be heard over the radio.`
  ),
];

export default challenges;
