import test from "tape";
import libs from "../libs/9.js";

const sample = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;


test("parse input", function (t) {
    t.deepEqual(libs.parseInput(sample), [
        [4, 0], [0, 4], [-3, 0], [0, -1], [4, 0], [0, -1], [-5, 0], [2, 0]
    ]);
    t.end();
});

test("move head", function (t) {
    libs.start();
    t.deepEqual(libs.position(), [0, 0]);
    t.end();

});
