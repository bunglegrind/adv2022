import * as R from "ramda";

const parseInput = R.pipe(
    R.split("\n"),
    R.reject(R.isEmpty),
    R.map(R.split(" "))
);

function sim(instructions) {
    function calc(cycle, instructions, cycles = 0, x = 1) {
        const instruction = R.head(instructions);
        if (
            cycles === cycle
            || (
                R.head(instruction) === "addx"
                && (cycle === cycles + 1 || cycle === cycles + 2)
            )
        ) {
            return x;
        }
        if (R.head(instruction) === "noop") {
            return calc(cycle, R.tail(instructions), cycles + 1, x);
        }
        return calc(
            cycle,
            R.tail(instructions),
            cycles + 2,
            x + Number(instruction[1])
        );
    }
    function value(cycle) {
        return  cycle * calc(cycle, instructions);
    }
    function sprite(cycle) {
        const middle = calc(cycle, instructions);
        return [middle - 1, middle, middle + 1];

    }
    function pixel(cycle) {
        return sprite(cycle).includes((cycle - 1) % 40) ? "#" : ".";
    }
    return Object.freeze({value, sprite, pixel});
}



export default Object.freeze({
    parseInput,
    sim,
    exec: {
        a: function (data) {
            const s = sim(parseInput(data));
            return (
                s.value(20)
                + s.value(60)
                + s.value(100)
                + s.value(140)
                + s.value(180)
                + s.value(220)
            );
        },
        b: function (data) {
            const s = sim(parseInput(data));
            return R.reduce(function (acc, c) {
                return (
                    acc 
                    + s.pixel(c)
                    + (
                        c % 40 === 0
                        ? "\n"
                        : ""
                    ) 
                );

            }, "", R.map(R.inc, R.times(R.identity, 240))); 
        }
    }
});
