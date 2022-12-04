import test from "tape";
import libs from "../libs/4.js";

const sample = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;


test("parse Input", function (t) {
    const parsed = libs.parseInput(sample);
    t.ok(Array.isArray(parsed));
    t.equal(parsed.length, 6);
    parsed.forEach(function (pair) {
        t.ok(Array.isArray(pair));
        t.equal(pair.length, 2);
        pair.forEach(function (single) {
            t.equal(typeof single.intersect, "function");
        });
    });
    t.equal(parsed[0][0].start(), 2);
    t.equal(parsed[0][0].stop(), 4);
    t.equal(parsed[0][1].start(), 6);
    t.equal(parsed[0][1].stop(), 8);
    t.end();
});

test("verify inteval length", function (t) {
    t.equal(libs.interval(1, 2).length(), 1);
    t.equal(libs.interval(1, 1).length(), 0);
    t.equal(libs.interval(10, 15).length(), 5);
    t.end();
});

test("verify if interval is within another", function (t) {
    t.ok(libs.interval(4, 6).contains(libs.interval(6, 6)));
    t.ok(libs.rangeContained(libs.interval(6, 6), libs.interval(4, 6)));
    t.notOk(libs.interval(2, 4).contains(libs.interval(6, 8)));
    t.notOk(libs.rangeContained(libs.interval(2, 4), libs.interval(6, 8)));
    t.end();
});


test("sample return expect outcome A", function (t) {
    t.equal(libs.exec.a(sample), 2);
    t.end();
});

test("verify if interval overlaps another", function (t) {
    t.ok(libs.interval(4, 6).overlaps(libs.interval(6, 6)));
    t.ok(libs.interval(4, 16).overlaps(libs.interval(6, 6)));
    t.ok(libs.interval(1, 6).overlaps(libs.interval(4, 16)));
    t.ok(libs.interval(2, 6).overlaps(libs.interval(4, 8)));
    t.notOk(libs.interval(2, 4).overlaps(libs.interval(6, 8)));
    t.notOk(libs.interval(6, 8).overlaps(libs.interval(2, 4)));
    t.notOk(libs.interval(2, 2).overlaps(libs.interval(3, 8)));
    t.end();
});

test("sample return expect outcome B", function (t) {
    t.equal(libs.exec.b(sample), 4);
    t.end();
});
