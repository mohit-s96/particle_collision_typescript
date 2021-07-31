import { collision } from "./lib/collision";
import { Draw } from "./lib/engine";

let i = 0;
let drawEntities: Array<Draw> = [];

while (i < 5) {
  let x = Math.floor(Math.random() * 80 + 18);
  drawEntities.push(new Draw(x, x));
  i++;
}

type tuple = [Draw, Draw];
let arr: [tuple] | any;

function checkIfVisited(tup: tuple): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (tup[0] === arr[i][1] && tup[1] === arr[i][0]) return true;
  }
  return false;
}
const nav = document.querySelector(".nav")!;
function printSystemChaos(arr: Array<Draw>) {
  let x = 0;
  arr.forEach((a) => (x += a.booster));
  x = x / arr.length;
  nav.textContent = x + "";
}

function gameLoop() {
  printSystemChaos(drawEntities);
  arr = [];
  for (let i = 0; i < drawEntities.length; i++) {
    for (let j = 0; j < drawEntities.length; j++) {
      if (!checkIfVisited([drawEntities[i], drawEntities[j]])) {
        const res = collision(drawEntities[i], drawEntities[j]);
        if (res) {
          arr.push([drawEntities[i], drawEntities[j]]);
        }
      }
    }
  }
  drawEntities.forEach((entity: Draw) => {
    entity.render();
  });
  // drawEntities = drawEntities.map(collision);
  requestAnimationFrame(gameLoop);
}
gameLoop();
