import twoFactorAuth from "./2fa";
import centering from "./centering";
import keys from "./keys";
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
    `It's up to you and your fellow astronauts to restore contact with Mission Control and make it safely to base. You'll need to work together, as each challenge you'll encounter requires unique knowledge and skills. The future of the Mars program rests on your shoulders.`
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
    `A relieved commotion can be heard over the radio. Joyful shouts of "They're alive!" and "Gadzooks!" ring through your ears, and you can't help but feel a bit of relief yourself.

The apparent leader grabs the microphone again, and, though out of breath, she begins to speak.

> Your starship has an inbuilt space rover, tucked away in a secret room, designed for situations just like this one.

She describes the exact location of the rover, and you quickly jot down notes on that sticky note you found earlier.

> To open the room, two of your crew members must insert their keys into seperate control pods found on opposite ends of the starship, and turn them simultaneously.

More commotion. You think you hear _Pizza's here!_, but you can't quite be sure.

> Woohoo!!!... erm... if you'll excuse me, our lunch has just arrived. Best of luck to you all.

Appreciating the rarity of space pizza, you quickly thank her and log off.`
  ),
  keys,
];

export default challenges;
