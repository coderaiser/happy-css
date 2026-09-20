import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-css: parser: declaration: important', (t) => {
    t.transform('declaration-important');
    t.end();
});

test('happy-css: parser: declaration: function', (t) => {
    t.transform('declaration-function');
    t.end();
});

test('happy-css: parser: declaration: comment', (t) => {
    t.transform('declaration-comment');
    t.end();
});
