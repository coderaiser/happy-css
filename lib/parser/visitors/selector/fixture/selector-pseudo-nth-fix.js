[
    rule(selector([
        typeSelector('li'),
        pseudoClassSelector('nth-child', '2n+1'),
    ]), [
        declaration('color', 'red'),
    ]),
    rule(selector([
        typeSelector('li'),
        pseudoClassSelector('nth-of-type', 'odd'),
    ]), [
        declaration('color', 'blue'),
    ]),
    rule(selector([
        typeSelector('li'),
        pseudoClassSelector('nth-last-child', '2n'),
    ]), [
        declaration('color', 'green'),
    ]),
    rule(selector([
        pseudoClassSelector('lang', 'en'),
    ]), [
        declaration('color', 'black'),
    ]),
    rule(selector([
        pseudoClassSelector('dir', 'ltr'),
    ]), [
        declaration('color', 'white'),
    ]),
    rule(selector([
        typeSelector('a'),
        pseudoClassSelector('not', ''),
    ]), [
        declaration('color', 'gray'),
    ]),
];
