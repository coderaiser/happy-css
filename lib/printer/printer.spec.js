import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-css: printer: rule', (t) => {
    t.transform('rule');

    t.end();
});

test('happy-css: printer: declaration', (t) => {
    t.transform('declaration');

    t.end();
});

test('happy-css: printer: atrule: media', (t) => {
    t.transform('media');

    t.end();
});

test('happy-css: printer: atrule: keyframes', (t) => {
    t.transform('keyframes');

    t.end();
});

test('happy-css: printer: atrule: import', (t) => {
    t.transform('import');

    t.end();
});

test('happy-css: printer: atrule: font-face', (t) => {
    t.transform('font-face');

    t.end();
});

test('happy-css: printer: comment', (t) => {
    t.transform('comment');

    t.end();
});
