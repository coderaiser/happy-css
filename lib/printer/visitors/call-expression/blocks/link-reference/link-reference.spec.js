import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-mark: printer: link-reference', (t) => {
    t.noTransform('link-reference');
    t.end();
});
