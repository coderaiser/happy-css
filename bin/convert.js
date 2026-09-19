import cssTree from 'css-tree';
import {parse} from '#parser';
import {print} from '#printer';

export function convert(source) {
    const ast = parse(source);

    return print(ast);
}
