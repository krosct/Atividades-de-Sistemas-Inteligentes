// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Evolution EcoSystem

// Creature class

// Create a "bloop" creature
class Bloop {
  constructor(l, dna_) {
    this.position = l.copy(); // Location
    this.health = 300; // Life timer
    this.xoff = random(1000); // For perlin noise
    this.yoff = random(1000);
    this.dna = dna_; // DNA
    // DNA will determine size and maxspeed
    // The bigger the bloop, the slower it is
    this.maxspeed = map(this.dna.genes[0], 0, 1, 8, 1);
    this.r = map(this.dna.genes[0], 0, 1, 0, 50);

    this.vision = map(this.dna.genes[1], 0, 1, 10, 80);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
    this.maxforce = 0.4;
  }

  run(foodList) {
    this.update(foodList);
    this.borders();
    this.display();
  }

  // Method to update position
  update(foodList) {
    let target = this.findClosestFood(foodList);

    if (target != null) {
      this.seek(target);
    } else {
      this.wander();
    }

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    this.health -= 0.2;
  }

  findClosestFood(foodList) {
    let closestDist = Infinity;
    let closestTarget = null;

    for (let i = foodList.length - 1; i >= 0; i--) {
      let foodLocation = foodList[i];
      let d = p5.Vector.dist(this.position, foodLocation);

      if (d < this.vision && d < closestDist) {
        closestDist = d;
        closestTarget = foodLocation;
      }
    }
    return closestTarget;
  }

  wander() {
    let vx = map(noise(this.xoff), 0, 1, -1, 1);
    let vy = map(noise(this.yoff), 0, 1, -1, 1);
    let desired = createVector(vx, vy);
    desired.setMag(this.maxspeed);

    this.xoff += 0.01;
    this.yoff += 0.01;

    // Steering = desired - velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxspeed);

    // Steering = desired - velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  // A bloop can find food and eat it
  eat(f) {
    let food = f.getFood();
    // Are we touching any food objects?
    for (let i = food.length - 1; i >= 0; i--) {
      let foodLocation = food[i];
      let d = p5.Vector.dist(this.position, foodLocation);
      // If we are, juice up our strength!
      if (d < this.r / 2) {
        this.health += 100;
        food.splice(i, 1);
      }
    }
  }

  // At any moment there is a teeny, tiny chance a bloop will reproduce
  reproduce(allBloops) {
    // Chance de reprodução
    if (random(1) < 0.0005) {
      // Encontra um parceiro próximo (dentro da visão)
      let partner = this.findPartner(allBloops);
      
      if (partner != null) {
        // Se encontrou parceiro, faz o crossover
        let childDNA = this.dna.crossover(partner.dna);
        childDNA.mutate(0.1);
        return new Bloop(this.position.copy(), childDNA);
      }
    }
    return null;
  }

  // Encontra o parceiro mais próximo DENTRO do raio de visão
  findPartner(allBloops) {
    let closestDist = Infinity;
    let closestPartner = null;

    for (let i = 0; i < allBloops.length; i++) {
      let other = allBloops[i];
      let d = p5.Vector.dist(this.position, other.position);

      // Não pode ser ele mesmo E tem que estar na visão E ser o mais próximo
      if (other != this && d < this.vision && d < closestDist) {
        closestDist = d;
        closestPartner = other;
      }
    }
    return closestPartner;
  }

  // Wraparound
  borders() {
    if (this.position.x < -this.r/2) this.position.x = width+this.r/2;
    if (this.position.y < -this.r/2) this.position.y = height+this.r/2;
    if (this.position.x > width+this.r/2) this.position.x = -this.r/2;
    if (this.position.y > height+this.r/2) this.position.y = -this.r/2;
  }

  // Method to display
  display() {
    push();
    noFill();
    stroke(255, 0, 0, this.health/2);
    ellipse(this.position.x, this.position.y, this.vision * 2, this.vision * 2);
    pop();

    ellipseMode(CENTER);
    stroke(0, this.health);
    fill(0, this.health);
    ellipse(this.position.x, this.position.y, this.r, this.r);

    fill(255, 255, 0, this.health);
    textAlign(CENTER, CENTER);
    text(`${this.vision.toFixed(2)}/${this.health.toFixed(1)}`, this.position.x, this.position.y);
  }

  // Death
  dead() {
    if (this.health < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}
