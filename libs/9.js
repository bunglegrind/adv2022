import * as R from "ramda";

const parseInput = R.pipe(
    R.split("\n"),
    R.reject(R.isEmpty),
    R.map(R.pipe(
        R.split(" "),
        function ([direction, step]) {
            step = Number(step);
            if (direction === "R") {
                return [step, 0];
            }
            if (direction === "U") {
                return [0, step];
            }
            if (direction === "D") {
                return [0, -step];
            }
            if (direction === "L") {
                return [-step, 0];
            }
        }
    ))
);

const start;

export default Object.freeze({
    parseInput,
    position,
    start,
    exec: {
        a: 0,
        b: 0
    }
});
