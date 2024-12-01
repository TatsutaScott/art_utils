import Canvas from "../Canvas.js";
import CubeHelix from "../CubeHelix.js";
import { rect } from "../shape_util.js";
import { createSlider } from "../DOM_util.js";

const c = new Canvas(document.body, 400, 400);
const helix = CubeHelix.random();

draw(6);

document.body.appendChild(
  createSlider("start", 0, 3, helix.start, 0.05, (val) => {
    helix.start = val;
    draw(6);
  })
);
document.body.appendChild(
  createSlider("rotations", -1.5, 1.5, helix.rotation, 0.05, (val) => {
    helix.rotation = val;
    draw(6);
  })
);
document.body.appendChild(
  createSlider("hue", 0, 4, helix.hue, 0.05, (val) => {
    helix.hue = val;
    draw(6);
  })
);

document.body.appendChild(
  createSlider("gamma", 0.6, 1.4, helix.gamma, 0.05, (val) => {
    helix.gamma = val;
    draw(6);
  })
);

function draw(tiers) {
  for (let q = 0; q < tiers; q++) {
    const divisions = Math.floor(c.width / (1 + q * 20));
    const h = c.height / tiers;
    const y = q * h;

    for (let i = 0; i < divisions; i++) {
      const w = c.width / divisions;
      const x = i * w;
      const rec = rect(x, y, w, h);
      const clr = helix.get(i / divisions).string();
      c.shape(rec, clr, clr);
    }
  }
}
