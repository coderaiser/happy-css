import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-mark: parser: table', (t) => {
    t.transform('table');
    t.end();
});

test('happy-mark: parser: table-align', (t) => {
    t.transform('table-align');
    t.end();
});
