[
    rule(selector([
        classSelector('x'),
    ]), [
        declaration('content', valueList([
            functionValue('counter', ['x']),
            string('.'),
        ])),
    ]),
];
