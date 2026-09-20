import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-style: parser: atrule: import', (t) => {
    t.transform('import');
    t.end();
});

test('happy-style: parser: atrule: import-url', (t) => {
    t.transform('import-url');
    t.end();
});

test('happy-style: parser: atrule: charset', (t) => {
    t.transform('charset');
    t.end();
});

test('happy-style: parser: atrule: media', (t) => {
    t.transform('media');
    t.end();
});

test('happy-style: parser: atrule: keyframes', (t) => {
    t.transform('keyframes');
    t.end();
});

test('happy-style: parser: atrule: font-face', (t) => {
    t.transform('font-face');
    t.end();
});

test('happy-style: parser: atrule: supports', (t) => {
    t.transform('supports');
    t.end();
});

test('happy-style: parser: atrule: layer', (t) => {
    t.transform('layer');
    t.end();
});

test('happy-style: parser: atrule: keyframes-percentage', (t) => {
    t.transform('keyframes-percentage');
    t.end();
});

test('happy-style: parser: atrule: keyframes-string-name', (t) => {
    t.transform('keyframes-string-name');
    t.end();
});

test('happy-style: parser: atrule: font-face-unicode-range', (t) => {
    t.transform('font-face-unicode-range');
    t.end();
});

test('happy-style: parser: atrule: import-comment', (t) => {
    t.transform('import-comment');
    t.end();
});

test('happy-style: parser: atrule: import-raw', (t) => {
    t.transform('import-raw');
    t.end();
});
