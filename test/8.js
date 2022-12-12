import test from "tape";
import libs from "../libs/8.js";

const sample = `30373
25512
65332
33549
35390`;


test("sample return expect outcome A", function (t) {
    t.equal(libs.exec.a(sample), 21);
    t.end();
});
