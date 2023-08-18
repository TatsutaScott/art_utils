/**
 * Draws a line.
 *
 * @param {number} x1 Starting x value
 * @param {number} y1 Starting y value
 * @param {number} x2 Ending x value
 * @param {number} y2 Ending y value
 * @param {object} context Canvas context to draw to
 */

function line(x1, y1, x2, y2, context) {
  context.beginPath(); // Start a new path
  context.moveTo(x1, y1); // Move the pen to (x1, y1)
  context.lineTo(x2, y2); // Draw a line to (x2, y2)
  context.stroke(); // Color in the stroke
}

export { line };
