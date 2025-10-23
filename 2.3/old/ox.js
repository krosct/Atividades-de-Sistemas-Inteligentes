// Seeking a Target (Seek)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/p1Ws1ZhG36g
// https://thecodingtrain.com/learning/nature-of-code/5.2-seek.html

// Seek: https://editor.p5js.org/codingtrain/sketches/AxuChwlgb
// Seek with Sliders: https://editor.p5js.org/codingtrain/sketches/DROTtSI7J
// Arrive: https://editor.p5js.org/codingtrain/sketches/dQx9oOfTN
// Pursue: https://editor.p5js.org/codingtrain/sketches/XbsgoU_of

class Ox {
  constructor(x, y, img, dna = null) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 5;//5
    this.maxForce = 0.3;//0.3
    this.img = img;
    this.state = 1;
    this.previousOxState = 2;
    this.altAxys = 0;
    this.entryPointSearching = 2;
    this.entryRound = true;
    this.countState = 0;
    
    this.dna = [];
    if (dna) {
      this.dna = dna;
    } else {
      this.dna[0] = random(20, 100);
    }
    this.visionRadius = this.dna[0];
    this.searchTarget = createVector(this.visionRadius, this.visionRadius);
    this.searchTop = createVector(this.visionRadius, this.visionRadius);
    this.searchBottom = createVector(this.visionRadius, this.visionRadius);
    this.nextState;
    this.w = this.visionRadius*2;
    this.h = this.w*0.75;
    
    this.red = random(75,255);
    this.green = random(75,255);
    this.blue = random(75,255);
    this.tintedImg = createTintedImage(this.img, this.red, this.green, this.blue);
    
    this.luCorner = null;
    this.llCorner = null;
    this.rlCorner = null;
    this.ruCorner = null;
    this.corners = [];

    this.fitness = 1;
    this.hit = false;
  }
   
  seek(target) {
    let force = p5.Vector.sub(target, this.pos);
    force.setMag(this.maxSpeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);

    let speedMultiplier = speedMultiplierSlider.value();
    let finalVel = p5.Vector.mult(this.vel, speedMultiplier);

    this.pos.add(finalVel);
    // this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);

    if (this.vel.x > 0) {
      scale(-1, 1); // Espelha horizontalmente
    }

    if (this.vel.y < -0.1) {
      rotate(PI / 6);
    } else if (this.vel.y > 0.1) {
      rotate(-PI / 6);
    }

    imageMode(CENTER);
    // tint(this.red, this.green, this.blue);
    image(this.tintedImg, this.visionRadius / 2.7, 0, this.w, this.h);
    // image(this.img, this.visionRadius/2.7, 0, this.w, this.h);

    pop();
  }
}
