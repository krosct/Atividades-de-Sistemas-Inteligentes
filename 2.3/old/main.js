
let oxen = [];
let populationSize = 20;
let bullfighterWidth = 50;
let bullfighterHeight = 75;
let countPush = 0;
let sizeCanvas = 1500;
let halfCanvas = sizeCanvas/2;
let center;
let magicTouchNumber = sizeCanvas/40; //distance to consider touched
let dbMagicTouchNumber = magicTouchNumber*magicTouchNumber; //distance to consider touched
let states;

function preload() {
    imgOx = loadImage('boi2.png');
    imgBullfighter = loadImage('toureiro2.png');
}

function setup() {
    //#performance
    let cnv = createCanvas(sizeCanvas, sizeCanvas);
    cnv.drawingContext.willReadFrequently = true; 

    console.log("init canvas: " + sizeCanvas + "x" + sizeCanvas);
    
    for (let i = 0; i < populationSize; i++) {
        // let startX = random(width);
        // let startY = random(height);
        oxen.push(new Ox(0, 0, imgOx));
        console.log("init oxen[" + i + "]: " + oxen.at(-1).visionRadius);
    }
    
    // bullfighter = new Bullfighter(700,700, bullfighterWidth, bullfighterHeight, imgBullfighter, 45);
    bullfighter = new Bullfighter(random(45, sizeCanvas - 45), random(45, sizeCanvas - 45), bullfighterWidth, bullfighterHeight, imgBullfighter, 45);
    console.log("init bullfighter x:" + bullfighter.pos.x + " y:" + bullfighter.pos.y + " d:" + bullfighter.diameter);
    
    // console.log("init count: " + countPush);
    
    checkbox = createCheckbox("Debug Mode", false);
    checkbox.position(sizeCanvas, 10);
    checkbox2 = createCheckbox("Ox State", false);
    checkbox2.position(sizeCanvas, 30);
    checkbox3 = createCheckbox("Ox Vision", false);
    checkbox3.position(sizeCanvas, 50);

    speedMultiplierSlider = createSlider(0, 10, 1, 0.25); 
    speedMultiplierSlider.position(sizeCanvas, 70);
    
    center = createVector(halfCanvas, halfCanvas);
    
}

