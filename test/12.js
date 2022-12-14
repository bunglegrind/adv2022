import test from "tape";
import libs from "../libs/12.js";

const sample = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

const moves = `v..v<<<<
>v.vv<<^
.>vv>E^^
..v>>>^^
..>>>>>^`;

test("create grid", function (t) {
    t.deepEqual(libs.parseInput(
`Sabqponm
abcryxxl
accszExk`
    ), {s: [0, 0], e: [2, 5], matrix: [
        [0, 0, 1, 16, 15, 14, 13, 12],
        [0, 1, 2, 17, 24, 23, 23, 11],
        [0, 2, 2, 18, 25, 25, 23, 10]
    ]}
    )
    t.end();
});

test("assess allowed directions", function (t) {
    const graph = libs.graph("Sac\nbE\nazx");
    t.deepEqual(graph.dirs([0, 0]), [[1, 0]]);
    t.end();
});


test("find straightforward path", function (t) {
    const graph = libs.graph("SE");
    t.deepEqual(graph.findPath(), [[0, 0], [1, 0]]);
    t.end();
});

test("find rectilinear path", function (t) {
    const graph = libs.graph("SbcdE");
    t.deepEqual(graph.findPath(), [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);
    t.end();
});


test.skip("sample return expect outcome A", function (t) {
    t.equal(libs.exec.a(sample), 31);
    t.end();
});

test.skip("sample return expect outcome B", function (t) {
    t.equal(libs.exec.b(sample), 2713310158);
    t.end();
});
