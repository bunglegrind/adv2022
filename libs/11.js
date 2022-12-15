import * as R from "ramda";

let d = 2 * 5 * 7 * 11 * 13;

const parseMonkey = R.pipe(
    R.split("\n"),
    function ([withId, starting, operation, divisible, ifTrue, ifFalse]) {
        const extractInt = R.curry(
            (r, s) => R.pipe(R.match(r), R.last, Number)(s)
        );

        return {
            id: extractInt(/Monkey (\d+):/, withId),
            items: R.pipe(
                R.match(/Starting items: (.*)/),
                R.last,
                R.split(", "),
                R.map(Number),
            )(starting),
            operation: R.pipe(
                R.match(/Operation: new = (old|\d+) (\+|\*) (old|\d+)/),
                R.tail,
                function ([o1, op, o2]) {
                    return {
                        op,
                        o1: o1 === "old" ? o1 : Number(o1),
                        o2: o2 === "old" ? o2 : Number(o2),
                    }
                }
            )(operation),
            divisible: extractInt(/divisible by (\d+)/, divisible),
            "true": extractInt(/throw to monkey (\d+)/, ifTrue),
            "false": extractInt(/throw to monkey (\d+)/, ifFalse)
        };
    }
);
const parseInput = R.pipe(R.split("\n\n"), R.map(parseMonkey));

const monkey = R.curry(
    function (deworry, {id, items, operation, divisible, ...sendTo}) {
        let inspections = 0;
        const receive = (item) => items.push(item);

        function perform({op, o1, o2}, item) {
            o1 = item;
            o2 = o2 === "old" ? item : (o2 % d);
            return (
                op === "+"
                ? (R.add(o1, o2) % d)
                : (R.multiply(o1, o2) % d)
            );
        }

        function examine(item) {
            item = deworry(perform(operation, item));
            const tor = {worry: item};
            if (item % divisible === 0) {
                return {...tor, to: sendTo["true"]};
            }
            return {...tor, to: sendTo["false"]};
        }

        function round(monkeys) {
            if (items.length) {
                const item = items.shift();
                const {to, worry} = examine(item);
                if (worry > Number.MAX_SAFE_INTEGER) {
                    throw new Error("max integer: " + worry);
                }
                inspections += 1;
                monkeys[to].receive(worry);
                round(monkeys);
            }
        }

        return Object.freeze({
            inspections: () => inspections,
            divisible,
            receive,
            round,
            items
        });
    }
);

const perform = R.curry(function (rounds, deworry, data) {
    const monkeys = R.map(monkey(deworry), parseInput(data));
    d = R.product(R.pluck("divisible", monkeys));
    let i = 1;
    while (i <= rounds) {
        monkeys.forEach((m) => m.round(monkeys));
        i += 1;
    }
    const inspections = R.sort(
        (a,b) => b - a, R.map((m) => m.inspections(), monkeys)
    );
    return inspections[0] * inspections[1];
});
const defaultDeworry = (x) => Math.floor(x/3);
export default Object.freeze({
    parseInput,
    parseMonkey,
    defaultDeworry, 
    monkey,
    exec: {
        a: perform(20, defaultDeworry),
        b: perform(10000, R.identity)
    }
});
