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
