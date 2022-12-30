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

export default Object.freeze(tree);
