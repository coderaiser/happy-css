import {types} from '@putout/babel';

export function rule(path, {write, traverse}) {
    const [selectorArg, declarationsArg] = path.get('arguments');

    traverse(selectorArg);
    write(' {\n');

    for (const decl of declarationsArg.get('elements'))
        traverse(decl);

    write('}\n');
}
