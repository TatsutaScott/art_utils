import { map } from "./math_util.js";

/** class representing a color */
export default class Color {
  /** creates a new color
   * @param {number} r - red value
   * @param {number} g - green value
   * @param {number} b - blue value
   * @param {number} a - alpha value [default: 1]
   */
  constructor(r, g, b, a = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.hex = Color.RGBtoHex(r, g, b, a);
  }

  /** Alternative constructor interface function to create a color object using a hex color string
   * @param {string} hexString - a string hex color (ex: '#5e4fa2')
   * @returns {Color} returns a color object
   */
  static hexColor(hexString) {
    const rgbaArray = Color.hexToRGB(hexString); // uses the static hexToRGB function to make array of rgba values
    return new Color(...rgbaArray); // use the array to create a new color using the constructor
  }

  /** converts a string respresenting a hex color (ex. '#43ff64d9') and converts it to an array of integers
   * can accept a color with or without transparency
   * @param {string} hex - a string with the hex code for colors
   * @returns {[string, string, string, string]} an array of ints representing rgba
   */
  static hexToRGB(hex) {
    // provides a helper function to slice string and convert to integer
    const toInt = (string, start, end) => {
      return parseInt(string.slice(start, end), 16);
    };
    const alpha = hex.length > 7 ? toInt(hex, 7, 9) / 255 : 1; // if there is an alpha value convert to float else 1
    return [toInt(hex, 1, 3), toInt(hex, 3, 5), toInt(hex, 5, 7), alpha]; // combine into array and return
  }

  /** Converts an array representing an rgba color to a hex color string
   * @param {number} r - the red value (range: [0 - 255])
   * @param {number} g - the green value (range: [0 - 255])
   * @param {number} b - the blue value (range: [0 - 255])
   * @param {number} a - the alpha value (range: [0 - 1])
   * @param {boolean} alpha - picks whether or not to include alpha information in the final string
   * @returns {string} a hex color string i.e. '#ffffff'
   */
  static RGBtoHex(r, g, b, a, alpha = false) {
    if (alpha) {
      return (
        "#" +
        r.toString(16) +
        g.toString(16) +
        b.toString(16) +
        (a * 255).toString(16)
      );
    } else {
      return "#" + r.toString(16) + g.toString(16) + b.toString(16);
    }
  }

  /** Mixes two colors together
   * @param {Color | [number] | string} color1 - starting color in the interpolation (rgb(a) | hex string)
   * @param {Color | [number] | string} color2 - end color in the interpolation (rgb(a) | hex string)
   * @param {number} factor - value between 0 and 1 representing interpolation position between color1 and color2
   * @returns {[number]} color formatted as [r, g, b, a]
   */
  static interpolate(color1, color2, factor = 0.5) {
    // console.log(color1, color2);
    const c1 =
      color1 instanceof Color
        ? color1.getRGB()
        : !Array.isArray(color1)
        ? Color.hexToRGB(color1)
        : color1; // makes sure color is rgb(a)
    const c2 =
      color2 instanceof Color
        ? color2.getRGB()
        : !Array.isArray(color2)
        ? Color.hexToRGB(color2)
        : color2; // makes sure color is rgb(a)
    const result = []; // init result array

    for (var i = 0; i < 3; i++) {
      result.push(Math.round(map(factor, 0, 1, c1[i], c2[i]))); // for r, g, b interpolate between the two values
    }
    result[3] = Math.round(map(factor, 0, 1, c1[3] || 1, c2[3] || 1)); // interpolate map *if missing alpha replace with 1
    return new Color(...result); // return as a new color object
  }
}

/** basic method to format and print color data */
Color.prototype.print = function () {
  console.log(
    `R: ${this.r} G: ${this.g} B: ${this.b} A: ${this.a} \nHex:${this.getHex()}`
  );
};

/** basic method to format and return color data in string for use in palette */
Color.prototype.printString = function () {
  const rgba = `RGBA: [${this.r}, ${this.g}, ${this.b}, ${this.a}] \n`;
  const hex = `Hex:${this.getHex()}\n`;
  return rgba + hex;
};

/** outputs a color object's hex code
 * @param {boolean} alpha - whether or not to include alpha information in the hex color
 * @returns {string} the hex color string
 */
Color.prototype.getHex = function (alpha = false) {
  return Color.RGBtoHex(this.r, this.g, this.b, this.a, alpha);
};

/** outputs a color's data as a string that can be used with the html canvas or css.
 * @returns {string} output color string
 */
Color.prototype.string = function () {
  return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
};

/** Sets a canvas's fill to the color
 * @param {object} context - the drawing context of the canvas
 */
Color.prototype.setFill = function (context) {
  context.fillStyle = this.string(); // sets the fill style of the drawing context to the string output of the color
};

/** Sets a canvas's stroke to the color
 * @param {object} context - the drawing context of the canvas
 */
Color.prototype.setStroke = function (context) {
  context.strokeStyle = this.string(); // sets the stroke style of the drawing context to the string output of the color
};

/** simple utility function to get the rgb of a color as an array */
Color.prototype.getRGB = function () {
  if (!this.r && !this.b && !this.g && !this.a) {
    return Color.hexToRGB(this.hex);
  } else {
    return [this.r, this.b, this.g, this.a];
  }
};
