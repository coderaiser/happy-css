import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-css: printer: rule', (t) => {
    t.transform('rule');

    t.end();
});

test('happy-css: printer: declaration', (t) => {
    t.transform('declaration');

    t.end();
});

test('happy-css: printer: declaration: no-important', (t) => {
    t.transform('declaration-no-important');

    t.end();
});

test('happy-css: printer: atrule: media', (t) => {
    t.transform('media');

    t.end();
});

test('happy-css: printer: atrule: keyframes', (t) => {
    t.transform('keyframes');

    t.end();
});

test('happy-css: printer: atrule: import', (t) => {
    t.transform('import');

    t.end();
});

test('happy-css: printer: atrule: font-face', (t) => {
    t.transform('font-face');

    t.end();
});

test('happy-css: printer: comment', (t) => {
    t.transform('comment');

    t.end();
});

test('happy-css: printer: import-url', (t) => {
    t.transform('import-url');
    t.end();
});

test('happy-css: printer: supports', (t) => {
    t.transform('supports');
    t.end();
});

test('happy-css: printer: layer', (t) => {
    t.transform('layer');
    t.end();
});

test('happy-css: printer: selector-list', (t) => {
    t.transform('selector-list');
    t.end();
});

test('happy-css: printer: attribute-selector', (t) => {
    t.transform('attribute-selector');
    t.end();
});

test('happy-css: printer: pseudo-class-arg', (t) => {
    t.transform('pseudo-class-arg');
    t.end();
});

test('happy-css: printer: charset', (t) => {
    t.transform('charset');
    t.end();
});

test('happy-css: printer: keyframe-percentage', (t) => {
    t.transform('keyframe-percentage');
    t.end();
});

test('happy-css: printer: id-selector', (t) => {
    t.transform('id-selector');
    t.end();
});

test('happy-css: printer: combinator', (t) => {
    t.transform('combinator');
    t.end();
});

test('happy-css: printer: pseudo-element', (t) => {
    t.transform('pseudo-element');
    t.end();
});

test('happy-css: printer: universal-selector', (t) => {
    t.transform('universal-selector');
    t.end();
});

test('happy-css: printer: color-value', (t) => {
    t.transform('color-value');
    t.end();
});

test('happy-css: printer: percentage-value', (t) => {
    t.transform('percentage-value');
    t.end();
});

test('happy-css: printer: multi-rule', (t) => {
    t.transform('multi-rule');
    t.end();
});

test('happy-css: printer: attribute-bare', (t) => {
    t.transform('attribute-bare');
    t.end();
});

test('happy-css: printer: pseudo-class', (t) => {
    t.transform('pseudo-class');
    t.end();
});

test('happy-css: printer: function-value', (t) => {
    t.transform('function-value');
    t.end();
});
