import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-style: parser: value: number-negative', (t) => {
    t.transform('number-negative');
    t.end();
});

test('happy-style: parser: value: number-positive', (t) => {
    t.transform('number-positive');
    t.end();
});

test('happy-style: parser: value: percentage-positive', (t) => {
    t.transform('percentage-positive');
    t.end();
});

test('happy-style: parser: value: percentage-negative', (t) => {
    t.transform('percentage-negative');
    t.end();
});

test('happy-style: parser: value: number-bare-negative', (t) => {
    t.transform('number-bare-negative');
    t.end();
});

test('happy-style: parser: value: function-calc', (t) => {
    t.transform('function-calc');
    t.end();
});

test('happy-style: parser: value: string', (t) => {
    t.transform('string');
    t.end();
});

test('happy-style: parser: value: string-function', (t) => {
    t.transform('string-function');
    t.end();
});

test('happy-style: parser: value: string-backslash', (t) => {
    t.transform('string-backslash');
    t.end();
});

test('happy-style: parser: value: url-quoted', (t) => {
    t.transform('url-quoted');
    t.end();
});

test('happy-style: parser: value: function-space', (t) => {
    t.transform('function-space');
    t.end();
});
