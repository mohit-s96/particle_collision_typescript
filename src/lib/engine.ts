export class Draw {
  x = 0;
  y = 0;
  flag = false;
  xFlag: number;
  yFlag: number;
  radius: number;
  booster = 1;
  target: HTMLDivElement;
  constructor(height: number, width: number) {
    this.xFlag = Math.random() < 0.5 ? 1 : -1;
    this.yFlag = Math.random() < 0.5 ? 1 : -1;

    this.radius = height;

    this.target = document.createElement("div");

    this.target.style.width = width + "px";
    this.target.style.height = height + "px";
    this.target.className = "d1";

    this.target.style.backgroundColor = Draw.getColor();

    this.x = Math.floor(Math.random() * window.innerWidth);
    this.y = Math.floor(Math.random() * window.innerHeight);

    this.target.style.transform = `translate(${this.x + "px"}, ${
      this.y + "px"
    })`;

    Draw.root!.appendChild(this.target);

    this.target.onclick = () => {
      this.booster += 2;
      this.xFlag = -1 * this.xFlag;
      this.yFlag = -1 * this.yFlag;
    };
  }
  static root = document.querySelector(".root");

  static getColor(): string {
    return (
      "#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6)
    );
  }

  render() {
    if (this.booster > 40) {
      this.booster = 2;
    }
    if (this.flag) {
      this.flag = false;
      this.target.style.transition = "transform 40ms linear";
    }
    if (this.x <= 0) {
      this.x = window.innerWidth;
      this.flag = true;
    } else if (this.x >= window.innerWidth) {
      this.x = 0;
      this.flag = true;
    }
    if (this.y <= 0) {
      this.y = window.innerHeight;
      this.flag = true;
    } else if (this.y >= window.innerHeight) {
      this.y = 0;
      this.flag = true;
    }
    if (this.flag) {
      console.log("reset");

      this.target.style.transition = "";
    }
    this.target.style.transform = `translate(${
      (this.x += this.booster * this.xFlag) + "px"
    }, ${(this.y += this.booster * this.yFlag) + "px"})`;
  }
}
