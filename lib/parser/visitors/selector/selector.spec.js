import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-css: parser: selector: attribute', (t) => {
    t.transform('selector-attribute');
    t.end();
});

test('happy-css: parser: selector: pseudo-not', (t) => {
    t.transform('selector-pseudo-not');
    t.end();
});

test('happy-css: parser: selector: universal', (t) => {
    t.transform('selector-universal');
    t.end();
});
