import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-mark: parser: emphasis', (t) => {
    t.transform('emphasis');
    t.end();
});

test('happy-mark: parser: delete', (t) => {
    t.transform('delete');
    t.end();
});

test('happy-mark: parser: hr', (t) => {
    t.transform('hr');
    t.end();
});

test('happy-mark: parser: ul', (t) => {
    t.transform('ul');
    t.end();
});

test('happy-mark: parser: ol', (t) => {
    t.transform('ol');
    t.end();
});

test('happy-mark: parser: badges', (t) => {
    t.transform('badges');
    t.end();
});

test('happy-mark: parser: ul-task-checked', (t) => {
    t.transform('ul-task-checked');
    t.end();
});

test('happy-mark: parser: ul-task-unchecked', (t) => {
    t.transform('ul-task-unchecked');
    t.end();
});

test('happy-mark: parser: br', (t) => {
    t.transform('br');
    t.end();
});

test('happy-mark: parser: footnote', (t) => {
    t.transform('footnote');
    t.end();
});
