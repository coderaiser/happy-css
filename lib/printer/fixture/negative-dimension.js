[
    rule(selector([
        classSelector('a'),
    ]), [
        declaration('margin', dimension(-1, 'px')),
        declaration('top', percentage(-50)),
        declaration('padding', valueList([
            dimension(-10, 'px'),
            dimension(2, 'px'),
        ])),
        declaration('width', functionValue('calc', [
            dimension(-1, 'px'),
        ])),
        declaration('z-index', -1),
    ]),
];