function draw() {
    // frameRate(speedMultiplierSlider.value());
    background(0);
    
    for (let ox of oxen) {
        if (checkbox2.checked()) {
            console.log("ox.state = " + ox.state);
        }

        if (bullfighter.hit) {
            if (!ox.hit) {
                ox.show();
                continue;
            }
        }

        let bullfighterDirection = p5.Vector.sub(ox.pos, bullfighter.pos);
        let d = bullfighterDirection.magSq(); //distance from the ox to the bullfighter #performance
        
        if (ox.state == 0) { //saw bullfighter, seeking bullfighter
            ox.seek(bullfighter.pos);
            
            //calculations with numbers to the power of two are computationally easier
            if (d < dbMagicTouchNumber) {
                bullfighter.vel.set(ox.vel.copy().mult(5));
                console.log("Pushed: " + countPush++);
                
                ox.hit = true;
                bullfighter.hit = true;
                ox.nextState = 1;
                ox.state = 6;

                break;
            }
                
        } else {
            
            
            let totalRadius = ox.visionRadius + bullfighter.diameter;
            if (d > totalRadius * totalRadius) {
                
                if (ox.state == 1) {
                    
                    ox.searchTarget.set(ox.visionRadius, ox.visionRadius);
                    ox.searchBottom = ox.searchTarget.copy();
                    ox.searchTop = ox.searchTarget.copy();
                    ox.state = 6;
                    ox.nextState = 2;
                    ox.countState = 1;

                } else if (ox.state == 2) {
                    
                    //set the point to go to search
                    ox.searchBottom.y += ox.visionRadius*1.5;
                    if (ox.searchBottom.y > sizeCanvas - ox.visionRadius) {
                        ox.searchBottom.y = sizeCanvas - ox.visionRadius;
                        ox.searchBottom.x += ox.visionRadius*1.5;
                        if (ox.searchBottom.x > sizeCanvas - ox.visionRadius) {
                            ox.searchBottom.x = sizeCanvas - ox.visionRadius;
                        }
                    }
                    ox.searchTarget.set(ox.searchBottom.x, ox.searchBottom.y);
                    ox.state = 6;
                    ox.nextState = 3;
                    
                } else if (ox.state == 3) {
                    
                    //set the point to go to search
                    ox.searchTop.x += ox.visionRadius*1.5;
                    if (ox.searchTop.x > sizeCanvas - ox.visionRadius) {
                        ox.searchTop.x = sizeCanvas - ox.visionRadius;
                        ox.searchTop.y += ox.visionRadius*1.5;
                        if (ox.searchTop.y > sizeCanvas - ox.visionRadius) {
                            ox.searchTop.y = sizeCanvas - ox.visionRadius;
                        }
                    }
                    ox.searchTarget.set(ox.searchTop.x, ox.searchTop.y);
                    ox.state = 6;
                    ox.nextState = 4;
                    
                } else if (ox.state == 4) {
                    
                    //set the point to go to search
                    ox.searchTop.x += ox.visionRadius*1.5;
                    if (ox.searchTop.x > sizeCanvas - ox.visionRadius) {
                        ox.searchTop.x = sizeCanvas - ox.visionRadius;
                        ox.searchTop.y += ox.visionRadius*1.5;
                        if (ox.searchTop.y > sizeCanvas - ox.visionRadius) {
                            ox.searchTop.y = sizeCanvas - ox.visionRadius;
                        }
                    }
                    ox.searchTarget.set(ox.searchTop.x, ox.searchTop.y);
                    ox.state = 6;
                    ox.nextState = 5;
                    
                } else if (ox.state == 5) { 
                    
                    //set the point to go to search
                    ox.searchBottom.y += ox.visionRadius*1.5;
                    if (ox.searchBottom.y > sizeCanvas - ox.visionRadius) {
                        ox.searchBottom.y = sizeCanvas - ox.visionRadius;
                        ox.searchBottom.x += ox.visionRadius*1.5;
                        if (ox.searchBottom.x > sizeCanvas - ox.visionRadius) {
                            ox.searchBottom.x = sizeCanvas - ox.visionRadius;
                        }
                    }
                    ox.searchTarget.set(ox.searchBottom.x, ox.searchBottom.y);
                    ox.state = 6;
                    ox.nextState = 2;
                    
                } else if (ox.state == 6) { 
                    
                    ox.seek(ox.searchTarget);
                    
                    if (checkbox.checked()) {
                        noFill();
                        stroke(0, 100, 255);
                        strokeWeight(5);
                        circle(ox.searchTarget.x, ox.searchTarget.y, 1);
                    }
                    
                    if (p5.Vector.sub(ox.pos, ox.searchTarget).magSq() < dbMagicTouchNumber) {
                        if (ox.searchBottom.x == sizeCanvas - ox.visionRadius ||
                            ox.searchTop.y == sizeCanvas - ox.visionRadius) {
                                ox.state = 1;
                        } else {
                            ox.state = ox.nextState;
                        }
                    }
                    
                } else {
                    console.log("Unexpectabled state! Error here!");
                    exit();
                }
                
            } else {

                if (checkbox.checked()) {
                    console.log("Found bullfighter at " + bullfighter.pos.x + " " + bullfighter.pos.y + " !");
                }
                ox.searchTarget = bullfighter.pos;
                ox.state = 0;
            }
            
        }
            
        ox.update();
        ox.show();
        
        if (checkbox.checked()) {
            strokeWeight(1);
            let visionDiretion = ox.vel.copy();
            visionDiretion.normalize();
            visionDiretion.mult(ox.visionRadius/2);
            push();
            
            //paint line of visionDirection of Ox
            stroke('red');
            line(
                ox.pos.x,
                ox.pos.y,
                ox.pos.x + visionDiretion.x,
                ox.pos.y + visionDiretion.y
            );
            
            //paint line of bullfighterDirection
            stroke('cyan');
            line(
                ox.pos.x,
                ox.pos.y,
                ox.pos.x - bullfighterDirection.x,
                ox.pos.y - bullfighterDirection.y
            );
            
            pop();
        }
        
        if (checkbox3.checked()) {
            noFill();
            stroke(100, 0, 255);
            strokeWeight(1);
            circle(ox.pos.x, ox.pos.y, ox.visionRadius*2);
        }
    }
        
        
    if (checkbox.checked()) {
        //paint circle of bullfighter
        noFill();
        stroke(255, 255, 0);
        strokeWeight(1);
        circle(bullfighter.pos.x, bullfighter.pos.y, bullfighter.diameter);
    }
    
    bullfighter.update();
    bullfighter.show();
        
    // if the bullfighter leaves the canvas, it will be regenerate in another randomized place
    if (bullfighter.pos.x < -bullfighter.w ||
        bullfighter.pos.x > sizeCanvas + bullfighter.w ||
        bullfighter.pos.y < -bullfighter.h ||
        bullfighter.pos.y > sizeCanvas + bullfighter.h) {
        
        checkSuccessAndReproduce();

    }
}
    
