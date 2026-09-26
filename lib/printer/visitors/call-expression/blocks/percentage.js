import {getNumber} from './get-number.js';

export function percentage(path, {write}) {
    write(`${getNumber(path.get('arguments')[0])}%`);
}
