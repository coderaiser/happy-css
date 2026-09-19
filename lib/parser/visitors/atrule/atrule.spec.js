import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-css: parser: atrule: import', (t) => {
    t.transform('import');
    t.end();
});

test('happy-css: parser: atrule: import-url', (t) => {
    t.transform('import-url');
    t.end();
});

test('happy-css: parser: atrule: charset', (t) => {
    t.transform('charset');
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

test('happy-css: parser: atrule: font-face', (t) => {
    t.transform('font-face');
    t.end();
});