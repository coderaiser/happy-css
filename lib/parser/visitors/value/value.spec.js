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
