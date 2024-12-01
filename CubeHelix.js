import { map, limit } from "./math_util";
import Color from "./Color";

class CubeHelix {
  constructor() {
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

  const r = fraction + amp * (-0.14861 * acos + 1.78277 * asin);
  r = limit(r, 0, 1) * 255;

  const g = fraction + amp * (-0.29227 * acos - 0.90649 * asin);
  g = limit(g, 0, 1) * 255;

  const b = fraction + amp * (1.97294 * acos);
  b = limit(b, 0, 1) * 255;

  return new Color(r, g, b);
};

CubeHelix.prototype.palette = function (divisions) {};

export default CubeHelix;

function cubeHelixRGB(fraction, start, rots, hue, gamma) {
  var angle = 2 * Math.PI * (start / 3.0 + 1 + rots * fraction);
  var fract = Math.pow(fraction, gamma);
  var amp = (hue * fract * (1 - fract)) / 2.0;
  var acos = Math.cos(angle);
  var asin = Math.sin(angle);

  var r = fract + amp * (-0.14861 * acos + 1.78277 * asin);
  r = Math.max(Math.min(r, 1.0), 0.0);

  var g = fract + amp * (-0.29227 * acos - 0.90649 * asin);
  g = Math.max(Math.min(g, 1.0), 0.0);

  var b = fract + amp * (+1.97294 * acos);
  b = Math.max(Math.min(b, 1.0), 0.0);

  return [r, g, b];
}
