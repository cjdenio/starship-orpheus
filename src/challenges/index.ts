import centering from "./centering";
import name from "./name";
import oxygen from "./oxygen";
import oxygen2 from "./oxygen-2";
import intro from "./util/intro";
import wires from "./wires";

export default [
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
];
