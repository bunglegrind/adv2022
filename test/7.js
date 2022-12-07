import test from "tape";
import libs from "../libs/7.js";

const sample = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;


test("creates an empty tree", function (t) {
    const tree = libs.tree({label: "/"});
    t.deepEqual(Object.keys(tree), [
        "parent",
        "children",
        "calcSize",
        "addChild",
        "isDir",
        "getLabel"
    ]);
    t.equal(tree.getLabel(), "/");
    t.equal(tree.calcSize(), 0);
    t.ok(tree.isDir());
    
    t.end();
});

test("creates a tree and add a file", function (t) {
    const tree = libs.tree({label: "/"});
    tree.addChild({label: "a.txt", size: 30});
    t.equal(tree.children[0].getLabel(), "a.txt");
    t.notOk(tree.children[0].isDir());
    t.end();
});

test("cannot add an item to a file", function (t) {
    const tree = libs.tree({label: "/"});
    tree.addChild({label: "a.txt", size: 30});
    t.throws(
        () => tree.children[0].addChild({label: "a"}),
        /^Cannot add an item to a file$/
    );
    t.end();
});

test("get parent of a node", function (t) {
    const tree = libs.tree({label: "/"});
    const node = tree.addChild({label: "opt"});
    const file = node.addChild({label: "a.txt", size: 300});

    t.equal(node.parent(), tree);
    t.equal(file.parent(), node);
    t.end();
});

test("get size of a file", function (t) {
    const tree = libs.tree({label: "/"});
    const node = tree.addChild({label: "opt"});
    const file = node.addChild({label: "a.txt", size: 300});
    t.equal(file.calcSize(), 300);
    t.end();    
});

test("get size of a dir", function (t) {
    const tree = libs.tree({label: "/"});
    const node = tree.addChild({label: "opt"});
    node.addChild({label: "a.txt", size: 300});
    node.addChild({label: "a.txt", size: 300});
    node.addChild({label: "a.txt", size: 300});
    tree.addChild({label: "a.txt", size: 300});
    t.equal(node.calcSize(), 900);
    t.equal(tree.calcSize(), 1200);
    t.end();    
});

test("parse input sample", function (t) {
    t.end();
});

