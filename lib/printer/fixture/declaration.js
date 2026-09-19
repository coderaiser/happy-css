[
    rule(
        selector([
            typeSelector('h1'),
        ]),
        [
            declaration('color', 'red', {important: true}),
            declaration('width', dimension(10, 'px')),
            declaration('margin', valueList([dimension(10, 'px'), dimension(20, 'px')])),
            declaration('opacity', 0),
        ],
    ),
];