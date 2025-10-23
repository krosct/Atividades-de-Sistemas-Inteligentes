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
let countFood = 0;
let sizeCanvas = 600;
let halfCanvas = sizeCanvas/2;
let foodRadius = 30;
let foodPosition;
let vehicleVisionRadius = 200;
let searchTarget;
let vehicleState = 2;
let center;
let searchStep = 0;
let previousOxState = 2;
let entryPointSearching = 2;
let luCorner;
let llCorner;
let ruCorner;
let rlCorner;
let magicNumberlw;
let magicNumberup;
let entryRound = true;

function setup() {
  createCanvas(sizeCanvas, sizeCanvas);
  console.log("init canvas: " + sizeCanvas + "x" + sizeCanvas);

  vehicle = new Vehicle(sizeCanvas / 5, sizeCanvas / 5);
  console.log("init vehicle x:" + vehicle.pos.x + " y:" + vehicle.pos.y);

  foodPosition = createVector(random(sizeCanvas - 30), random(sizeCanvas - 30));
  circle(foodPosition.x, foodPosition.y, foodRadius);
  console.log("init food x:" + foodPosition.x + " y:" + foodPosition.y + " d:" + foodRadius);

  console.log("init count: " + countFood);

  checkbox = createCheckbox("Debug Mode", true);
  checkbox.position(0, sizeCanvas);
  checkbox2 = createCheckbox("Vehicle Position", false);
  checkbox2.position(0, sizeCanvas + 20);
  checkbox3 = createCheckbox("Vehicle Vision", false);
  checkbox3.position(0, sizeCanvas + 40);

  center = createVector(halfCanvas, halfCanvas);
  console.log("init center x:" + center.x + " y:" + center.y);
  
  //creating searching path's points
  magicNumber = ((vehicleVisionRadius - (vehicleVisionRadius/10)) / sizeCanvas);
  magicNumberup = (vehicleVisionRadius / sizeCanvas);
  luCorner = createVector((center.x * (1-magicNumber)), (center.y * (1-magicNumber)));
  llCorner = createVector((center.x * (1-magicNumber)), (center.y * (1+magicNumber)));
  rlCorner = createVector((center.x * (1+magicNumber)), (center.y * (1+magicNumber)));
  ruCorner = createVector((center.x * (1+magicNumber)), (center.y * (1-magicNumber)));
  
  if (checkbox.checked()) {
    console.log("vehicleState = " + vehicleState);
    console.log("entryPointSearching: " + entryPointSearching);
  }
}

