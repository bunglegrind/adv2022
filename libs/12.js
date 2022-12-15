import * as R from "ramda";

function find(l, m) {
    let res;
    m.some(function (row, i) {
        return row.some(function (letter, j) {
            if (letter === l) {
                res = [i, j];
                return true;
            }
            return false;
        });
    });
    return res;
}

const parseInput = function (data) {
    const mat = R.pipe(
        R.split("\n"),
        R.reject(R.isEmpty),
        R.map(R.split(""))
    )(data);
    const s = find("S", mat);
    const e = find("E", mat);
    mat[s[0]][s[1]] = "a";
    mat[e[0]][e[1]] = "z";


    return {
        s,
        e,
        matrix: R.map(R.pipe(
            R.map((x) => x.charCodeAt(0) - "a".charCodeAt(0))
        ), mat)
    };
}

export default Object.freeze({
    parseInput,
    exec: {
        a: () => {},
        b: () => {}
    }
});
