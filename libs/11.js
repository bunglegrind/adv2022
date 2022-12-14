import * as R from "ramda";


const parseInput = 0;
const parseMonkey = R.pipe(R.split("\n"));

export default Object.freeze({
    parseInput,
    parseMonkey,
    exec: {
        a: () => {},
        b: () => {}
    }
});
