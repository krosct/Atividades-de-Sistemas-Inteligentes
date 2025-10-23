// Evolution EcoSystem
// Daniel Shiffman <http://www.shiffman.net>
// The Nature of Code

// A World of creatures that eat food
// The more they eat, the longer they survive
// The longer they survive, the more likely they are to reproduce
// The bigger they are, the easier it is to land on food
// The bigger they are, the slower they are to find food
// When the creatures die, food is left behind


let world;
let speedSlider;
let resetButton;
let timeAccumulator = 0;

function setup() {
  createCanvas(1280, 720);
  // World starts with 30 creatures
  // and 30 pieces of food
  world = new World(30);

  speedSlider = createSlider(0.2, 100, 1, 0.1);
  speedSlider.position(10, height + 10); // Posição abaixo do canvas
  resetButton = createButton('Resetar Velocidade (1x)');
  resetButton.position(speedSlider.x + speedSlider.width + 10, height + 10);
  resetButton.mousePressed(resetSpeed);
}

function resetSpeed() {
  speedSlider.value(1);
}

function draw() {
  let simulationSpeed = speedSlider.value();
  timeAccumulator += simulationSpeed;
  while (timeAccumulator >= 1.0) {
    background(175);
    world.run();
    timeAccumulator -= 1.0;
  }
}

// We can add a creature manually if we so desire
function mousePressed() {
  if (mouseY < height && mouseX < width) {
    world.born(mouseX, mouseY);
  }
}

function mouseDragged() {
  if (mouseY < height && mouseX < width) {
    world.born(mouseX, mouseY);
  }
}