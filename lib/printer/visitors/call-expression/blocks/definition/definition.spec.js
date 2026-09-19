import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-mark: printer: definition', (t) => {
    t.noTransform('definition');
    t.end();
});
