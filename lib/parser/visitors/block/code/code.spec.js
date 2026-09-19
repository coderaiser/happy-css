import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-mark: parser: code-lang', (t) => {
    t.transform('code-lang');
    t.end();
});

test('happy-mark: parser: code-no-lang', (t) => {
    t.transform('code-no-lang');
    t.end();
});

test('happy-mark: parser: code-multiline', (t) => {
    t.transform('code-multiline');
    t.end();
});
