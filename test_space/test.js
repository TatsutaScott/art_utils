import RNBO_device from "../rnbo_util.js";
import patcher from "./rnbo/patch.export.json" with { type: "json" };
import dependencies from "./rnbo/dependencies.json" with { type: "json" };

// RNBO SETUP
const device = new RNBO_device();
device.init(patcher, dependencies);
console.log(device);

// const s = {
//   width: 600,
//   height: 600,
//   bg_color: "rgb(220, 220, 220)",
//   cols: 40,
//   rows: 40
// };
// const [canvas, c] = makeCanvas(s.width, s.height);

// c.fillStyle = s.bg_color;
// c.fillRect(0, 0, s.width, s.height);

// const cellWidth = s.width / s.cols;
// const cellHeight = s.height / s.rows;

// for(let i = 0; i < s.cols; i ++){
//   const xPos = i * cellWidth;

//   for(let j = 0; j < s.rows; j ++){
//     const yPos = j * cellHeight;
//     const fillColor = noise(xPos / s.width , yPos / s.height) * 255;
//     c.fillStyle = `rgb(${fillColor},${fillColor},${fillColor})`;
//     c.fillRect(xPos, yPos, cellWidth, cellHeight);
//   }
// }

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
