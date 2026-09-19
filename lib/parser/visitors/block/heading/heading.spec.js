import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-mark: parser: heading', (t) => {
    t.transform('heading');
    t.end();
});

test('happy-mark: parser: heading-h2', (t) => {
    t.transform('heading-h2');
    t.end();
});
