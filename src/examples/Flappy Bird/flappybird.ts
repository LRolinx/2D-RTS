import P5 from 'p5';
import Neat, { activation, Hyperparameters } from "../../NeatNetwork";

const p5 = new P5(() => { });
let isFastSpeed = true;

class Bird {
    constructor() {
        this.y = p5.height / 2;
        this.x = 64;
        this.dead = false;

        this.gravity = 0.8;
        this.lift = -12;
        this.velocity = 0;


        this.score = 0;
        this.fitness = 0;

    }

    show() {
        if (!this.dead) {
            p5.stroke(255);
            p5.fill(255, 205, 66, 100);
            p5.ellipse(this.x, this.y, 32, 32);
        }
    }

    up() {
        if (!this.dead) this.velocity += this.lift;
    }



    closestP(pipes) {

        // Find the closest pipe
        let closest = null;
        let closestD = Infinity;
        for (let i = 0; i < pipes.length; i++) {
            let d = (pipes[i].x + pipes[i].w) - this.x;
            if (d < closestD && d > 0) {
                closest = pipes[i];
                closestD = d;
            }
        }




        return closest;
    }

    inputss(pipes) {
        let inputs = [];
        let closest = this.closestP(pipes);
        inputs[0] = p5.map(closest.x, this.x, p5.width, 0, 1);
        // top of closest pipe opening
        inputs[1] = p5.map(closest.top, 0, p5.height, 0, 1);
        // bottom of closest pipe opening
        inputs[2] = p5.map(closest.bottom, 0, p5.height, 0, 1);
        // bird's y position
        inputs[3] = p5.map(this.y, 0, p5.height, 0, 1);
        // bird's y velocity
        inputs[4] = p5.map(this.velocity, -5, 5, 0, 1);
        return inputs;
    }

    offScreen() {
        return (this.y > p5.height || this.y < 0);
    }

    update() {
        this.score++;

        this.velocity += this.gravity;
        //this.velocity *= 0.9;
        this.y += this.velocity;
    }

}

class Pipe {

    constructor() {
        this.spacing = 125;
        this.top = p5.random(p5.height / 15, 3 / 4 * p5.height);
        this.bottom = p5.height - (this.top + this.spacing);
        this.x = p5.width;
        this.w = 80;
        this.speed = 6;
    }

    hits(bird) {
        if (bird.y < this.top || bird.y > p5.height - this.bottom) {
            if (bird.x > this.x && bird.x < this.x + this.w) {
                return true;
            }
        }
        return false;
    }

    show() {
        p5.fill(22, 160, 93);
        p5.rectMode(p5.CORNER);
        p5.rect(this.x, 0, this.w, this.top);
        p5.rect(this.x, p5.height - this.bottom, this.w, this.bottom);
    }

    update() {
        this.x -= this.speed;
    }

    offscreen() {
        if (this.x < -this.w) {
            return true;
        } else {
            return false;
        }
    }
}

const TOTAL = 300;
let birds = [];
let pipes = [];
let hyperparams = new Hyperparameters();
hyperparams.default_activation = activation.LEAKY_RELU
let counter = 0;
let slider;
let neat = new Neat(5, 1, TOTAL);
console.log(neat)

// let config = {
//     model: [
//         { nodeCount: 5, type: "input" },
//         { nodeCount: 2, type: "output", activationfunc: activation.SOFTMAX }
//     ],
//     mutationRate: 0.1,
//     crossoverMethod: crossover.RANDOM,
//     mutationMethod: mutate.RANDOM,
//     populationSize: TOTAL
// };


p5.setup = () => {
    p5.createCanvas(window.outerWidth, window.outerHeight - 130);
    slider = p5.createSlider(1, 10, 1);
    for (let i = 0; i < TOTAL; i++) {
        birds[i] = new Bird();
    }
}

p5.draw = () => {
    for (let n = 0; n < slider.value(); n++) {
        if (counter % 75 == 0) {
            pipes.push(new Pipe());
        }
        counter++;

        for (let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].update();

            for (let j = birds.length - 1; j >= 0; j--) {
                if (pipes[i].hits(birds[j])) {
                    birds[j].dead = true;
                }
            }

            if (pipes[i].offscreen()) {
                pipes.splice(i, 1);
            }
        }

        for (let i = birds.length - 1; i >= 0; i--) {
            if (birds[i].offScreen()) {
                birds[i].dead = true;
            }
        }

        for (let bird of birds) {
            if (!bird.dead) bird.update();
        }

        for (let i = 0; i < TOTAL; i++) {
            const desicions = neat.get_genomes()[i].forward(birds[i].inputss(pipes))

            if (desicions[0] >= 0.5) {
                birds[i].up();
            }
        }

        let finish = true;
        for (let z = 0; z < birds.length; z++) {
            if (!birds[z].dead) {
                finish = false;
                break;
            }
        }
        if (finish) {
            counter = 0;
            pipes = [];
            for (let i = 0; i < TOTAL; i++) {
                neat.get_genomes()[i].set_fitness(birds[i].score)
                birds[i] = new Bird();
            }
            if (neat.should_evolve()) {
                neat.next_iteration();
                console.log(neat);
                console.log(neat._global_best);
            }
        }

    }
    // 所有绘图的东西
    p5.background(40, 44, 52);

    for (let bird of birds) {
        bird.show();
    }

    for (let pipe of pipes) {
        pipe.show();
    }
}