[
    rule(selector([
        nestingSelector(),
        combinator(' '),
        classSelector('a'),
    ]), [
        declaration('color', 'red'),
    ]),
    rule(selector([
        pseudoClassSelector('not', selector([
            nestingSelector(),
        ])),
    ]), []),
];
