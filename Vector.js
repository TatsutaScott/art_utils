import { map, TAU } from "./util.js";

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static random(length = 1) {
    const theta = Math.random() * Math.PI * 2;
    const x = length * Math.cos(theta);
    const y = length * Math.sin(theta);
    return new Vec(x, y);
  }

  static fromAngle(theta) {
    const x = Math.cos(theta);
    const y = Math.sin(theta);
    return new Vec(x, y);
  }

  static add(v1, v2) {
    const x = v1.x + v2.x;
    const y = v1.y + v2.y;
    return new Vec(x, y);
  }

  static distance(v1, v2) {
    const inBetweenVec = Vec.sub(v2, v1);
    const mag = inBetweenVec.magnitude();
    return mag;
  }

  static sub(v1, v2) {
    const x = v1.x - v2.x;
    const y = v1.y - v2.y;
    return new Vec(x, y);
  }

  static interpolate(v1, v2, val) {
    const x = map(val, 0, 1, v1.x, v2.x);
    const y = map(val, 0, 1, v1.y, v2.y);
    return new Vec(x, y);
  }

  static line(vectors, context) {
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

  static circle(position, radius, context) {
    context.beginPath();
    context.arc(position.x, position.y, radius, 0, TAU);
  }

  static closedShape(points, context) {
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
  static findIntersection(v1, v2, v3, v4) {
    const ua =
      ((v4.x - v3.x) * (v1.y - v3.y) - (v4.y - v3.y) * (v1.x - v3.x)) /
      ((v4.y - v3.y) * (v2.x - v1.x) - (v4.x - v3.x) * (v2.y - v1.y));

    const ub =
      ((v2.x - v1.x) * (v1.y - v3.y) - (v2.y - v1.y) * (v1.x - v3.x)) /
      ((v4.y - v3.y) * (v2.x - v1.x) - (v4.x - v3.x) * (v2.y - v1.y));

    const x = v1.x + ua * (v2.x - v1.x);
    const y = v1.y + ua * (v2.y - v1.y);

    return new Vec(x, y);
  }

  copy() {
    const newCopy = new Vec(this.x, this.y);
    return newCopy;
  }

  rotate(theta) {
    let newHeading = this.heading() + theta;
    const mag = this.magnitude();
    this.x = Math.cos(newHeading) * mag;
    this.y = Math.sin(newHeading) * mag;
    return this;
  }

  heading() {
    const h = Math.atan2(this.y, this.x);
    return h;
  }

  add(a, b) {
    if (arguments.length == 1) {
      this.x += a.x;
      this.y += a.y;
    }

    if (arguments.length == 2) {
      this.x += a;
      this.y += b;
    }
    return this;
  }

  set(a, b) {
    if (arguments.length == 1) {
      this.x = a.x;
      this.y = a.y;
    }

    if (arguments.length == 2) {
      this.x = a;
      this.y = b;
    }
    return this;
  }

  sub(a, b) {
    if (arguments.length == 1) {
      this.x -= a.x;
      this.y -= a.y;
    }

    if (arguments.length == 2) {
      this.x -= a;
      this.y -= b;
    }
    return this;
  }

  mult(a, b) {
    if (arguments.length == 1) {
      this.x *= a;
      this.y *= a;
    } else if (arguments.length == 2) {
      this.x *= a;
      this.y *= b;
    }
    return this;
  }

  magnitude() {
    const mag = Math.sqrt(this.magSq());
    return mag;
  }

  setMag(n) {
    return this.normalize().mult(n);
  }

  normalize() {
    return this.limit(1);
  }

  magSq() {
    const x = this.x;
    const y = this.y;
    return x * x + y * y;
  }

  limit(n) {
    const mSq = this.magSq();
    if (mSq > n * n) {
      this.div(Math.sqrt(mSq)).mult(n);
    }
    return this;
  }

  div(n) {
    this.x /= n;
    this.y /= n;
    return this;
  }
}

export default Vec;
