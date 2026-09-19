import {types} from '@putout/babel';

export function comment(path, {write}) {
    const [text] = path.get('arguments');

    write(`/* ${text.node.value} */`);
}