function draw() {
  if (!checkbox3.checked()) {
    background(0);
  }

  if (checkbox2.checked()) {
    console.log("vehicle pos x:" + vehicle.pos.x + " y:" + vehicle.pos.y);
  }

  let d = vehicle.pos.dist(foodPosition); //distance from the vehicle to the food
  if (vehicleState == 0) { //seeking food
    vehicle.seek(foodPosition);
    if (d < 10) {
      foodPosition.set(random(sizeCanvas - 30), random(sizeCanvas - 30));
      countFood++;
      console.log("Comida: " + countFood);
      searchStep = 0;
      entryRound = true;

      let d2 = [{
        dist: vehicle.pos.dist(luCorner),
        entry: 2
      }, {
        dist: vehicle.pos.dist(llCorner),
        entry: 3
      }, {
        dist: vehicle.pos.dist(rlCorner),
        entry: 4
      }, {
        dist: vehicle.pos.dist(ruCorner),
        entry: 5
      }, ];

      let minDist = d2[0];

      for (let i = 1; i < d2.length; i++) {
        if (d2[i].dist < minDist.dist) {
          minDist = d2[i];
        }
      }

      entryPointSearching = minDist.entry;

      vehicleState = entryPointSearching;
      if (checkbox.checked()) {
        console.log("vehicleState = " + vehicleState);
        console.log("entryPointSearching: " + entryPointSearching);
      }

    }
  } else {
    if (d > vehicleVisionRadius / 2 + foodRadius / 2) {

      if (vehicleState == 2) { //searching for food left-upper corner

        searchTarget = createVector(luCorner.x - searchStep, luCorner.y - searchStep);
        if (vehicle.pos.dist(searchTarget) < 10) { //if vehicle gets close the viewpoint then it go to next state
          if (entryPointSearching == 2 && entryRound == false) { //if entry point is the right next one so this state is the last one
            vehicleState = 6;
          } else {
            vehicleState = 3;
            entryRound = false;
          }
        }

      } else if (vehicleState == 3) { //searching for food left-lower corner

        searchTarget = createVector(llCorner.x - searchStep, llCorner.y + searchStep);
        if (vehicle.pos.dist(searchTarget) < 10) {
          if (entryPointSearching == 3 && entryRound == false) {
            vehicleState = 6;
          } else {
            vehicleState = 4;
            entryRound = false;
          }
        }

      } else if (vehicleState == 4) { //searching for food right-lower corner

        searchTarget = createVector(rlCorner.x + searchStep, rlCorner.y + searchStep);
        if (vehicle.pos.dist(searchTarget) < 10) {
          if (entryPointSearching == 4 && entryRound == false) {
            vehicleState = 6;
          } else {
            vehicleState = 5;
            entryRound = false;
          }
        }

      } else if (vehicleState == 5) { //searching for food right-upper corner

        searchTarget = createVector(ruCorner.x + searchStep, ruCorner.y - searchStep);
        if (vehicle.pos.dist(searchTarget) < 10) {
          if (entryPointSearching == 5 && entryRound == false) {
            vehicleState = 6;
          } else {
            vehicleState = 2;
            entryRound = false;
          }
        }

      } else if (vehicleState == 6) { //searching for food increase searching area

        searchStep += vehicleVisionRadius * (1 - magicNumber);
        vehicleState = entryPointSearching;
        entryRound = true;

      } else {
        console.log("Unexpectabled state! Error here!");
        exit();
      }

      //restart searchStep for it doesnt reach infinite
      if (searchTarget.x > sizeCanvas || searchTarget.x < 0 ||
        searchTarget.y > sizeCanvas || searchTarget.y < 0) {
        searchStep = 0;
      }

      vehicle.seek(searchTarget);
      if (checkbox.checked()) {
        if (previousOxState != vehicleState) {
          console.log("vehicleState = " + vehicleState);
        }
        previousOxState = vehicleState;
      }

      if (checkbox.checked()) {
        noFill();
        strokeWeight(2);
        stroke(0, 255, 255);
        circle(luCorner.x, luCorner.y, 5);
        circle(llCorner.x, llCorner.y, 5);
        circle(rlCorner.x, rlCorner.y, 5);
        circle(ruCorner.x, ruCorner.y, 5);
        stroke(0, 150, 150);
        circle(luCorner.x - searchStep, luCorner.y - searchStep, 5);
        circle(llCorner.x - searchStep, llCorner.y + searchStep, 5);
        circle(rlCorner.x + searchStep, rlCorner.y + searchStep, 5);
        circle(ruCorner.x + searchStep, ruCorner.y - searchStep, 5);
        strokeWeight(4);
        stroke(255, 255, 0);
        circle(searchTarget.x, searchTarget.y, 5);

      }
    } else {

      vehicleState = 0;
      if (checkbox.checked()) {
        console.log("Found food at " + foodPosition.x + " " + foodPosition.y + " !");
        if (previousOxState != vehicleState) { //needed to debug mode doesnt flood the console
          console.log("vehicleState = " + vehicleState);
        }
        previousOxState = vehicleState;
      }

    }
  }

  vehicle.update();
  vehicle.show();

  noFill();
  stroke(100, 0, 255);
  strokeWeight(1);
  circle(vehicle.pos.x, vehicle.pos.y, vehicleVisionRadius);

  fill(50, 200, 100);
  stroke(255, 100, 100);
  strokeWeight(4);
  circle(foodPosition.x, foodPosition.y, foodRadius);

}