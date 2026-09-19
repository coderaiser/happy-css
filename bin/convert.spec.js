import {test} from 'supertape';
import {montag} from 'montag';
import {__css_name, toJS} from '@putout/operator-json';
import {convert} from './convert.js';

test('happy-css: bin: convert: css -> js', (t) => {
    const source = montag`
        .button {
            color: red;
        }
    `;

    const expected = montag`
        [
            rule(selector([
                classSelector('button'),
            ]), [
                declaration('color', 'red'),
            ]),
        ];
    `;

    t.equal(convert(source), `${expected}\n`);

    t.end();
});

test('happy-css: bin: convert: js array -> css', (t) => {
    const source = montag`
        [
            rule(
                selector([classSelector('button')]),
                [declaration('color', 'red')],
            ),
        ];
    `;

    const expected = montag`
        .button {
            color: red;
        }
    `;

    t.equal(convert(source), `${expected}\n`);

    t.end();
});

test('happy-css: bin: convert: json -> css', (t) => {
    const source = toJS(montag`
        [
            rule(
                selector([classSelector('button')]),
                [declaration('color', 'red')],
            ),
        ];
    `, __css_name);

    const expected = montag`
        .button {
            color: red;
        }
    `;

    t.equal(convert(source), `${expected}\n`);

    t.end();
});

test('happy-css: bin: convert: json format -> css', (t) => {
    const source = toJS(montag`
        [
            rule(
                selector([classSelector('button')]),
                [declaration('color', 'red')],
            ),
        ];
    `, __css_name);

    const expected = montag`
        .button {
            color: red;
        }
    `;

    t.equal(convert(source), expected);

    t.end();
});