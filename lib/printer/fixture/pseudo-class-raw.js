[
    rule(selector([
        typeSelector('li'),
        pseudoClassSelector('nth-child', '2n+1'),
    ]), []),
    rule(selector([
        typeSelector('li'),
        pseudoClassSelector('nth-of-type', 'odd'),
    ]), []),
    rule(selector([
        pseudoClassSelector('lang', 'en'),
    ]), []),
    rule(selector([
        pseudoClassSelector('not', ''),
    ]), []),
];
