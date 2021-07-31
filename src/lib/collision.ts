import { Draw } from "./engine";
// export function collision(
//   target: Draw,
//   index: number,
//   array: Array<Draw>
// ): Draw {
//   array.forEach((point, idx) => {
//     if (point !== entity && idx <= index) {
//       if (
//         entity.x + entity.radius > point.x &&
//         entity.y + entity.radius > point.y &&
//         entity.x < point.x + point.radius &&
//         entity.y < point.y + point.radius
//       ) {
//         // console.log("modifying");

//         // entity.xFlag = -1 * entity.xFlag;
//         // entity.yFlag = -1 * entity.yFlag;
//         let tX = entity.xFlag;
//         let tY = entity.yFlag;

//         entity.xFlag = point.xFlag;
//         entity.yFlag = point.yFlag;

//         point.xFlag = tX;
//         point.yFlag = tY;

//         entity.x -= entity.booster;
//         entity.y -= entity.booster;

//         point.x += point.booster;
//         point.y += point.booster;

//         // point.xFlag = -1 * point.xFlag;
//         // point.yFlag = -1 * point.yFlag;
//       }
//     }
//   });

//   return entity;
// }
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
