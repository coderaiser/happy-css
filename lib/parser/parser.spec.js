import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-css: parser: all', (t) => {
    t.transform('all');

    t.end();
});