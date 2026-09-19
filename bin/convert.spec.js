import {test} from 'supertape';
import {montag} from 'montag';
import {
    __markdown_name,
    toJS,
} from '@putout/operator-json';
import {convert} from './convert.js';

test('happy-mark: bin: convert: js: [', (t) => {
    const result = convert(`[heading(1, 'hello')]`);
    const expected = montag`
        # hello\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('happy-mark: bin: convert: js: __putout_processor_markdown', (t) => {
    const js = toJS(`[heading(1, 'hello')]`, __markdown_name);
    
    const result = convert(js);
    const expected = montag`
        # hello\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('happy-mark: bin: convert: markdown: __putout_processor_markdown', (t) => {
    const source = montag`
        # hello\n
    `;
    
    const result = convert(source);
    
    const expected = montag`
        [
            heading(1, 'hello'),
        ];\n
    `;
    
    t.equal(result, expected);
    t.end();
});
