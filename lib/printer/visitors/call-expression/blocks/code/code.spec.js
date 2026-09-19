import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-mark: printer: code', (t) => {
    t.noTransform('code');
    t.end();
});
