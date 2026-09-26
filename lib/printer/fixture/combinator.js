[
    rule(selector([classSelector('a'), combinator('>'), classSelector('b')]), []),
    rule(selector([
        classSelector('a'),
        combinator(' '),
        classSelector('b'),
        combinator(' '),
        classSelector('c'),
    ]), []),
];
