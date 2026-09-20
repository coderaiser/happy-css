import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-style: parser: selector: selector-attribute', (t) => {
    t.transform('selector-attribute');
    t.end();
});

test('happy-style: parser: selector: selector-pseudo-not', (t) => {
    t.transform('selector-pseudo-not');
    t.end();
});

test('happy-style: parser: selector: selector-universal', (t) => {
    t.transform('selector-universal');
    t.end();
});

test('happy-style: parser: selector: selector-id', (t) => {
    t.transform('selector-id');
    t.end();
});

test('happy-style: parser: selector: selector-combinator', (t) => {
    t.transform('selector-combinator');
    t.end();
});

test('happy-style: parser: selector: selector-pseudo-element', (t) => {
    t.transform('selector-pseudo-element');
    t.end();
});

test('happy-style: parser: selector: selector-attribute-bare', (t) => {
    t.transform('selector-attribute-bare');
    t.end();
});

test('happy-style: parser: selector: selector-pseudo-class', (t) => {
    t.transform('selector-pseudo-class');
    t.end();
});

test('happy-style: parser: selector: selector-list', (t) => {
    t.transform('selector-list');
    t.end();
});

test('happy-style: parser: selector: selector-attribute-unquoted', (t) => {
    t.transform('selector-attribute-unquoted');
    t.end();
});
