class Particle {
  constructor(world) {
    this.x = width;
    this.y = random(0, height);
    this.size = random(2, 6);
    this.speed = speed * random(0.1, 0.4);
    this.world = world;
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    noStroke();
    let pColor =
      this.world === 1
        ? color(150, 255, 200, 150)
        : this.world === 2
          ? color(200, 100, 255, 150)
          : color(255, 150, 0, 150);
    fill(pColor);
    circle(this.x, this.y, this.size);
  }

  offscreen() {
    return this.x < -this.size;
  }
}
