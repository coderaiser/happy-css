import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-style: parser: all', (t) => {
    t.transform('all');
    t.end();
});
