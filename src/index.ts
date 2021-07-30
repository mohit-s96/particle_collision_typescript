import { Draw } from "./lib/engine";

let i = 0;
const drawEntities: Array<Draw> = [];
while (i < 50) {
  let x = Math.floor(Math.random() * 80 + 18);
  drawEntities.push(new Draw(x, x));
  i++;
}

function gameLoop() {
  drawEntities.forEach((entity: Draw) => {
    entity.render();
  });
  requestAnimationFrame(gameLoop);
}
gameLoop();
