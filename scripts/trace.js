const trace = (p) => {
    let THE_SEED;
    let number_of_particles = 500;
    let number_of_particle_sets = 12;
    let particle_sets = [];

    let palette = [
        p.color(0, 0, 255, 10),
        p.color(0, 255, 0, 10),
        p.color(255, 0, 0, 10),
    ];

    p.setup = () => {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);

        canvas.parent('stage');
        canvas.position(0, 0);
        canvas.style('z-index', '-1');

        THE_SEED = p.floor(p.random(999));
        p.randomSeed(THE_SEED);

        p.background(0);


        for (let j = 0; j < number_of_particle_sets; j++) {
            let ps = [];
            let col = palette[p.floor(p.random(palette.length))];

            for (let i = 0; i < number_of_particles; i++) {
                ps.push(
                    new Particle(p.randomGaussian(p.width / 2, 150), p.randomGaussian(p.height / 2, 150), p.random(p.TAU), col)
                );
            }
            particle_sets.push(ps);
        }
    };

    p.draw = () => {
        particle_sets.forEach(function (particles, index) {
            particles.forEach(function (particle) {
                particle.update(index);
                particle.display(index);
            });
        });
    };

    class Particle {
        constructor(x, y, phi, col) {
            this.pos = p.createVector(x, y);
            this.altitude = 0;
            this.val = 0;
            this.angle = phi;
            this.col = col;
        }

        update(index) {
            this.pos.x += p.cos(this.angle);
            this.pos.y += p.sin(this.angle);

            let nx = 1.1 * p.map(this.pos.y, 0, p.height, 4, 0.2) * p.map(this.pos.x, 0, p.width, -1, 1);
            let ny = 3.1 * p.map(this.pos.y, 0, p.height, 4, 0.2) * p.map(this.pos.y, 0, p.height, -1, 1);

            this.altitude = p.noise(nx + 423.2, ny - 231.1);
            this.val = (this.altitude + 0.035 * (index - number_of_particle_sets / 2)) % 1;
            this.angle += 3 * p.map(this.val, 0, 1, -1, 1);
        }

        display() {
            if (this.val > 0.485 && this.val < 0.515) {
                p.stroke(this.col);
                p.push();
                p.translate(this.pos.x, this.pos.y + 50 - this.altitude * 100 * p.map(this.pos.y, 0, p.height, 0.2, 4));
                p.rotate(this.angle);
                p.point(0, 0);
                p.pop();
            }
        }
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
};

export default trace;