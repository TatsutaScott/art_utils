const TAU = Math.PI * 2;

const map = (num, inLo, inHi, outLo, outHi) => {
  const inScale = (num - inLo) / (inHi - inLo);
  const outScale = outHi - outLo;
  return inScale * outScale + outLo;
};

function interpolate(pointA, pointB, normalValue, ease = (x) => x) {
  const result = [];
  for (let d = 0; d < pointA.length; d++) {
    result.push(pointA[d] + (pointB[d] - pointA[d]) * normalValue);
  }
  return result;
}

const random = (a, b) => {
  if (typeof a == "number" && typeof b == "number") {
    const lo = Math.min(a, b);
    const hi = Math.max(a, b);
    const range = hi - lo;
    return Math.random() * range + lo;
  } else if (Array.isArray(a)) {
    return a[Math.floor(Math.random() * a.length)];
  }
};

const shuffle = (arr) => {
  let rnd,
    tmp,
    idx = arr.length;
  while (idx > 1) {
    rnd = (random(0, 1) * idx) | 0;

    tmp = arr[--idx];
    arr[idx] = arr[rnd];
    arr[rnd] = tmp;
  }

  return arr;
};

export { map, random, interpolate, shuffle, TAU };
