class Platform {
  constructor(x, w, level) {
    this.x = x;
    this.y = height - 150;
    this.w = w;
    this.h = height - this.y;
    this.level = level;
  }

  update() {
    this.x -= speed + score * 0.08;
  }

  show() {
    let topColor =
      this.level === 1
        ? color(0, 200, 100)
        : this.level === 2
          ? color(150, 80, 200)
          : color(255, 100, 0);
    let bodyColor =
      this.level === 1
        ? color(20, 50, 40)
        : this.level === 2
          ? color(40, 20, 60)
          : color(80, 20, 0);

    noStroke();
    fill(bodyColor);
    rect(this.x, this.y, this.w, this.h, 10, 10, 0, 0);

    fill(topColor);
    rect(this.x, this.y, this.w, 15, 10, 10, 0, 0);

    fill(255, 100);
    rect(this.x, this.y + 15, this.w, 3);
  }

  offscreen() {
    return this.x < -this.w;
  }
}
