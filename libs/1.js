import * as R from "ramda";

const parseInput = R.pipe(
    R.split("\n\n"),
    R.map(R.pipe(R.split("\n"), R.map(Number)))
);

export default Object.freeze({parseInput});
