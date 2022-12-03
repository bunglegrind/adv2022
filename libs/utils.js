import * as R from "ramda";



const process =R.pipe(
    R.match(/^(\d{1,2})(a|b)$/i),
    R.tail,
    R.when(
        (x) => (
            x.length !== 2
            || (Number(x[0]) > 25 || Number(x[0]) === 0)
        ),
        function () {
            throw new Error("Invalid options");
        }
    ),
    R.map(R.toLower),
    R.zipObj(["day", "phase"])
);


export default Object.freeze({process});
