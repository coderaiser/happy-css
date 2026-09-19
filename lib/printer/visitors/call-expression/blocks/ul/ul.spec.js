import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-mark: printer: blocks: ul', (t) => {
    t.transform('ul');
    t.end();
});
