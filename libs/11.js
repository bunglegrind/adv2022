import * as R from "ramda";


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
                R.map(Number)
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

function monkey({id, items, operation, divisible, ...sendTo}) {
    let inspections = 0;
    const receive = (item) => items.push(item);

    function perform({op, o1, o2}, item) {
        o1 = o1 === "old" ? item : o1;
        o2 = o2 === "old" ? item : o2;
        return (
            op === "+"
            ? R.add(o1, o2)
            : R.multiply(o1, o2)
        );
    }

    function examine(item) {
        item = Math.floor(perform(operation, item)/3);
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
            inspections += 1;
            monkeys[to].receive(worry);
            round(monkeys);
        }
    }

    return Object.freeze({
        inspections: () => inspections,
        receive,
        round,
        items
    });
}

export default Object.freeze({
    parseInput,
    parseMonkey,
    monkey,
    exec: {
        a: function (data) {
            const monkeys = R.map(monkey, parseInput(data));
            let i = 1;
            while (i < 21) {
                monkeys.forEach((m) => m.round(monkeys));
                i += 1;
            }
            const inspections = R.sort(
                (a,b) => b - a, R.map((m) => m.inspections(), monkeys)
            );
            return inspections[0] * inspections[1];
        },
        b: () => {}
    }
});
