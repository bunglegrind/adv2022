import * as R from "ramda";

const parseInput = R.pipe(R.split("\n"), R.reject(R.isEmpty));

function split(rsack) {
    const l = rsack.length;
    return [
        rsack.slice(0, l/2),
        rsack.slice(l/2)
    ];
}

const findCommon = ([str1, str2]) => R.pipe(
    R.split(""),
    R.filter((c) => str2.includes(c)),
    R.uniq
)(str1);

const priority = R.ifElse(
    R.test(/^[a-z]$/),
    (c) => c.charCodeAt(0) - "a".charCodeAt(0) + 1,
    (c) => c.charCodeAt(0) - "A".charCodeAt(0) + 27
);

const totPriority = R.pipe(R.map(priority), R.sum);

const group = R.splitEvery(3);

function findBadge(group) {
    return R.head(R.reduce(
        (common, rsack) => R.intersection(common, rsack),
        R.head(group),
        R.tail(group)
    )); 
}

export default Object.freeze({
    parseInput,
    split,
    findCommon,
    totPriority,
    priority,
    group,
    findBadge,
    exec: {
        a: R.pipe(
            parseInput,
            R.map(R.pipe(split, findCommon, totPriority)),
            R.sum
        ),
        b: R.pipe(
            parseInput,
            group,
            R.map(R.pipe(findBadge, priority)),
            R.sum
        )
    }
});
