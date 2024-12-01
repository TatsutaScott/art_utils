import { map, limit } from "./math_util.js";
import Color from "./Color.js";

class CubeHelix {
  constructor(start, rot, hue, gamma) {
    this.start = map(start, 0, 1, 0, 3);
    this.rotation = map(rot, 0, 1, -1.5, 1.5);
    this.hue = map(hue, 0, 1, 0, 4);
    this.gamma = map(gamma, 0, 1, 0.6, 1.4);
  }

  static random() {
    const start = Math.random();
    const rot = Math.random();
    const hue = Math.random();
    const gamma = Math.random();

    return new CubeHelix(start, rot, hue, gamma);
  }
}

CubeHelix.prototype.get = function (n) {
  const angle = 2 * Math.PI * (this.start / 3.0 + 1 + this.rotation * n);
  const fraction = Math.pow(n, this.gamma);
  const amp = (this.hue * fraction * (1 - fraction)) / 2;
  const acos = Math.cos(angle);
  const asin = Math.sin(angle);

  let r = fraction + amp * (-0.14861 * acos + 1.78277 * asin);
  r = limit(r, 0, 1) * 255;

  let g = fraction + amp * (-0.29227 * acos - 0.90649 * asin);
  g = limit(g, 0, 1) * 255;

  let b = fraction + amp * (1.97294 * acos);
  b = limit(b, 0, 1) * 255;

  return new Color(r, g, b);
};

CubeHelix.prototype.palette = function (divisions) {
  const palette = [];
  for (let i = 0; i <= divisions - 1; i++) {
    const clr = this.get(i / divisions);
    palette.push(clr);
  }
  return palette;
};

export default CubeHelix;
