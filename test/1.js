import test from "tape";
import libs from "../libs/1.js";

const sample = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

test("convert input to array", function (t) {
    t.plan(1);
    t.deepEqual(libs.parseInput(sample), [
        [1000, 2000, 3000],
        [4000],
        [5000, 6000],
        [7000, 8000, 9000],
        [10000]
    ]);
});

test("calculate calories from empty elf", function (t) {
    t.plan(1);
    t.equal(libs.calcCalories([]), 0);
});

test("calculate calories from an elf bringing only a food item", function (t) {
    t.plan(1);
    t.equal(libs.calcCalories([23]), 23);
});

test("calculate calories from an elf bringing many food items", function (t) {
    t.plan(1);
    t.equal(libs.calcCalories([23, 15, 7]), 23 + 15 + 7);
});

test("expecting sample returns correct value", function (t) {
    t.plan(1);
    t.equal(libs.findLargestAmountOfCalories(libs.parseInput(sample)), 24000);
});

test("expecting sample returns correct value (b)", function (t) {
    t.plan(1);
    t.equal(libs.findSumThreeLargestAmountOfCalories(libs.parseInput(sample)), 45000);
});
