import * as R from "ramda";

const parseInput = R.split("\n");

function tree({label, size = 0, pt}) {
    const children = (!size ? [] : undefined);
    const isDir = () => size === 0;
    const fold = R.curry(function reduce(reducerFn, init, node) {
        const acc = reducerFn(init, node);
        if (!node.isDir()) {
            return acc;
        }
        return node.children.reduce(fold(reducerFn), acc);
    });
    const myself = Object.freeze({
        parent: () => pt,
        children,
        size,
        calcSize: () => fold((a, n) => a + n.size, 0, myself),
        addChild: function (opts) {
            if (!isDir()) {
                throw "Cannot add an item to a file";
            }
            const node = tree({...opts, pt: myself});
            children.push(node);
            return node;
        },
        isDir,
        getLabel: () => label
    });

    return myself;
}



export default Object.freeze({
    parseInput,
    tree,
    exec: {
        a: 0,
        b: 0
    }
});
