[
    rule(selector([classSelector('a')]), [
        declaration('color', 'red'),
        raw(`& .b{color:blue}`),
    ]),
];
