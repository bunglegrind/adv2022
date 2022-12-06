import * as R from "ramda";

const isMarker = (symbols) => R.uniq(symbols).length === symbols.length;

const markerLength = 4;



function finder(markerLength) {
    return function findMarker(stream, pos = markerLength) {
        return (
            isMarker(stream.slice(0, markerLength))
            ? pos
            : findMarker(stream.slice(1), pos + 1)
        );
    };
}

const parseInput = R.split("");

export default Object.freeze({
    parseInput,
    isMarker,
    finder,
    exec: {
        a: R.pipe(parseInput, finder(4)),
        b: R.pipe(parseInput, finder(14)),
    }
});
