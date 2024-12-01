import { limit } from "./math_util.js";
import { random } from "./random_util.js";
import Color from "./Color.js";

/**
 * A class for generating colors based on the CubeHelix color scheme.
 */
class CubeHelix {
  /**
   * Creates a CubeHelix instance.
   *
   * @param {number} start - Starting value for the color scheme, ranging from 0 to 3.
   * @param {number} rot - The number of rotations through the color space, ranging from -1.5 to 1.5.
   * @param {number} hue - Hue intensity factor, ranging from 0 to 4.
   * @param {number} gamma - Gamma correction factor, ranging from 0.6 to 1.4.
   */
  constructor(start, rot, hue, gamma) {
    this.start = start; // 0 <-> 3
    this.rotation = rot; // -1.5 <-> 1.5
    this.hue = hue; // 0 <-> 4
    this.gamma = gamma; // 0.6 <-> 1.4
    this.print();
  }

  /**
   * Generates a random CubeHelix instance with random parameters within valid ranges.
   *
   * @returns {CubeHelix} A new CubeHelix instance with random parameters.
   */
  static random() {
    const start = random(0, 3);
    const rot = random(-1.5, 1.5);
    const hue = random(0, 4);
    const gamma = random(0.6, 1.4);

    return new CubeHelix(start, rot, hue, gamma);
  }
}

/**
 * Computes a single color in the CubeHelix palette based on a normalized input.
 *
 * @param {number} n - A normalized value (0 to 1) representing the position in the palette.
 * @returns {Color} A `Color` object representing the computed RGB color.
 */
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

/**
 * Generates a palette of colors based on the CubeHelix algorithm.
 *
 * @param {number} divisions - The number of colors to generate in the palette.
 * @returns {Color[]} An array of `Color` objects representing the generated palette.
 */
CubeHelix.prototype.palette = function (divisions) {
  const palette = [];
  for (let i = 0; i <= divisions - 1; i++) {
    const clr = this.get(i / divisions);
    palette.push(clr);
  }
  return palette;
};

/**
 * Logs the CubeHelix instance's parameters to the console.
 */
CubeHelix.prototype.print = function () {
  console.log(
    `Cube Helix: 
    start: ${this.start}
    rotation: ${this.rotation}
    hue: ${this.hue}
    gamma: ${this.gamma}`
  );
};

export default CubeHelix;
