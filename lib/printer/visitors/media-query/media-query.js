import {types} from '@putout/babel';

export function mediaQuery(path, {write, traverse}) {
    const elements = path.get('arguments');

    for (const [i, el] of elements.entries()) {
        traverse(el);

        if (i < elements.length - 1)
            write(' ');
    }
}
