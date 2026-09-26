[
    rule(selector([
        nestingSelector(),
        combinator(' '),
        classSelector('a'),
    ]), [
        declaration('color', 'red'),
    ]),
    rule(selector([
        classSelector('a'),
        combinator(' '),
        nestingSelector(),
    ]), [
        declaration('color', 'blue'),
    ]),
    rule(selector([
        classSelector('b'),
        pseudoClassSelector('not', selector([
            nestingSelector(),
        ])),
    ]), [
        declaration('color', 'green'),
    ]),
];
