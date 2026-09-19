import {types} from '@putout/babel';

export function declaration(path, {write, traverse}) {
    const [prop, value, options] = path.get('arguments');

    write(`    ${prop.node.value}: `);
    traverse(value);
    write(';\n');
}
