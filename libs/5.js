import * as R from "ramda";

function stack() {
    const st = [];

    return Object.freeze({
        size: () => st.length,
        push: R.tap((x) => st.push(x)),
        pop: () => st.pop(),
        top: () => R.last(st)
    });
}

stack.of = function (array) {
    const st = stack();
    array.forEach(function (x) {
        st.push(x);
    });
    return st;
};

function parseAction(action) {
    const matched = /^move (\d+) from (\d+) to (\d+)$/.exec(action.trim());
    return (
        matched.length
        ? Object.freeze({
            repeat: Number(matched[1]),
            from: Number(matched[2]),
            to: Number(matched[3])
        })
        : Object.create(null)
    );
}

function crane(version = 9000) {
    const crates = [];
    const performOnCrates = (f) => () => R.reduce(
        (acc, st) => acc.concat([st[f]()]),
        [],
        crates
    );

    function performAction({from, to, repeat}) {
        from -= 1;
        to -= 1;
        repeat -= 1;
        
        function recursive_move(repeat, from, to) {
            to.push(from.pop());
            return (
                repeat
                ? recursive_move(repeat - 1, from, to)
                : ""
            );
        }

        function block_move(repeat, from, to) {
            const tmp = stack();
            recursive_move(repeat, from, tmp);
            recursive_move(repeat, tmp, to);
        }

        if (version === 9000) {
            recursive_move(repeat, crates[from], crates[to]);
        } else {
            block_move(repeat, crates[from], crates[to]);
        }
    };

    return Object.freeze({
        addCrate: (stack) => crates.push(stack),
        performAction,
        performActions: R.forEach(function (action) {
            performAction(action);
        }),
        top: performOnCrates("top"),
        sizes: performOnCrates("size"),
        size: () => crates.length
    });
}

const parseInput = (version) => R.pipe(
    R.split("\n\n"),
    function ([craneToParse, actionsToParse]) {
        const craneSize = 3;
        const craneSpace = 1;
        const actions = R.pipe(
            R.split("\n"),
            R.reject(R.isEmpty),
            R.map(parseAction)
        )(actionsToParse);
        
        const tmp = R.split("\n", craneToParse);
        const summary = R.last(tmp);
        const rows = R.reverse(R.init(tmp));
        const maxCrane = Number(summary.match(/\d+\s*$/)[0]);
        const indices = R.times(
            (n) => (craneSize + craneSpace) * n + craneSpace,
            maxCrane
        );
        const crates = [];
        const cr = crane(version);
        
        rows.forEach(function (row) {
            indices.forEach(function (i) {
                if (!crates[i]) {
                    crates[i] = stack();
                    cr.addCrate(crates[i]);
                }
                if (row[i].trim()) {
                    crates[i].push(row[i]);
                }
            });            
        });

        return Object.freeze({actions, crane: cr});
    }
);

export default Object.freeze({
    parseInput,
    parseAction,
    stack,
    crane,
    exec: {
        a: R.pipe(
            parseInput(9000),
            function ({crane, actions}) {
                crane.performActions(actions);
                return crane.top();
            },
            R.join("")
        ),
        b: R.pipe(
            parseInput(9001),
            function ({crane, actions}) {
                crane.performActions(actions);
                return crane.top();
            },
            R.join("")
        )
    }
});
