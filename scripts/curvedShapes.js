const curvedShapes = (p) => {
    let size;

    const colors = [p.color(255, 135, 95), p.color(255, 135, 95), p.color(255, 225, 95), p.color(75, 215, 225)];

    p.setup = () => {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);

        canvas.parent('stage');
        canvas.position(0, 0);
        canvas.style('z-index', '-1');

        p.background(0);
        p.strokeWeight(3);
        p.blendMode(p.DARKEST);
        p.frameRate(0.5);
        p.smooth();
    };

    p.draw = () => {
        p.clear();
        display();
    };

    const display = () => {
        size = p.windowWidth < p.windowHeight ? p.windowWidth / 3 : p.windowHeight / 3;
        for (let i = 0; i < 1; i++) {
            for (let j = 0; j < 1; j++) {
                p.fill(colors[p.floor(p.random(colors.length))]);
                let pos = p.createVector(p.width * (i + 0.5), p.height * (j + 0.5));
                draw_shape(pos);
            }
        }
    };

    const draw_shape = (pos) => {
        let n = p.int(p.random(3, 6));
        let angle = p.PI * p.random(2);

        p.push();
        p.translate(pos.x, pos.y);
        p.scale((p.windowWidth + p.windowHeight) / 2000);
        p.rotate(angle);

        p.push();
        draw_arcs(generate_string(n), create_initial_array(n));
        p.pop();

        p.rotate(p.PI);
        draw_arcs(generate_string(n), create_initial_array(n));
        p.pop();
    };

    const create_initial_array = (n) => {
        p.translate(-size / 2, 0);

        let arr = [];

        for (let i = 0; i <= n; i++) {
            let leaf = {
                pos: i * (size / n)
            };
            arr.push(leaf);
        }
        return arr;
    };

    const generate_string = (n) => {
        let arr = [];
        for (let i = 1; i <= n; i++) {
            arr.push(i);
        }
        return p.shuffle(arr);
    };

    const draw_arcs = (rstring, poslist) => {
        let totalHeight = 0;
        for (let i = 0; i < rstring.length; i++) {
            let area = rstring[i];
            let start = get_top(poslist[area - 1]);
            let end = get_top(poslist[area]);

            let center = (start.pos + end.pos) / 2;
            let diameter = end.pos - start.pos;
            let radius = diameter / 2;

            for (let j = 0; j < poslist.length; j++) {
                let top = get_top(poslist[j]);
                if (top != start && top != end) {
                    p.line(top.pos, 0, top.pos, -radius);
                }
            }

            p.arc(center, 0, diameter, diameter, p.PI, p.TWO_PI);
            p.noStroke();
            p.rect(start.pos, -1, diameter, totalHeight + 2);
            p.stroke(35);
            p.translate(0, -radius);

            let new_point = {
                pos: center,
                parent: null
            };

            start.parent = new_point;
            end.parent = new_point;

            totalHeight += radius;
        }
    };

    const get_top = (point) => {
        if (point.parent != null) {
            return get_top(point.parent);
        }
        return point;
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
};

export default curvedShapes;