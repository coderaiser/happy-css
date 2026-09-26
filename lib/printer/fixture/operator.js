[
    rule(selector([classSelector('x')]), [
        declaration('width', functionValue('calc', [
            percentage(100),
            operator('-'),
            dimension(10, 'px'),
        ])),
    ]),
];
