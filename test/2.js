import libs from "../libs/2.js";
import test from "tape";


const sample = `A Y
B X
C Z`;

test("import data", function (t) {
    t.deepEqual(libs.parseInput(sample), [["A", "Y"], ["B", "X"], ["C", "Z"]]);
    t.end();
});

test("A Y is equal 8", function (t) {
    t.equal(libs.score(["A", "Y"]), 8);
    t.end();
});

test("C Z is equal 8", function (t) {
    t.equal(libs.score(["C", "Z"]), 6);
    t.end();
});

test("sample is equal to outcome A", function (t) {
    t.equal(libs.totScore(libs.parseInput(sample)), 15);
    t.end();
});

test("A Y is equal 1", function (t) {
    t.equal(libs.score2(["A", "Y"]), 4);
    t.end();
});

test("sample is equal to outcome B", function (t) {
    t.equal(libs.totScore2(libs.parseInput(sample)), 12);
    t.end();
});
