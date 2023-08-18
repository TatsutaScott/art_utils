import Vec from "./Vector";

function vLine(vectors, context) {
  context.beginPath();
  for (let [index, v] of vectors.entries()) {
    if (index == 0) {
      context.moveTo(v.x, v.y);
    } else {
      context.lineTo(v.x, v.y);
    }
  }
  context.stroke();
}

function vCircle(position, radius, context) {
  context.beginPath();
  context.arc(position.x, position.y, radius, 0, Math.PI * 2);
}

function vClosedshape(points, context) {
  context.beginPath();
  for (let [index, v] of points.entries()) {
    if (index == 0) {
      context.moveTo(v.x, v.y);
    } else {
      context.lineTo(v.x, v.y);
    }
  }
  context.closePath();
}

export { vLine, vCircle, vClosedshape };
