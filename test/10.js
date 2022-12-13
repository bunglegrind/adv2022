import test from "tape";
import libs from "../libs/10.js";

const sample = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

test("check 20th cycle", function (t) {
    const sim = libs.sim(libs.parseInput(sample));
    t.equal(sim.value(20), 420);
    t.end();
});

test("check 60th cycle", function (t) {
    const sim = libs.sim(libs.parseInput(sample));
    t.equal(sim.value(60), 1140);
    t.end();
});

test("check 100th cycle", function (t) {
    const sim = libs.sim(libs.parseInput(sample));
    t.equal(sim.value(100), 1800);
    t.end();
});

test("check 140th cycle", function (t) {
    const sim = libs.sim(libs.parseInput(sample));
    t.equal(sim.value(140), 2940);
    t.end();
});

test("check 180th cycle", function (t) {
    const sim = libs.sim(libs.parseInput(sample));
    t.equal(sim.value(180), 2880);
    t.end();
});

test("check 220th cycle", function (t) {
    const sim = libs.sim(libs.parseInput(sample));
    t.equal(sim.value(220), 3960);
    t.end();
});

test("sample return expect outcome A", function (t) {
    t.equal(libs.exec.a(sample), 13140);
    t.end();
});

test("sprite starts at left", function (t) {
    const sim = libs.sim(libs.parseInput(sample));
    t.deepEqual(sim.sprite(1), [0, 1, 2]);
    t.deepEqual(sim.sprite(2), [0, 1, 2]);
    t.deepEqual(sim.sprite(3), [15, 16, 17]);
    t.end();
});

test("draw pixel", function (t) {
    const sim = libs.sim(libs.parseInput(sample));
    t.equal(sim.pixel(1), "#");
    t.equal(sim.pixel(2), "#");
    t.equal(sim.pixel(3), ".");
    t.equal(sim.pixel(5), "#");
    t.equal(sim.pixel(10), "#");
    t.equal(sim.pixel(21), "#");
    t.equal(sim.pixel(41), "#");
    t.equal(sim.pixel(44), ".");
    t.end();
});

test("sample return expect outcome B", function (t) {
    t.equal(libs.exec.b(sample), `##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....
`);
    t.end();
});
