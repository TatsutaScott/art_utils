import { makeCanvas } from "../canvas_util.js";
import { noise } from "../Noise.js";
import { star } from "../shape_util.js";
import { random } from "../random_util.js";

const s = {
  width: 600,
  height: 600,
  bg_color: "rgb(220, 220, 220)",
  cols: 40, 
  rows: 40
};
const [canvas, c] = makeCanvas(s.width, s.height);

c.fillStyle = s.bg_color;
c.fillRect(0, 0, s.width, s.height);

const cellWidth = s.width / s.cols; 
const cellHeight = s.height / s.rows; 

for(let i = 0; i < s.cols; i ++){
  const xPos = i * cellWidth;

  for(let j = 0; j < s.rows; j ++){
    const yPos = j * cellHeight; 
    const fillColor = noise(xPos / s.width , yPos / s.height) * 255;
    c.fillStyle = `rgb(${fillColor},${fillColor},${fillColor})`;
    c.fillRect(xPos, yPos, cellWidth, cellHeight);
  }
}

// // star function test 
// c.fillStyle = "rgb(100, 150, 60)";
// c.fill(
//   star(
//     s.width / 2,
//     s.height / 2,
//     random(0, 400),
//     random(0, 400),
//     8,
//     random(0, 1),
//     random(-1, 1),
//     random(-1, 1)
//   )
// );
