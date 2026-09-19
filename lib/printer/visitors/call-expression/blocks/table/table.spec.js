import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-mark: printer: table', (t) => {
    t.noTransform('table');
    t.end();
});

test('happy-mark: printer: table-alignment', (t) => {
    t.transform('table-alignment');
    t.end();
});

test('happy-mark: printer: table-indent', (t) => {
    t.noTransform('table-indent');
    t.end();
});

test('happy-mark: printer: table-inline', (t) => {
    t.transform('table-inline');
    t.end();
});

test('happy-mark: printer: table-image', (t) => {
    t.noTransform('table-image');
    t.end();
});

test('happy-mark: printer: table-br', (t) => {
    t.transform('table-br');
    t.end();
});

test('happy-mark: printer: table-image-title', (t) => {
    t.noTransform('table-image-title');
    t.end();
});

test('happy-mark: printer: table-links', (t) => {
    t.noTransform('table-links');
    t.end();
});

test('happy-mark: printer: table-paragraph', (t) => {
    t.noTransform('table-paragraph');
    t.end();
});
