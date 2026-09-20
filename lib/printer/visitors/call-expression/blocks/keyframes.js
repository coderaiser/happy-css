export function keyframes(path, {write, traverse, indent}) {
    const [name, stops] = path.get('arguments');
    
    write(`@keyframes ${name.node.value} {\n`);
    indent.inc();
    
    for (const stop of stops.get('elements'))
        traverse(stop);
    
    indent.dec();
    write('}\n');
}
