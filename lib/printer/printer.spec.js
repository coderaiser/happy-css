import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-mark: printer: ul', (t) => {
    t.transform('ul');
    t.end();
});

test('happy-mark: printer: ol', (t) => {
    t.transform('ol');
    t.end();
});

test('happy-mark: printer: task-checked', (t) => {
    t.transform('task-checked');
    t.end();
});

test('happy-mark: printer: ul-task-unchecked', (t) => {
    t.transform('ul-task-unchecked');
    t.end();
});

test('happy-mark: printer: bold', (t) => {
    t.noTransform('bold');
    t.end();
});

test('happy-mark: printer: italic', (t) => {
    t.noTransform('italic');
    t.end();
});

test('happy-mark: printer: strikethrough', (t) => {
    t.noTransform('strikethrough');
    t.end();
});

test('happy-mark: printer: inline-code', (t) => {
    t.noTransform('inline-code');
    t.end();
});

test('happy-mark: printer: hr', (t) => {
    t.noTransform('hr');
    t.end();
});

test('happy-mark: printer: hard-break', (t) => {
    t.noTransform('hard-break');
    t.end();
});

test('happy-mark: printer: yaml', (t) => {
    t.noTransform('yaml');
    t.end();
});

test('happy-mark: printer: footnote', (t) => {
    t.transform('footnote');
    t.end();
});

test('happy-mark: printer: ul-nested', (t) => {
    t.transform('ul-nested');
    t.end();
});

test('happy-mark: printer: ol-nested', (t) => {
    t.transform('ol-nested');
    t.end();
});
