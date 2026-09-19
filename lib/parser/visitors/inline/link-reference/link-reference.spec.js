import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-mark: parser: link-reference', (t) => {
    t.transform('link-reference');
    t.end();
});
