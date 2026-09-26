import {getNumber} from './get-number.js';

export function dimension(path, {write}) {
    const [num, unit] = path.get('arguments');
    
    write(`${getNumber(num)}${unit.node.value}`);
}
