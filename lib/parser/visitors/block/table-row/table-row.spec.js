import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-mark: parser: table-row', (t) => {
    t.transform('table-row');
    t.end();
});
