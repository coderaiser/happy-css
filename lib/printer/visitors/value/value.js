import {types} from '@putout/babel';

export function value(path, {write, traverse}) {
    const elements = path.get('elements');

    for (const [i, el] of elements.entries()) {
        traverse(el);

        if (i < elements.length - 1)
            write(' ');
    }
}
