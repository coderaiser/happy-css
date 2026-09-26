import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-style: printer: rule', (t) => {
    t.transform('rule');
    t.end();
});

test('happy-style: printer: declaration', (t) => {
    t.transform('declaration');
    t.end();
});

test('happy-style: printer: declaration: declaration-no-important', (t) => {
    t.transform('declaration-no-important');
    t.end();
});

test('happy-style: printer: atrule: media', (t) => {
    t.transform('media');
    t.end();
});

test('happy-style: printer: atrule: keyframes', (t) => {
    t.transform('keyframes');
    t.end();
});

test('happy-style: printer: atrule: import', (t) => {
    t.transform('import');
    t.end();
});

test('happy-style: printer: atrule: font-face', (t) => {
    t.transform('font-face');
    t.end();
});

test('happy-style: printer: comment', (t) => {
    t.transform('comment');
    t.end();
});

test('happy-style: printer: import-url', (t) => {
    t.transform('import-url');
    t.end();
});

test('happy-style: printer: supports', (t) => {
    t.transform('supports');
    t.end();
});

test('happy-style: printer: layer', (t) => {
    t.transform('layer');
    t.end();
});

test('happy-style: printer: selector-list', (t) => {
    t.transform('selector-list');
    t.end();
});

test('happy-style: printer: attribute-selector', (t) => {
    t.transform('attribute-selector');
    t.end();
});

test('happy-style: printer: pseudo-class-arg', (t) => {
    t.transform('pseudo-class-arg');
    t.end();
});

test('happy-style: printer: charset', (t) => {
    t.transform('charset');
    t.end();
});

test('happy-style: printer: keyframe-percentage', (t) => {
    t.transform('keyframe-percentage');
    t.end();
});

test('happy-style: printer: id-selector', (t) => {
    t.transform('id-selector');
    t.end();
});

test('happy-style: printer: combinator', (t) => {
    t.transform('combinator');
    t.end();
});

test('happy-style: printer: pseudo-element', (t) => {
    t.transform('pseudo-element');
    t.end();
});

test('happy-style: printer: universal-selector', (t) => {
    t.transform('universal-selector');
    t.end();
});

test('happy-style: printer: color-value', (t) => {
    t.transform('color-value');
    t.end();
});

test('happy-style: printer: percentage-value', (t) => {
    t.transform('percentage-value');
    t.end();
});

test('happy-style: printer: multi-rule', (t) => {
    t.transform('multi-rule');
    t.end();
});

test('happy-style: printer: attribute-bare', (t) => {
    t.transform('attribute-bare');
    t.end();
});

test('happy-style: printer: pseudo-class', (t) => {
    t.transform('pseudo-class');
    t.end();
});

test('happy-style: printer: function-value', (t) => {
    t.transform('function-value');
    t.end();
});

test('happy-style: printer: raw', (t) => {
    t.transform('raw');
    t.end();
});

test('happy-style: printer: operator', (t) => {
    t.transform('operator');
    t.end();
});

test('happy-style: printer: nested-rule', (t) => {
    t.transform('nested-rule');
    t.end();
});

test('happy-style: printer: string', (t) => {
    t.transform('string');
    t.end();
});

test('happy-style: printer: string-escaped', (t) => {
    t.transform('string-escaped');
    t.end();
});

test('happy-style: printer: string-backslash', (t) => {
    t.transform('string-backslash');
    t.end();
});

test('happy-style: printer: url-quoted', (t) => {
    t.transform('url-quoted');
    t.end();
});

test('happy-style: printer: function-space', (t) => {
    t.transform('function-space');
    t.end();
});

test('happy-style: printer: negative-dimension', (t) => {
    t.transform('negative-dimension');
    t.end();
});
