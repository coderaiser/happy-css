[
    rule(selector([
        classSelector('x'),
    ]), [
        declaration('color', functionValue('rgb', [
            0,
            0,
            0,
            operator('/'),
            percentage(50),
        ], ' ')),
    ]),
];
