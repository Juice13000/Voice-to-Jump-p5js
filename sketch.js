let mic;
let player;
let platforms = [];
let obstacles = [];
let particles = [];
let speed;
let gameState = 0; 
let score = 0;
let worldLevel = 1;
let bgCurrent;
let bgTarget;
let startTimer = 3; 

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
  startTimer = 3;
}

function draw() {
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

  if (gameState === 0) {
    displayStaticScene();
    fill(255);
    textAlign(CENTER, CENTER);
    if (!mic.enabled) {
      textSize(32);
      text("ACTIVER LE MICRO", width / 2, height / 2);
    } else {
      textSize(80);
      text(ceil(startTimer), width / 2, height / 2);
      if (frameCount % 60 === 0 && startTimer > 0) {
        startTimer--;
      }
      if (startTimer <= 0) {
        gameState = 1;
      }
    }
  } 
  else if (gameState === 1) {
    updateAndShowGame();
  } 
  else if (gameState === 2) {
    displayStaticScene();
    background(0, 180);
    fill(255, 50, 50);
    textAlign(CENTER, CENTER);
    textSize(60);
    text("GAME OVER", width / 2, height / 2 - 30);
    fill(255);
    textSize(30);
    text("Score : " + score, width / 2, height / 2 + 30);
    text("Clique pour rejouer", width / 2, height / 2 + 80);
  }
}

function displayStaticScene() {
  for (let p of particles) p.show();
  for (let plat of platforms) plat.show();
  for (let obs of obstacles) obs.show();
  player.show();
}

function updateAndShowGame() {
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
      obstacles.push(new Obstacle(width + gap + random(80, pWidth - 80), worldLevel));
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

  if (player.y > height) gameState = 2;

  fill(255);
  textSize(30);
  textAlign(LEFT, TOP);
  text("Score: " + score, 20, 20);
}

function mousePressed() {
  if (gameState === 0 && !mic.enabled) {
    userStartAudio().then(() => {
      mic.start();
    });
  } else if (gameState === 2) {
    resetGame();
    gameState = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
