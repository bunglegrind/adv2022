import test from "tape";
import libs from "../libs/11.js";

const sample = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;

test("parse a single monkey", function (t) {

    t.deepEqual(libs.parseMonkey(`Monkey 3:
  Starting items: 74, 15
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`), {
        id: 3,
        items: [74, 15],
        operation: {
            op: "+",
            o1: "old",
            o2: 3
        },
        divisible: 17,
        "true": 0,
        "false": 1
    });
    t.end();
});


test.skip("sample return expect outcome A", function (t) {
    t.end();
});

test.skip("sample return expect outcome B", function (t) {
    t.end();
});
