import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-mark: parser: image-reference', (t) => {
    t.transform('image-reference');
    t.end();
});

test('happy-mark: parser: image-reference-alt', (t) => {
    t.transform('image-reference-alt');
    t.end();
});
