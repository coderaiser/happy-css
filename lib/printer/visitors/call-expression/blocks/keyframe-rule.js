const formatStop = (node) => {
    if (node.type === 'StringLiteral')
        return node.value;

    return `${node.value}%`;
};

export function keyframeRule(path, {write, traverse, indent}) {
    const [stop, decls] = path.get('arguments');

    indent();
    write(`${formatStop(stop.node)} {\n`);
    indent.inc();

    for (const decl of decls.get('elements'))
        traverse(decl);

    indent.dec();
    indent();
    write('}\n');
}
