import * as R from "ramda";

const parseInt = R.pipe(R.split("\n"));

export default Object.freeze({
    parseInt,
    exec: {
        a: 0,
        b: 0
    }
});
