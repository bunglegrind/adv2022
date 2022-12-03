import * as R from "ramda";

const parseInput = R.pipe(
    R.split("\n"),
    R.reject(R.isEmpty),
    R.map((x) => [x[0], x[2]])
);

const shapeScore = {
    X: 1,
    Y: 2,
    Z: 3
};

const resultScore = {
    X: 0,
    Y: 3,
    Z: 6
};

const roundScore = {
    A: {X: 3, Y: 6, Z: 0},
    B: {X: 0, Y: 3, Z: 6},
    C: {X: 6, Y: 0, Z: 3}
};

const score = (x) => shapeScore[x[1]] + roundScore[x[0]][x[1]];

function score2(x) {
    const resScore = resultScore[x[1]];
    const invertedScore = R.invertObj(roundScore[x[0]]);
    return (
        resScore
        + shapeScore[invertedScore[resScore]]
    );
}

const totScore = R.pipe(
    R.map(score),
    R.sum
);

const totScore2 = R.pipe(
    R.map(score2),
    R.sum
);

export default Object.freeze({
    parseInput,
    score,
    score2,
    totScore,
    totScore2,
    exec: {
        a: R.pipe(parseInput, totScore),
        b: R.pipe(parseInput, totScore2),
    }

});
