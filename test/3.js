import test from "tape";
import libs from "../libs/3.js";

const sample = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

test("parse input", function (t) {
    t.deepEqual(libs.parseInput(sample), [
        "vJrwpWtwJgWrhcsFMMfFFhFp",
        "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
        "PmmdzqPrVvPwwTWBwg",
        "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
        "ttgJtRGJQctTZtZT",
        "CrZsJsPPZsGzwwsLwLmpwMDw"
    ]);
    t.end();
});

test("split the rucksack in two containers", function (t) {
    t.deepEqual(libs.split("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL"), [
        "jqHRNqRjqzjGDLGL",
        "rsFMfFZSrLrFZsSL"
    ]);
    t.deepEqual(libs.split("vJrwpWtwJgWrhcsFMMfFFhFp"), [
        "vJrwpWtwJgWr",
        "hcsFMMfFFhFp"
    ]);
    t.end();
});


test("find common elements in the two containers", function (t) {
    t.deepEqual(libs.findCommon(
        ["jqHRNqRjqzjGDLGL", "rsFMfFZSrLrFZsSL"]),
        ["L"]
    );
    t.deepEqual(libs.findCommon(["vJrwpWtwJgWr", "hcsFMMfFFhFp"]), ["p"]);
    t.end();
});

test("calculate score", function (t) {
    t.equal(libs.priority("p"), 16);
    t.equal(libs.priority("L"), 38);
    t.equal(libs.priority("P"), 42);
    t.equal(libs.priority("v"), 22);
    t.equal(libs.priority("t"), 20);
    t.equal(libs.priority("s"), 19);
    t.end();
});

test("calculate sum of priorities from array of chars", function (t) {
    t.equal(libs.totPriority(["p", "L"]), 54);
    t.equal(libs.totPriority(["s", "t"]), 39);
    t.end();
});


test("sample return expect outcome A", function (t) {
    t.equal(libs.exec.a(sample), 157);
    t.end();
});


test("group elves", function (t) {
    t.deepEqual(libs.group(libs.parseInput(sample)), [
        [
            "vJrwpWtwJgWrhcsFMMfFFhFp",
            "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
            "PmmdzqPrVvPwwTWBwg"
        ], [
            "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
            "ttgJtRGJQctTZtZT",
            "CrZsJsPPZsGzwwsLwLmpwMDw"
    ]]);
    t.end();
});


test("find badge in a group", function (t) {
    t.equal(libs.findBadge([
        "vJrwpWtwJgWrhcsFMMfFFhFp",
        "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
        "PmmdzqPrVvPwwTWBwg"
    ]), "r");
    t.end();
});

test("sample return expect outcome B", function (t) {
    t.equal(libs.exec.b(sample), 70);
    t.end();
});
