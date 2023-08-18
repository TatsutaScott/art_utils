/** Class representing a 2 dimensional vector */
class Vec {
  /** Make a new Vector
   * @param {number} x - the x coordinate of the vector
   * @param {number} y - the y coordinate of the vector
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * @static generates a vector with a random angle and given length
   * @param {number} length - the length of the vector (Default: 1)
   * @returns {Vec}
   */
  static random(length = 1) {
    const theta = Math.random() * Math.PI * 2; // picks a random number between 0 and 2π
    const x = length * Math.cos(theta); // find the x value using the cosine of theta and scale by length
    const y = length * Math.sin(theta); // find the y value using the sine of theta and scale by length
    return new Vec(x, y);
  }

  /**
   * @static generates a vector based on an angle
   * @param {number} theta - angle to make vector from (in radians)
   * @returns {Vec}
   */
  static fromAngle(theta) {
    const x = Math.cos(theta); // find the x value using the cosine of theta
    const y = Math.sin(theta); // find the y value using the sine of theta
    return new Vec(x, y);
  }

  /**
   * @static gives the distance between two points/vectors
   * @param {Vec} vector1 - first vector
   * @param {Vec} vector2 - second vector
   * @returns {number}  distance between the two vectors
   */
  static distance(vector1, vector2) {
    const differenceVector = Vec.sub(vector2, vector1); // subtracts one from the other to find vector between the two
    const distance = differenceVector.magnitude(); // calculates magnitude of the difference vector
    return distance;
  }

  /**
   * @static adds together two vectors and returns their sum as a vector
   * @param {Vec} vector1 - First vector
   * @param {Vec} vector2 - second vector
   * @returns {Vec}
   */
  static add(vector1, vector2) {
    const x = vector1.x + vector2.x; // combine the x values
    const y = vector1.y + vector2.y; // combine the y values
    return new Vec(x, y);
  }

  /**
   * @static subtracts one vector from another and returns the output as a vector
   * @param {Vec} vector1 - first vector
   * @param {Vec} vector2 - second vector
   * @returns {Vec}
   */
  static sub(vector1, vector2) {
    const x = vector1.x - vector2.x; //subtract x values
    const y = vector1.y - vector2.y; // subtract y values
    return new Vec(x, y);
  }

  /**
   * @static generates a vector that is created by linearly interpolating between two vectors. (0 is vector 1 and 1 is vector 2)
   * @param {Vec} vector1 - first vector
   * @param {Vec} vector2 - second vector
   * @param {number} interpVal - amount of interpolation
   * @returns {Vec}
   */
  static interpolate(vector1, vector2, interpVal) {
    const x = map(interpVal, 0, 1, vector1.x, vector2.x); // uses the map function to interpolate x value
    const y = map(interpVal, 0, 1, vector1.y, vector2.y); // uses the map function to interpolate y value
    return new Vec(x, y);
  }

  /**
   * @static calculates the point at which 2 lines intersect. lines are defined in the arguments as two pairs of vectors.
   * @param {Vec} v1 - first vector in the first line
   * @param {Vec} v2 - second vector in the first line
   * @param {Vec} v3 - first vector in the second line
   * @param {Vec} v4 - second vector in the second line
   * @returns {Vec} vector representing the point of intersection between the two vectors
   */

  static findIntersection(v1, v2, v3, v4) {
    // Check if none of the lines are of length 0
    if ((v1.x === v2.x && v1.y === v2.y) || (v3.x === v4.x && v3.y === v4.y)) {
      return false;
    }

    const denominator =
      (v4.y - v3.y) * (v2.x - v1.x) - (v4.x - v3.x) * (y2 - v1.y); // calculate the denominator for U

    // Lines are parallel if the denominator is 0
    if (denominator === 0) {
      return false;
    }

    //calculate the line segments
    const ua =
      ((v4.x - v3.x) * (v1.y - v3.y) - (v4.y - v3.y) * (v1.x - v3.x)) /
      denominator;
    const ub =
      ((v2.x - v1.x) * (v1.y - v3.y) - (v2.y - v1.y) * (v1.x - v3.x)) /
      denominator;

    // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
      return false;
    }

    // Return a object with the x and y coordinates of the intersection
    const x = v1.x + ua * (v2.x - v1.x);
    const y = v1.y + ua * (v2.y - v1.y);

    return Vec(x, y);
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

const map = (num, inLo, inHi, outLo, outHi) => {
  const inScale = (num - inLo) / (inHi - inLo);
  const outScale = outHi - outLo;
  return inScale * outScale + outLo;
};
export default Vec;
