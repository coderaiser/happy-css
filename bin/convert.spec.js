import {test} from 'supertape';
import {montag} from 'montag';
import {convert} from './convert.js';

test('happy-css: bin: convert: css: rule', (t) => {
    const source = 'h1 { color: red; }';

    const result = convert(source);

    const expected = montag`
        h1 {
            color: red;
        }
    `;

    t.equal(result, expected);

    t.end();
});

test('happy-css: bin: convert: css: media', (t) => {
    const source = '@media (min-width: 100px) { h1 { color: red; } }';

    const result = convert(source);

    const expected = montag`
        @media (min-width: 100px) {
            h1 {
                color: red;
            }
        }
    `;

    t.equal(result, expected);

    t.end();
});

test('happy-css: bin: convert: css: keyframes', (t) => {
    const source = '@keyframes fade { from { opacity: 0; } to { opacity: 1; } }';

    const result = convert(source);

    const expected = montag`
        @keyframes fade {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    `;

    t.equal(result, expected);

    t.end();
});
