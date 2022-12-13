import * as R from "ramda";

const parseInput = R.pipe(
    R.split("\n"),
    R.reject(R.isEmpty),
    R.map(R.split(" "))
);

function sim(instructions) {
    function value(cycle) {
        function calc(instructions, cycles = 0, x = 1) {
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
                return calc(R.tail(instructions), cycles + 1, x);
            }
            return calc(
                R.tail(instructions),
                cycles + 2,
                x + Number(instruction[1])
            );
        }
        return  cycle * calc(instructions);
    }
    return Object.freeze({value});
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
        b: () => {}
    }
});
