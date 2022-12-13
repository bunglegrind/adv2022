import * as R from "ramda";

const parseInput = R.pipe(
    R.split("\n"),
    R.reject(R.isEmpty),
    R.chain(R.pipe(
        R.split(" "),
        function ([direction, step]) {
            step = Number(step);
            if (direction === "R") {
                return R.repeat([1, 0], step);
            }
            if (direction === "U") {
                return R.repeat([0, 1], step);
            }
            if (direction === "D") {
                return R.repeat([0, -1], step);
            }
            if (direction === "L") {
                return R.repeat([-1, 0], step);
            }
        }
    ))
);

function rope() {
    const sum = R.zipWith(R.add);
    const diff = R.zipWith(R.subtract);
    const squareNorm = R.pipe(R.map((x) => x ** 2), R.sum);
    const tailHistory = Object.create(null);
    const history = () => Object.keys(tailHistory).length;

    let h = [0, 0];
    let t = [0, 0];
    tailHistory[JSON.stringify(t)] = true;
    const head = () => h;
    const tail= () => t;
    function move(step) {
        h = sum(h, step);
        updateTail();
    }

    function updateHead(head) {
        h = head;
        updateTail();
    }

    const needsToBeUpdated = () => squareNorm(diff(t, h)) > 2;

    function updateTail() {
        if (needsToBeUpdated()) {
            t = sum(t, R.map(Math.sign, diff(h, t)));
            tailHistory[JSON.stringify(t)] = true;
        }
    }

    

    return Object.freeze({
        head,
        tail,
        move,
        updateHead,
        history
    });
}

function ropes(knots) {
    const array = R.times(rope, knots - 1);
    const last = () => R.last(array);
    function move(step) {
        R.head(array).move(step);
        R.reduce(function (newHead, rope) {
            rope.updateHead(newHead);
            return rope.tail();
        }, R.head(array).tail(), R.tail(array));
    }

    return Object.freeze({
        last,
        move
    });
}

export default Object.freeze({
    parseInput,
    rope,
    exec: {
        a: function (data) {
            const r = rope();
            R.pipe(
                parseInput,
                R.forEach((x) => r.move(x))
            )(data);
            return r.history();
        },
        b: function (data) {
            const r = ropes(10);
            R.pipe(
                parseInput,
                R.forEach((x) => r.move(x))
            )(data);
            return r.last().history();
        }
    }
});
