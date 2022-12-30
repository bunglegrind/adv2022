import * as R from "ramda";
import tree from "./tree.js";

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

function graph(data) {
    const {s, e, matrix} = parseInput(data);
    const rows = matrix.length;
    const columns = R.head(matrix).length;
    function get([x, y]) {
        if(matrix[x] === undefined) {
            return undefined;
        }
        return matrix[x][y];
    }

    function isInMatrix([x, y]) {
        return (
            (x >= 0 && x < rows)
            && (y >= 0 && y < columns)
        );
    }
    
    function getSurroundings([x, y]) {
        const set = [
            [x - 1, y],
            [x + 1, y],
            [x, y - 1],
            [x, y  + 1]
        ];
        return R.filter(isInMatrix, set);
    }

    const walkable = (a) => (b) => ((a + 1) === b) || (a > b);
    function dirs(position) {
        const isWalkable = walkable(get(position));
        return R.filter(R.pipe(
            get,
            isWalkable
        ))(getSurroundings(position));
    }

    function findPath(node = s) {
        const paths = tree(node, 1);//size = 1 not a leaf
        R.forEach((d) => paths.addChild(d), dirs(node));
       return [[0, 0], [1, 0]]; 
    }

    return Object.freeze({
        get,
        dirs,
        findPath
    });
}

export default Object.freeze({
    parseInput,
    graph,
    exec: {
        a: () => {},
        b: () => {}
    }
});
