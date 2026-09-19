import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-mark: parser: link-with-code', (t) => {
    t.transform('link-with-code');
    t.end();
});

test('happy-mark: parser: link-title', (t) => {
    t.transform('link-title');
    t.end();
});

test('happy-mark: parser: link: link-reference', (t) => {
    t.transform('link-reference');
    t.end();
});

test('happy-mark: parser: link', (t) => {
    t.transform('link');
    t.end();
});

test('happy-mark: parser: link-suffix', (t) => {
    t.transform('link-suffix');
    t.end();
});
