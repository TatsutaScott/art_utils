function circleS(ctx, p) {
  const point = new Path2D();
  point.arc(p.x, p.y, 0.2, 0, 360);
  ctx.stroke(point);
}

function circleF(ctx, p) {
  const point = new Path2D();
  point.arc(p.x, p.y, 0.2, 0, 360);
  ctx.fill(point);
}

function line(ctx, vectors) {
  ctx.beginPath();
  for (let [index, v] of vectors.entries()) {
    if (index == 0) {
      ctx.moveTo(v.x, v.y);
    } else {
      ctx.lineTo(v.x, v.y);
    }
  }
  ctx.stroke();
}

export { circleS, circleF, line };
