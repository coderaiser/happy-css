import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-style: parser: rule', (t) => {
    t.transform('rule');
    t.end();
});

test('happy-style: parser: rule: rule-comment', (t) => {
    t.transform('rule-comment');
    t.end();
});
