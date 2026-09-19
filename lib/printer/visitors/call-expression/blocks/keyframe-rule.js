const formatStop = (node) => {
    if (node.type === 'StringLiteral')
        return node.value;

    return `${node.value}%`;
};

export function keyframeRule(path, {write, traverse}) {
    const [stop, decls] = path.get('arguments');

    write(`    ${formatStop(stop.node)} {\n`);

    for (const decl of decls.get('elements'))
        traverse(decl);

    write('    }\n');
}
