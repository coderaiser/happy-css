import {readFileSync} from 'node:fs';
import {test} from 'supertape';
import {montag} from 'montag';
import {parse} from '#parser';
import {print} from '#printer';

test('happy-css: roundtrip: basic', (t) => {
    const source = 'h1 { color: red; }';

    const ast = parse(source);
    const result = print(ast);

    const expected = 'h1 {\n    color: red;\n}\n';

    t.equal(result, expected);

    t.end();
});

test('happy-css: roundtrip: media', (t) => {
    const source = '@media (min-width: 100px) { h1 { color: red; } }';

    const ast = parse(source);
    const result = print(ast);

    const expected = '@media (min-width: 100px) {\n    h1 {\n        color: red;\n    }\n}\n';

    t.equal(result, expected);

    t.end();
});

test('happy-css: roundtrip: keyframes', (t) => {
    const source = '@keyframes fade { from { opacity: 0; } to { opacity: 1; } }';

    const ast = parse(source);
    const result = print(ast);

    const expected = '@keyframes fade {\n    from {\n        opacity: 0;\n    }\n    to {\n        opacity: 1;\n    }\n}\n';

    t.equal(result, expected);

    t.end();
});

test('happy-css: roundtrip: import', (t) => {
    const source = '@import url("x.css");';

    const ast = parse(source);
    const result = print(ast);

    const expected = '@import url("x.css");\n';

    t.equal(result, expected);

    t.end();
});

test('happy-css: roundtrip: font-face', (t) => {
    const source = '@font-face { font-family: "MyFont"; src: url("font.woff2"); }';

    const ast = parse(source);
    const result = print(ast);

    const expected = '@font-face {\n    font-family: "MyFont";\n    src: url("font.woff2");\n}\n';

    t.equal(result, expected);

    t.end();
});

test('happy-css: roundtrip: selector list', (t) => {
    const source = 'a, b { color: red; }';

    const ast = parse(source);
    const result = print(ast);

    const expected = 'a, b {\n    color: red;\n}\n';

    t.equal(result, expected);

    t.end();
});
