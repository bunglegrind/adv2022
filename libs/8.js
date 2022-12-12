import * as R from "ramda";

function grid(text) {
    const parse = R.pipe(
        R.split("\n"),
        R.map(R.pipe(
        R.split(""),
        R.map(Number)
        ))
    );
    const matrix = parse(text);
    const rows = matrix.length;
    const columns = R.head(matrix).length;

    function isOnBorder(i, j) {
        return (
            i === 0
            || j === 0
            || i === rows - 1
            || j === columns - 1
        );
    }

    function row(i) {
        return matrix [i];
    }

    function column (j) {
        return R.pluck(j, matrix);
    }

    function isVisible(i, j) {
        if (isOnBorder(i, j)) {
            return true;
        }
        const higher = R.all(R.gt(matrix[i][j]));

        return (
            higher(left(i, j))
            || higher(right(i, j)) 
            || higher(up(i, j))
            || higher(down(i, j)) 
        );
    }

    function visibles() {
        return matrix.reduce(
            (acc, row, i) => acc + row.reduce((acc2, item, j) => acc2 + (
                isVisible(i, j)
                ? 1
                : 0
            ), 0),
            0
        );
    }
    
    function maxScore() {
        return matrix.reduce(
            (acc, row, i) => R.max(acc, row.reduce(
                (acc, item, j) => R.max(acc, score(i, j)),
                0
            )),
            0
        );
    }

    function up(i, j) {
        return R.reverse(column(j).slice(0, i));
    }

    function down(i, j) {
        return column(j).slice(i + 1);
    }

    function left(i, j) {
        return R.reverse(row(i).slice(0, j));
    }

    function right(i, j) {
        return row(i).slice(j + 1);
    }

    function score(i, j) {
        if (isOnBorder(i, j)) {
            return 0;
        }
        const smaller = R.lte(matrix[i][j]);
        const singleScore = R.pipe(R.findIndex(smaller), R.inc);
        
        const rightScore = singleScore(right(i, j)) || right(i, j).length;
        const downScore = singleScore(down(i,j)) || down(i, j).length;
        const leftScore = singleScore(left(i, j)) || left(i, j).length;
        const upScore = singleScore(up(i, j)) || up(i, j).length;

        return rightScore * downScore * leftScore * upScore;
    }
    return Object.freeze({
        visibles,
        maxScore
    });
  
}

export default Object.freeze({
    exec: {
        a: (sample) => grid(sample).visibles(),
        b: (sample) => grid(sample).maxScore()
    }
});
