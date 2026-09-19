import {types} from '@putout/babel';

export function feature(path, {write, traverse}) {
    const [nameArg, valueArg, modifierArg] = path.get('arguments');

    write(`${nameArg.node.value}(`);
    traverse(valueArg);

    if (modifierArg)
        write(modifierArg.node.value);

    write(')');
}
