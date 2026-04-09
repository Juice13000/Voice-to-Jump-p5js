let mic;
let player;
let platforms = [];
let obstacles = [];
let particles = [];

let speed;
let gameState = 0; // 0: Accueil, 1: En jeu, 2: Game Over
let score = 0;
let worldLevel = 1;

let bgCurrent;
let bgTarget;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  resetGame();
}

function resetGame() {
  score = 0;
  speed = 5;
  worldLevel = 1;
  bgCurrent = color(20, 30, 50);
  bgTarget = color(20, 30, 50);
  player = new Player();
  platforms = [new Platform(0, width * 1.5, 1)];
  obstacles = [];
  particles = [];
}

function draw() {
  if (gameState === 0) {
    background(20, 30, 50);

    drawingContext.shadowOffsetY = 10;
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(0, 0, 0, 150);

    fill(30, 40, 70);
    stroke(0, 255, 200);
    strokeWeight(2);
    rectMode(CENTER);
    rect(width / 2, height / 2, 600, 300, 15);

    drawingContext.shadowBlur = 0;
    noStroke();
    rectMode(CORNER);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(40);
    text("VOICE JUMPER", width / 2, height / 2 - 60);

    textSize(20);
    fill(200);
    text(
      "Parle au micro ou appuie sur ESPACE pour sauter.",
      width / 2,
      height / 2,
    );

    let alpha = 150 + sin(frameCount * 0.1) * 105;
    fill(0, 255, 200, alpha);
    textSize(24);
    text("▶ Clique pour démarrer ◀", width / 2, height / 2 + 70);
  } else if (gameState === 1) {
    if (score < 10) {
      worldLevel = 1;
      bgTarget = color(20, 30, 50);
    } else if (score < 25) {
      worldLevel = 2;
      bgTarget = color(30, 15, 40);
    } else {
      worldLevel = 3;
      bgTarget = color(40, 10, 10);
    }

    bgCurrent = lerpColor(bgCurrent, bgTarget, 0.05);
    background(bgCurrent);

    if (frameCount % 15 === 0) particles.push(new Particle(worldLevel));
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].show();
      if (particles[i].offscreen()) particles.splice(i, 1);
    }

    let lastP = platforms[platforms.length - 1];
    if (lastP.x + lastP.w < width) {
      let gap = random(60, 130) + min(score * 2, 100);
      let pWidth = random(250, 500);
      platforms.push(new Platform(width + gap, pWidth, worldLevel));

      if (random() > 0.6 && pWidth > 300) {
        obstacles.push(
          new Obstacle(width + gap + random(80, pWidth - 80), worldLevel),
        );
      }
    }

    for (let i = platforms.length - 1; i >= 0; i--) {
      platforms[i].update();
      platforms[i].show();
      if (platforms[i].offscreen()) {
        platforms.splice(i, 1);
        score++;
      }
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].update();
      obstacles[i].show();
      if (obstacles[i].hits(player)) gameState = 2;
      if (obstacles[i].offscreen()) obstacles.splice(i, 1);
    }

    let vol = mic.getLevel();
    player.update(vol, platforms);
    player.show();

    if (player.y > height) {
      gameState = 2;
    }

    fill(255);
    textSize(30);
    textAlign(LEFT, TOP);
    text("Score: " + score, 20, 20);
  } else if (gameState === 2) {
    background(0, 180);
    fill(255, 50, 50);
    textAlign(CENTER, CENTER);
    textSize(60);
    text("GAME OVER", width / 2, height / 2 - 30);

    fill(255);
    textSize(30);
    text("Score : " + score, width / 2, height / 2 + 30);

    let alpha = 150 + sin(frameCount * 0.1) * 105;
    fill(255, 255, 255, alpha);
    textSize(20);
    text("Clique pour rejouer", width / 2, height / 2 + 80);
  }
}

function mousePressed() {
  if (gameState === 0) {
    userStartAudio().then(() => {
      mic.start();
      gameState = 1;
    });
  } else if (gameState === 2) {
    resetGame();
    gameState = 1;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
