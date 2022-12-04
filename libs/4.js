import * as R from "ramda";

const parseInput = R.pipe(
    R.split("\n"),
    R.reject(R.isEmpty),
    R.map(R.pipe(
        R.split(","),
        R.map(function (data) {
            const matched = /^(\d+)-(\d+)$/.exec(data);
            return interval(Number(matched[1]), Number(matched[2]));
        })
    ))
);


function interval(start, stop) {
    return Object.freeze({
        intersect: () => {},
        start: () => start,
        stop: () => stop,
        length: () => stop - start,
        contains: (inter) => start <= inter.start() && stop >= inter.stop(),
        overlaps: (inter) => start <= inter.stop() && stop >= inter.start()
    });
}

const rangeContained = (i1, i2) => i1.contains(i2) || i2.contains(i1);

export default Object.freeze({
    parseInput,
    interval,
    rangeContained,
    exec: {
        a: R.pipe(
            parseInput,
            R.map(R.apply(rangeContained)),
            R.sum
        ),
        b: R.pipe(
            parseInput,
            R.map(([i1, i2]) => i1.overlaps(i2)),
            R.sum
        )
    }
});
