[
    charset('UTF-8'),
    cssImport('foo.css'),
        /* main button */rule(selector([
        classSelector('button'),
    ]), [
        declaration('color', color('#333')),
        declaration('width', dimension(10, 'px')),
        declaration('margin', valueList([
            dimension(10, 'px'),
            dimension(20, 'px'),
        ])),
        declaration('padding', percentage(100)),
    ]),
    rule(selectorList([
        selector([
            typeSelector('a'),
        ]),
        selector([
            typeSelector('b'),
        ]),
    ]), [
        declaration('color', 'red', {
            important: true,
        }),
    ]),
    media('(max-width:768px)', [
        rule(selector([
            classSelector('button'),
        ]), [
            declaration('display', 'flex'),
        ]),
    ]),
    keyframes('fade', [
        keyframeRule('from', [
            declaration('opacity', 0),
        ]),
        keyframeRule('to', [
            declaration('opacity', 1),
        ]),
    ]),
    fontFace([
        declaration('font-family', string('MyFont')),
        declaration('src', functionValue('url', [
            string('font.woff2'),
        ])),
    ]),
];
