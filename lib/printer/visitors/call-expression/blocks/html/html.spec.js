import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-mark: printer: html', (t) => {
    t.transform('html');
    t.end();
});

test('happy-mark: printer: html-inline', (t) => {
    t.transform('html-inline');
    t.end();
});

test('happy-mark: printer: html-multiline', (t) => {
    t.transform('html-multiline');
    t.end();
});
