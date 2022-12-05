import test from "tape";
import libs from "../libs/5.js";

const sample = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

 move 1 from 2 to 1
 move 3 from 1 to 3
 move 2 from 2 to 1
 move 1 from 1 to 2`;


test("create an empty stack", function (t) {
    const stack = libs.stack();
    t.equal(stack.size(), 0);
    t.end();
});


test("push and pop on a stack", function (t) {
    const stack = libs.stack();
    t.equal(stack.push("R"), "R");
    t.equal(stack.push("Q"), "Q");
    t.equal(stack.size(), 2);
    t.equal(stack.pop(), "Q");
    t.equal(stack.size(), 1);
    t.equal(stack.pop(), "R");
    t.equal(stack.size(), 0);
    t.end();
});

test("reading the top a stack", function (t) {
    const stack = libs.stack();
    stack.push("R");
    stack.push("Q");
    t.equal(stack.top(), "Q");
    t.equal(stack.top(), "Q");
    stack.pop();
    t.equal(stack.top(), "R");
    t.end();
});


test("create stack from array", function (t) {
    const stack = libs.stack.of(["A", "B", "C"]);
    t.equal(stack.size(), 3);
    t.equal(stack.top(), "C");
    t.end();
});

test("read an action", function (t) {
    t.deepEqual(
        libs.parseAction("move 1 from 2 to 1"), {from: 2, to: 1, repeat: 1}
    );
    t.deepEqual(
        libs.parseAction("move 4 from 12 to 134"), {from: 12, to: 134, repeat: 4}
    );
    t.end();
});

test("move crane according to actions", function (t) {
    const crane = libs.crane();
    crane.addCrate(libs.stack.of(["A", "B", "C"]));
    crane.addCrate(libs.stack.of(["D", "E"]));
    crane.addCrate(libs.stack.of(["F"]));
    crane.performAction({from: 1, to: 2, repeat: 1});
    t.deepEqual(crane.top(), ["B", "C", "F"]);
    t.deepEqual(crane.sizes(), [2, 3, 1]);
    crane.performAction({from: 2, to: 3, repeat: 2});
    t.deepEqual(crane.top(), ["B", "D", "E"]);
    t.deepEqual(crane.sizes(), [2, 1, 3]);
    t.end();
});

test("parse input correctly", function (t) {
    const {crane, actions} = libs.parseInput(9000)(sample);
    t.equal(crane.size(), 3);
    t.deepEqual(crane.top(), ["N", "D", "P"]);
    t.deepEqual(crane.sizes(), [2, 3, 1]);
    t.equal(actions.length, 4);
    t.deepEqual(actions[0], {from: 2, to: 1, repeat: 1});
    t.deepEqual(actions[1], {from: 1, to: 3, repeat: 3});
    t.deepEqual(actions[2], {from: 2, to: 1, repeat: 2});
    t.deepEqual(actions[3], {from: 1, to: 2, repeat: 1});
    t.end();
});

test("sample return expect outcome A", function (t) {
    t.equal(libs.exec.a(sample), "CMZ");
    t.end();
});


test("move crane 9001 according to actions", function (t) {
    const crane = libs.crane(9001);
    crane.addCrate(libs.stack.of(["A", "B", "C"]));
    crane.addCrate(libs.stack.of(["D", "E"]));
    crane.addCrate(libs.stack.of(["F"]));
    crane.performAction({from: 1, to: 2, repeat: 1});
    t.deepEqual(crane.top(), ["B", "C", "F"]);
    t.deepEqual(crane.sizes(), [2, 3, 1]);
    crane.performAction({from: 2, to: 3, repeat: 2});
    t.deepEqual(crane.top(), ["B", "D", "C"]);
    t.deepEqual(crane.sizes(), [2, 1, 3]);
    t.end();
});

test("sample return expect outcome B", function (t) {
        t.equal(libs.exec.b(sample), "MCD");
        t.end();
});
