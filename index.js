import fs from "node:fs";
import * as R from "ramda";
import utils from "./libs/utils.js";

const {day, phase} = utils.process(process.argv[2] || "");


fs.readFile(`./assets/${day}.txt`, "utf8", function (err, data) {
    if (err) {
        return console.log(err);
    }
    import(`./libs/${day}.js`).then(function (mod) {
        const libs = mod.default;
        console.log(libs.exec[phase](data));
    });
});
