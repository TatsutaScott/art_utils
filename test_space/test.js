import { makeCanvas } from "../canvas_util.js";
import { star } from "../shape_util.js";
import { random } from "../random_util.js";

const s = {
  width: 800,
  height: 800,
  bg_color: "rgb(220, 220, 220)",
  p_s: 4,
};
const [canvas, c] = makeCanvas(s.width, s.height);

c.fillStyle = s.bg_color;
c.fillRect(0, 0, s.width, s.height);

c.fillStyle = "rgb(100, 150, 60)";
c.fill(
  star(
    s.width / 2,
    s.height / 2,
    random(0, 400),
    random(0, 400),
    8,
    random(0, 1),
    random(-1, 1),
    random(-1, 1)
  )
);
