import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-mark: printer: image-reference', (t) => {
    t.noTransform('image-reference');
    t.end();
});
