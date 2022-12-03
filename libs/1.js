import * as R from "ramda";

const parseInput = R.pipe(
    R.split("\n\n"),
    R.map(R.pipe(R.split("\n"), R.map(Number)))
);

const calcCalories = R.sum;

const findNLargestSum = (n) => (data) => R.pipe(
    R.map(calcCalories),
    R.sort((a, b) => b - a),
    R.slice(0, n),
    R.sum
)(data);

const findLargestAmountOfCalories = findNLargestSum(1);

const findSumThreeLargestAmountOfCalories = findNLargestSum(3);

export default Object.freeze({
    parseInput,
    calcCalories,
    findLargestAmountOfCalories,
    findSumThreeLargestAmountOfCalories,
    exec: {
        a: R.pipe(
            parseInput,
            findLargestAmountOfCalories
        ),
        b: R.pipe(
            parseInput,
            findSumThreeLargestAmountOfCalories
        )
    }
});
