import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-css: parser: rule', (t) => {
    t.transform('rule');

    t.end();
});

test('happy-css: parser: selector list', (t) => {
    t.transform('selector');

    t.end();
});

test('happy-css: parser: declaration', (t) => {
    t.transform('declaration');

    t.end();
});

test('happy-css: parser: atrule: media', (t) => {
    t.transform('media');

    t.end();
});

test('happy-css: parser: atrule: keyframes', (t) => {
    t.transform('keyframes');

    t.end();
});

test('happy-css: parser: atrule: import', (t) => {
    t.transform('import');

    t.end();
});

test('happy-css: parser: atrule: font-face', (t) => {
    t.transform('font-face');

    t.end();
});

test('happy-css: parser: comment', (t) => {
    t.transform('comment');

    t.end();
});
