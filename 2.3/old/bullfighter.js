class Bullfighter {
  constructor(x, y, w, h, img, diameter) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 99;
    this.maxForce = 0.2;
    this.img = img;
    this.w = w;
    this.h = h;
    this.diameter = diameter;
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
    
    this.vel.mult(0.97);
    if (this.vel.mag() < 0.1) {
      this.vel.set(0, 0);
    }
    
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
      rotate(PI / 4);
    } else if (this.vel.y > 0.1) {
      rotate(-PI / 4);
    }

    imageMode(CENTER);
    image(this.img, 0, 0, this.w, this.h);

    pop();
  }
}
