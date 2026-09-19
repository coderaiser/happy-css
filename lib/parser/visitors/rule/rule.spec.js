import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-css: parser: rule', (t) => {
    t.transform('rule');
    t.end();
});
