import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-mark: printer: paragraph', (t) => {
    t.noTransform('paragraph');
    t.end();
});

test('happy-mark: printer: paragraph-multiline', (t) => {
    t.noTransform('paragraph-multiline');
    t.end();
});

test('happy-mark: printer: paragraph-newline', (t) => {
    t.noTransform('paragraph-newline');
    t.end();
});
