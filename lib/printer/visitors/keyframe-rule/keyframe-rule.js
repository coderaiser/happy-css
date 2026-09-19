import {types} from '@putout/babel';

export function keyframeRule(path, {write, traverse}) {
    const [nameArg, declarationsArg] = path.get('arguments');

    const name = nameArg.node.value;
    const declarations = declarationsArg.get('elements');

    write(`${name} {\n`);

    for (const decl of declarations)
        traverse(decl);

    write('}\n');
}
