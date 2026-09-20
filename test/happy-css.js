import {test} from 'supertape';
import {montag} from 'montag';
import {tryCatch} from 'try-catch';
import {types} from '@putout/babel';
import {
    convertCssToJs,
    convertJsToCss,
    parseCss,
    printCss,
} from '#happy-css';

test('happy-css: convertCssToJs', (t) => {
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

test('happy-css: convertJsToCss', (t) => {
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

test('happy-css: roundtrip: rule', (t) => {
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

test('happy-css: printCss: error on unknown block', (t) => {
    const ast = types.file(types.program([
        types.expressionStatement(types.arrayExpression([
            types.callExpression(types.identifier('unknownBlock'), []),
        ])),
    ]));
    
    const [error] = tryCatch(printCss, ast);
    
    t.match(error.message, 'not supported yet');
    t.end();
});

test('happy-css: parseCss: error on unknown node', (t) => {
    const [error] = tryCatch(parseCss, '@unknown foo;');
    
    t.match(error.message, 'not supported yet');
    t.end();
});

test('happy-css: parseCss: error on unknown selector node', (t) => {
    const [error] = tryCatch(parseCss, '& {}');
    
    t.match(error.message, 'not supported yet');
    t.end();
});

test('happy-css: parseCss: error on unknown at-rule', (t) => {
    const [error] = tryCatch(parseCss, '@unknown foo;');
    
    t.match(error.message, '@unknown not supported yet');
    t.end();
});
