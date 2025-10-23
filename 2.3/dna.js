// Evolution EcoSystem
// Daniel Shiffman <http://www.shiffman.net>

// Class to describe DNA
// Has more features for two parent mating (not used in this example)


// Constructor (makes a random DNA)
class DNA {
  constructor(newgenes) {
    if (newgenes) {
      this.genes = newgenes;
    } else {
      // The genetic sequence
      // DNA is random floating point values between 0 and 1 (!!)
      this.genes = new Array(2);
      for (let i = 0; i < this.genes.length; i++) {
        this.genes[i] = random(0, 1);
      }
    }
  }

  copy() {
    // should switch to fancy JS array copy
    let newgenes = [];
    for (let i = 0; i < this.genes.length; i++) {
      newgenes[i] = this.genes[i];
    }

    return new DNA(newgenes);
  }

  // Based on a mutation probability, picks a new random character in array spots
  mutate(m) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < m) {
        this.genes[i] = random(0, 1);
      }
    }
  }

  // Método de Crossover (Reprodução Sexuada)
  crossover(partner) {
    let newgenes = new Array(this.genes.length);
    
    // Itera por todos os genes
    for (let i = 0; i < this.genes.length; i++) {
      // 50% de chance de pegar o gene deste pai
      if (random(1) < 0.5) {
        newgenes[i] = this.genes[i];
      } else {
      // 50% de chance de pegar o gene do outro pai (partner)
        newgenes[i] = partner.genes[i];
      }
    }
    // Retorna o novo DNA do filho
    return new DNA(newgenes);
  }
  
}