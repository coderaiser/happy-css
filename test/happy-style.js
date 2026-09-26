import {test} from 'supertape';
import {montag} from 'montag';
import {tryCatch} from 'try-catch';
import {types} from '@putout/babel';
import {
    convertCssToJs,
    convertJsToCss,
    parseCss,
    printCss,
} from '#happy-style';

test('happy-style: convertCssToJs', (t) => {
    const source = montag`
        .button {
            color: red;
        }
    `;
    
    const expected = montag`
        [
            rule(selector([
                classSelector('button'),
            ]), [
                declaration('color', 'red'),
            ]),
        ];
    `;
    
    const result = convertCssToJs(source);
    
    t.equal(result, `${expected}\n`);
    t.end();
});

test('happy-style: convertJsToCss', (t) => {
    const source = montag`
        [
            rule(
                selector([classSelector('button')]),
                [declaration('color', 'red')],
            ),
        ];
    `;
    
    const expected = montag`
        .button {
            color: red;
        }
    `;
    
    const result = convertJsToCss(source);
    
    t.equal(result, `${expected}\n`);
    t.end();
});

test('happy-style: roundtrip: rule', (t) => {
    const source = montag`
        .button {
            color: red;
        }
    `;
    
    const result = printCss(parseCss(source));
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-style: printCss: error on unknown block', (t) => {
    const ast = types.file(types.program([
        types.expressionStatement(types.arrayExpression([
            types.callExpression(types.identifier('unknownBlock'), []),
        ])),
    ]));
    
    const [error] = tryCatch(printCss, ast);
    
    t.match(error.message, 'not supported yet');
    t.end();
});

test('happy-style: parseCss: error on unknown node', (t) => {
    const [error] = tryCatch(parseCss, '@unknown foo;');
    
    t.match(error.message, 'not supported yet');
    t.end();
});

test('happy-style: roundtrip: nesting selector', (t) => {
    const source = '& .a {\n    color: red;\n}\n';
    const result = convertJsToCss(convertCssToJs(source));
    
    t.equal(result, source);
    t.end();
});

test('happy-style: parseCss: error on unknown at-rule', (t) => {
    const [error] = tryCatch(parseCss, '@unknown foo;');
    
    t.match(error.message, '@unknown not supported yet');
    t.end();
});

test('happy-style: parseCss: error on unknown node type', (t) => {
    const [error] = tryCatch(parseCss, '<!--');
    
    t.match(error.message, 'CDO not supported yet');
    t.end();
});

test('happy-style: roundtrip: string with backslash', (t) => {
    const source = '.x {\n    content: "C:\\\\path";\n}\n';
    const result = convertJsToCss(convertCssToJs(source));
    
    t.equal(result, source);
    t.end();
});

test('happy-style: roundtrip: url is quoted', (t) => {
    const source = '.x {\n    src: url("a.woff2");\n}\n';
    const result = convertJsToCss(convertCssToJs(source));
    
    t.equal(result, source);
    t.end();
});

test('happy-style: roundtrip: space separated function', (t) => {
    const source = '.x {\n    color: rgb(0 0 0 / 50%);\n}\n';
    const result = convertJsToCss(convertCssToJs(source));
    
    t.equal(result, source);
    t.end();
});
