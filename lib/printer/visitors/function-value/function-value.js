import {types} from '@putout/babel';

export function functionValue(path, {write, traverse}) {
    const [nameArg, valueArg] = path.get('arguments');

    write(`${nameArg.node.value}(`);
    traverse(valueArg);
    write(')');
}
