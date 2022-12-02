import fs from "node:fs";
import * as R from "ramda";
import libs from "./libs/1.js";


fs.readFile("./assets/1.txt", "utf8", function (err, data) {
    if (err) {
        return console.log(err);
    }
    console.log(R.pipe(
        libs.parseInput,
        libs.findLargestAmountOfCalories
    )(data));

});
