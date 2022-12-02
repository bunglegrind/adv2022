import * as R from "ramda";

const parseInput = R.pipe(
    R.split("\n\n"),
    R.map(R.pipe(R.split("\n"), R.map(Number)))
);

const calcCalories = R.sum;

const findLargestAmountOfCalories = R.reduce(
    (acc, x) => calcCalories(x) > acc ? calcCalories(x) : acc,
    0
);

export default Object.freeze({
    parseInput,
    calcCalories,
    findLargestAmountOfCalories
});
