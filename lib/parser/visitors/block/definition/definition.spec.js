import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-mark: printer: visitors: block: definition', (t) => {
    t.transform('definition');
    t.end();
});
