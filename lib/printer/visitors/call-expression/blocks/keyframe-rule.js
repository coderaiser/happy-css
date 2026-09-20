export function keyframeRule(path, {write, traverse, indent}) {
    const [stop, decls] = path.get('arguments');
    
    indent();
    
    if (stop.node.type === 'StringLiteral') {
        write(`${stop.node.value} {\n`);
    } else {
        traverse(stop);
        write(' {\n');
    }
    
    indent.inc();
    
    for (const decl of decls.get('elements'))
        traverse(decl);
    
    indent.dec();
    indent();
    write('}\n');
}
