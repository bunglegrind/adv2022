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
        "getLabel",
        "getChild",
        "getDirSizes"
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

test("get a child from label", function (t) {
    const tree = libs.tree({label: "/"});
    const node = tree.addChild({label: "opt"});
    t.equal(tree.getChild("opt"), node);
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

test("get all dir sizes", function (t) {
    const tree = libs.tree({label: "/"});
    const node = tree.addChild({label: "opt"});
    node.addChild({label: "a.txt", size: 300});
    node.addChild({label: "b.txt", size: 300});
    node.addChild({label: "c.txt", size: 300});
    const anotherDir = node.addChild({label: "f"});
    anotherDir.addChild({label: "c.txt", size: 100});
    tree.addChild({label: "a.txt", size: 300});

    t.deepEqual(tree.getDirSizes(), [1300, 1000, 100]);
    t.end();
});

test("parse cmd", function (t) {
    let command;

    command = libs.parseCommand(" cd /\n"); 
    t.equal(command.type(), "cd");
    t.equal(command.getParameters(), "/");
    t.equal(command.getOutput(), "");

    command = libs.parseCommand(" cd a\n"); 
    t.equal(command.type(), "cd");
    t.equal(command.getParameters(), "a");
    t.equal(command.getOutput(), "");

    command = libs.parseCommand(
        " ls\ndir a\n14848514 b.txt\n8504156 c.dat\ndir d\n"
    ); 
    t.equal(command.type(), "ls");
    t.equal(command.getParameters(), "");
    t.deepEqual(command.getOutput(), [
        ["dir", "a"],
        ["14848514", "b.txt"],
        ["8504156", "c.dat"],
        ["dir", "d"]
    ]);
    t.end();
});

test("parse input sample", function (t) {
    const commands = libs.parseInput(sample);
    t.equal(commands.length, 10);
    t.equal(commands[0].type(), "cd");
    t.equal(commands[0].getParameters(), "/");
    t.equal(commands[0].getOutput(), "");
    t.equal(commands[4].type(), "cd");
    t.equal(commands[4].getParameters(), "e");
    t.equal(commands[4].getOutput(), "");
    t.equal(commands[7].type(), "cd");
    t.equal(commands[7].getParameters(), "..");
    t.equal(commands[7].getOutput(), "");
    t.equal(commands[9].type(), "ls");
    t.equal(commands[9].getParameters(), "");
    t.deepEqual(commands[9].getOutput(), [
        ["4060174", "j"],
        ["8033020", "d.log"],
        ["5626152", "d.ext"],
        ["7214296", "k"]
    ]);
    t.end();
});

test("build tree from single commands", function (t) {
    const tree = libs.tree({label: "/"});
    const node = tree.addChild({label: "a"});
    t.equal(libs.parseCommand("cd a\n").exec(tree), node);
    libs.parseCommand("ls \ndir a\n134 b\n").exec(node);
    const a = node.getChild("a");
    t.ok(a.isDir());
    const b = node.getChild("b");
    t.notOk(b.isDir());
    t.equal(b.calcSize(), 134);
    t.end();
});

test("sample return expect outcome A", function (t) {
    t.equal(libs.exec.a(sample), 95437);
    t.end();
});

test("sample return expect outcome B", function (t) {
    t.equal(libs.exec.b(sample), 24933642);
    t.end();
});
