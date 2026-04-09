class Player {
  constructor() {
    this.size = 40;
    this.x = 100;
    this.y = height / 2;
    this.vy = 0;
    this.gravity = 1;
    this.onGround = false;
  }

  jump(vol) {
    if (this.onGround) {
      if (vol > 0.05 || keyIsDown(32)) {
        this.vy = -16;
        this.onGround = false;
      }
    }
  }

  update(vol, platforms) {
    this.jump(vol);
    this.vy += this.gravity;
    this.y += this.vy;
    this.onGround = false;

    // Collisions avec les plateformes
    for (let p of platforms) {
      if (this.x + this.size > p.x && this.x < p.x + p.w) {
        if (
          this.vy > 0 &&
          this.y + this.size >= p.y &&
          this.y + this.size <= p.y + this.vy + 5
        ) {
          this.y = p.y - this.size;
          this.vy = 0;
          this.onGround = true;
        }
      }
    }
  }

  show() {
    if (!this.onGround) {
      fill(255, 200, 0, 100);
      rect(this.x - 5, this.y + 5, this.size, this.size, 5);
    }

    fill(255, 200, 0);
    stroke(255);
    strokeWeight(2);
    rect(this.x, this.y, this.size, this.size, 5);

    fill(255);
    noStroke();
    rect(this.x + 22, this.y + 8, 12, 12, 3);
    fill(0);
    rect(this.x + 26, this.y + 12, 5, 5);
  }
}
