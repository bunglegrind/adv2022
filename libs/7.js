import * as R from "ramda";

function command(cmd, tokens) {
    let parameters = "";
    let output = "";
    let exec;
    if (cmd === "cd") {
        parameters = R.head(tokens),
        exec = function (tree) {
            if (parameters === "..") {
                return tree.parent();
            }
            return tree.getChild(parameters);
        };
    }
    if (cmd === "ls") {
        output = R.splitEvery(2, tokens);
        exec = function (tree) {
            output.forEach(function ([size, name]) {
                if (size === "dir") {
                    return tree.addChild({label: name});    
                }
                return tree.addChild({size: Number(size), label: name});
            });
            return tree;
        };
    }
    return {
        type: () => cmd,
        getParameters: () => parameters,
        getOutput: () => output,
        exec
    };
}

function parseCommand(string) {
    const tokens = R.pipe(
        R.split("\n"),
        R.chain(R.split(" ")),
        R.map(R.trim),
        R.reject(R.isEmpty)
    )(string);

    return command(tokens[0], R.tail(tokens));

}

const parseInput = R.pipe(
    R.split("$ "),
    R.tail,
    R.map(parseCommand)     
);


function tree({label, size = 0, pt}) {
    const children = (!size ? [] : undefined);
    const isDir = () => size === 0;
    const calcSize = () => (
        isDir()
        ? children.reduce((a, n) => a + n.calcSize(), 0)
        : size
    );
    const myself = Object.freeze({
        parent: () => pt,
        children,
        calcSize,
        addChild: function (opts) {
            if (!isDir()) {
                throw "Cannot add an item to a file";
            }
            const node = tree({...opts, pt: myself});
            children.push(node);
            return node;
        },
        isDir,
        getLabel: () => label,
        getChild: (lbl) => children.find((n) => n.getLabel() === lbl),
        getDirSizes: function () {
            if (isDir()) {
                const nodes = R.pipe(
                    R.filter((x) => x.isDir()),
                    R.chain((n) => n.getDirSizes())
                )(children);
                return [calcSize(), ...R.reject(R.isEmpty)(nodes)];
            }
        }
    });

    return myself;
}



export default Object.freeze({
    parseInput,
    tree,
    parseCommand,
    exec: {
        a: function (sample) {
            const commands = R.tail(parseInput(sample));
            const mytree = tree({label: "/"});
            function executeCommands(node, commands) {
                if (commands.length === 0) {
                    return node;
                }
                return executeCommands(
                    R.head(commands).exec(node),
                    R.tail(commands)
                );
            }
            executeCommands(mytree, commands);
            return R.pipe(
                R.filter((x) => x <= 100000),
                R.sum
            )(mytree.getDirSizes());
        },
        b: function (sample) {
            const commands = R.tail(parseInput(sample));
            const mytree = tree({label: "/"});
            function executeCommands(node, commands) {
                if (commands.length === 0) {
                    return node;
                }
                return executeCommands(
                    R.head(commands).exec(node),
                    R.tail(commands)
                );
            }
            executeCommands(mytree, commands);
            const sizes = mytree.getDirSizes();
            return R.pipe(
                R.filter((x) => x >=  30000000 - (70000000 - mytree.calcSize())),
                R.reduce((a, x) => (a > x ? x : a), 790000000)
            )(sizes);
        }
    }
});
