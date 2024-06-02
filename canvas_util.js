/**Creates a canvas DOM element, as well as a 2D drawing context.
 *
 * @param {number} width Canvas width
 * @param {number} height Canvas height
 * @param {object} [parent = document.body] Parent DOM element to append canvas to
 *
 * @returns {[canvas, context]} Returns an array holding the canvas DOM element and drawing context.
 */

export function makeCanvas(width, height, parent = document.body) {
  const canvas = document.createElement("canvas"); //Creates the canvas DOM element
  parent.appendChild(canvas); //Appends the canvas DOM element to a parent element

  canvas.width = width; //Sets canvas width
  canvas.height = height; //Sets canvas height

  const ctx = canvas.getContext("2d"); //Gets the drawing context from the DOM element

  return [canvas, ctx];
}

/**Download an image of the canvas
 *
 * @param {DOMElement} canvas - Canvas DOM Element
 * @param {String} name - name for the downloaded image file
 * @param {String} [type='png'] - file format. options: png, jpeg, webp
 */
export function download(canvas, name, type = "png") {
  const link = document.createElement("a");
  link.download = name;
  link.href = canvas.toDataURL(`image/${type}.${type}`);
  link.click();
}

/** sets the dimensions of the canvas
 * @param {DOMElement} canvas - the canvas DOM object
 * @param {number} width - width value in pixels
 * @param {number} height - height value in pixels
 */
export function setDimensions(canvas, width, height) {
  canvas.width = width;
  canvas.height = height;
}

/**Sets the background of the canvas
 *
 * @param {DrawingContext} ctx - html canvas rendering context to draw to
 * @param {String} color - color to set background to
 */
export function background(ctx, color) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
}
