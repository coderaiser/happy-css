import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-mark: parser: list-item', (t) => {
    t.transform('list-item');
    t.end();
});

test('happy-mark: parser: list-item-nested', (t) => {
    t.transform('list-item-nested');
    t.end();
});
