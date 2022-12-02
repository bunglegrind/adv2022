import * as R from "ramda";



const process = R.pipe(
    function (x) {
        if (typeof x !== "string") {
            throw new Error("Invalid options");
        }
        return x;
    },
    R.match(/^(\d+)(a|b)$/i),
    R.tail,
    R.map(R.toLower),
    R.zipObj(["day", "phase"])
);


export default Object.freeze({process});