function checkSuccessAndReproduce() {
    
    let successfulOx = oxen.find(ox => ox.hit === true);
    if (successfulOx) {
        successfulOx.fitness += 1;
    }
    
    createNewGeneration();
    
    bullfighter = new Bullfighter(random(bullfighter.diameter, sizeCanvas - bullfighter.diameter), random(bullfighter.diameter, sizeCanvas - bullfighter.diameter), bullfighter.w, bullfighter.h, imgBullfighter, bullfighter.diameter);
}
    
function createNewGeneration() {
    let newOxen = [];
    
    //bigger fitness, bigger chance to have children
    let matching = [];
    for (let ox of oxen) {
        let n = ox.fitness*200;
        for (let j = 0; j < n; j++) {
            matching.push(ox);
        }
    }
    
    for (let i = 0; i < populationSize; i++) {
        let parentA = random(matching);
        let parentB = random(matching);
        
        //garantee that, in the begin, there are parents
        if (!parentA || !parentB) {
            parentA = random(oxen);
            parentB = random(oxen);
        }
        
        let childDNA = crossover(parentA.dna, parentB.dna);
        // newOxen.push(new Ox(random(width), random(height), imgOx, childDNA));
        newOxen.push(new Ox(0, 0, imgOx, childDNA));
    }
    
    //new generation
    oxen = newOxen;
    
    for (let i = 0; i < populationSize; i++) {
        console.log("init oxen[" + i + "]: " + oxen[i].visionRadius);
    }
}
    
function crossover(dnaA, dnaB) {
    let newDNA = [];
    //takes the dna by average from parents
    newDNA[0] = (dnaA[0] + dnaB[0]) / 2;
    //takes the dna from father or mother randomly
    // if (random(1) < 0.5) {
    //     newDNA[0] = dnaA[0];
    // } else {
    //     newDNA[0] = dnaB[0];
    // }
    
    let mutationRate = 0.1; // 1% of mutation
    if (random(1) < mutationRate) {
        //variance of dna
        let r = random(-10, 10);
        console.log("mutation occurred!!! " + r + " with " + newDNA[0]);
        newDNA[0] += r;
    }
    
    return newDNA;
}

function createTintedImage(baseImg, r, g, b) {
// Cria um "canvas invisível" do mesmo tamanho da imagem original
let tintedCanvas = createGraphics(baseImg.width, baseImg.height);

// Aplica o tint a esse canvas invisível
tintedCanvas.tint(r, g, b);

// Desenha a imagem original dentro do canvas invisível (o tint será aplicado)
tintedCanvas.image(baseImg, 0, 0);

// Retorna o canvas invisível, que agora contém a imagem já colorida
return tintedCanvas;
}