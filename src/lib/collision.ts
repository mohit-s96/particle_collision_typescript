import { Draw } from "./engine";

function biggerBall(x: Draw, y: Draw): [Draw, Draw] {
  if (x.radius > y.radius) return [x, y];
  return [y, x];
}
export function collision(target: Draw, check: Draw): boolean {
  if (target !== check) {
    if (
      target.x + target.radius > check.x &&
      target.y + target.radius > check.y &&
      target.x < check.x + check.radius &&
      target.y < check.y + check.radius
    ) {
      let tX = target.xFlag;
      let tY = target.yFlag;

      target.xFlag = check.xFlag;
      target.yFlag = check.yFlag;

      check.xFlag = tX;
      check.yFlag = tY;

      target.x += (target.radius / 2 + check.radius / 2) * target.xFlag;
      target.y += (target.radius / 2 + check.radius / 2) * target.yFlag;

      check.x += (target.radius / 2 + check.radius / 2) * check.xFlag;
      check.y += (target.radius / 2 + check.radius / 2) * check.yFlag;

      let bigger = biggerBall(target, check);

      let timesBigger = Math.floor(bigger[0].radius / bigger[1].radius);

      bigger[1].booster += timesBigger;

      bigger[0].booster += 1;

      return true;
    }
  }

  return false;
}
