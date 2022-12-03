import test from "tape";
import utils from "../libs/utils.js";


test("process a regular day + phase (A,B)", function (t) {
    t.deepEqual(utils.process("1A"), {day: "1", phase: "a"});
    t.deepEqual(utils.process("1a"), {day: "1", phase: "a"});
    t.deepEqual(utils.process("13a"), {day: "13", phase: "a"});
    t.deepEqual(utils.process("25b"), {day: "25", phase: "b"});
    t.end();
});


test("invalid options throw exceptions", function (t) {
    t.throws(() => utils.process(""), /Invalid options/);
    t.throws(() => utils.process("0a"), /Invalid options/);
    t.throws(() => utils.process("1c"), /Invalid options/);
    t.throws(() => utils.process("easter"), /Invalid options/);
    t.throws(() => utils.process("26a"), /Invalid options/);
    t.end();
});
