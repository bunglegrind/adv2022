import * as R from "ramda";

const parseInput = R.split("\n");

function tree({label, size = 0, pt}) {
    const children = (!size ? [] : undefined);
    const isDir = () => size === 0;
    const myself = Object.freeze({
        parent: () => pt,
        children,
        calcSize: () => (
            isDir()
            ? children.reduce((a, n) => a + n.calcSize(), 0)
            : size
        ),
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
