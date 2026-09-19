import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-css: parser: declaration: important', (t) => {
    t.transform('declaration-important');
    t.end();
});
