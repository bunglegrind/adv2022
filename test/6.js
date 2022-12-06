import test from "tape";
import libs from "../libs/6.js";

const samples = [
    "mjqjpqmgbljsphdztnvjfqwrcgsmlb",
    "bvwbjplbgvbhsrlpgdmjqwftvncz",
    "nppdvjthqldpwncqszvftbrmjlhg",
    "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
    "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"
];


test("a sequence is composed by distint symbols", function (t) {
    t.ok(libs.isMarker(["a", "b", "c", "d"]));
    t.notOk(libs.isMarker(["a", "c", "c", "d"]));
    t.end();
});


test("imput is parsed correctly", function (t) {
    t.deepEqual(libs.parseInput("asdasd"), ["a", "s", "d", "a", "s", "d"]);
    t.end();
});


test("find start marker", function (t) {
    t.equal(libs.finder(4)(["a", "a", "b", "c", "d", "e"]), 5);
    t.end();
});

test("sample return expect outcome A", function (t) {
    t.equal(libs.exec.a(samples[0]), 7);
    t.equal(libs.exec.a(samples[1]), 5);
    t.equal(libs.exec.a(samples[2]), 6);
    t.equal(libs.exec.a(samples[3]), 10);
    t.equal(libs.exec.a(samples[4]), 11);
    t.end();
});

test("sample return expect outcome B", function (t) {
    t.equal(libs.exec.b(samples[0]), 19);
    t.equal(libs.exec.b(samples[1]), 23);
    t.equal(libs.exec.b(samples[2]), 23);
    t.equal(libs.exec.b(samples[3]), 29);
    t.equal(libs.exec.b(samples[4]), 26);
    t.end();
});
