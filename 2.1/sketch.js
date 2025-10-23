// Seeking a Target (Seek)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/p1Ws1ZhG36g
// https://thecodingtrain.com/learning/nature-of-code/5.2-seek.html

// Seek: https://editor.p5js.org/codingtrain/sketches/AxuChwlgb
// Seek with Sliders: https://editor.p5js.org/codingtrain/sketches/DROTtSI7J
// Arrive: https://editor.p5js.org/codingtrain/sketches/dQx9oOfTN
// Pursue: https://editor.p5js.org/codingtrain/sketches/XbsgoU_of

let vehicle;
let target;
let countFood;
let size;

function setup() {
  size = 500;
  createCanvas(size, size);
  vehicle = new Vehicle(size/5, size/5);
  target = createVector(size/2, size/2);
  countFood = 0;
}

function draw() {
  background(0);
  fill(50, 200, 100);
  stroke(255,100,100);
  strokeWeight(4);
  // noStroke();
  let d = vehicle.pos.dist(target);
  if (d < 8) {
    target = createVector(random(380), random(380));
    countFood++;
    console.log("Comida: " + countFood);
  }
  
  circle(target.x, target.y, 32);
  vehicle.seek(target);
  vehicle.update();
  vehicle.show();
}
