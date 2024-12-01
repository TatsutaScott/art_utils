import Canvas from "../Canvas.js";
import CubeHelix from "../CubeHelix.js";
import { rect } from "../shape_util.js";

const c = new Canvas(document.body, 400, 400);

const helix = CubeHelix.random();

const tiers = 6;

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
