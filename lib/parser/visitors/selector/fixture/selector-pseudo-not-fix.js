[
    rule(selector([
        classSelector('a'),
        pseudoClassSelector('not', selector([
            classSelector('b'),
        ])),
    ]), []),
];
