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

const anotherSample = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;


test("parse input", function (t) {
    t.deepEqual(libs.parseInput("R 2\nU 1\nL 3\nD 1"), [
        [1, 0], [1, 0], [0, 1], [-1, 0], [-1, 0], [-1, 0], [0, -1]
    ]);
    t.end();
});

test("move", function (t) {
    const rope = libs.rope();
    t.deepEqual(rope.head(), [0, 0]);
    t.deepEqual(rope.tail(), [0, 0]);

    rope.move([1, 0]);
    t.deepEqual(rope.head(), [1, 0]);
    t.deepEqual(rope.tail(), [0, 0]);

    rope.move([1, 0]);
    t.deepEqual(rope.head(), [2, 0]);
    t.deepEqual(rope.tail(), [1, 0]);

    rope.move([0, 1]);
    t.deepEqual(rope.head(), [2, 1]);
    t.deepEqual(rope.tail(), [1, 0]);

    rope.move([0, 1]);
    t.deepEqual(rope.head(), [2, 2]);
    t.deepEqual(rope.tail(), [2, 1]);

    rope.move([-1, 0]);
    t.deepEqual(rope.head(), [1, 2]);
    t.deepEqual(rope.tail(), [2, 1]);


    t.end();

});

test("history", function (t) {
    const rope = libs.rope();
    rope.move([1, 0]);
    rope.move([1, 0]);
    rope.move([0, 1]);
    rope.move([0, 1]);
    rope.move([-1, 0]);
    
    t.equal(rope.history(), 3);

    t.end();
});
test("sample return expect outcome A", function (t) {
    t.equal(libs.exec.a(sample), 13);
    t.end();
});

test("sample return expect outcome B", function (t) {
    t.equal(libs.exec.b(anotherSample), 36);
    t.end();
});
