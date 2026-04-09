class Obstacle {
  constructor(x, level) {
    this.x = x;
    this.w = random(30, 45);
    this.h = random(40, 70);
    this.y = height - 150 - this.h;
    this.level = level;
  }

  update() {
    this.x -= speed + score * 0.08;
  }

  show() {
    fill(10, 10, 15);
    stroke(255, 50);
    strokeWeight(1);
    rect(this.x, this.y, this.w, this.h, 5, 5, 0, 0);

    noStroke();
    let glowColor =
      this.level === 1
        ? color(0, 255, 200, 150)
        : this.level === 2
          ? color(200, 50, 255, 150)
          : color(255, 50, 50, 150);
    fill(glowColor);
    rect(this.x + 8, this.y + 8, this.w - 16, this.h - 8, 3);
  }

  hits(p) {
    let margin = 4;
    return (
      p.x + margin < this.x + this.w &&
      p.x + p.size - margin > this.x &&
      p.y + margin < this.y + this.h &&
      p.y + p.size > this.y
    );
  }

  offscreen() {
    return this.x < -this.w;
  }
}
