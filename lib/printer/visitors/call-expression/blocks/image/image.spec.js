import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-mark: printer: image-newline-after', (t) => {
    t.noTransform('image-newline-after');
    t.end();
});

test('happy-mark: printer: image', (t) => {
    t.noTransform('image');
    t.end();
});

test('happy-mark: printer: image-no-alt', (t) => {
    t.noTransform('image-no-alt');
    t.end();
});

test('happy-mark: printer: image-title', (t) => {
    t.noTransform('image-title');
    t.end();
});
