import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-mark: parser: inline-code', (t) => {
    t.transform('inline-code');
    t.end();
});

test('happy-mark: parser: inline-code-nested', (t) => {
    t.transform('inline-code-nested');
    t.end();
});

test('happy-mark: parser: inline-code-multiline', (t) => {
    t.transform('inline-code-multiline');
    t.end();
});
