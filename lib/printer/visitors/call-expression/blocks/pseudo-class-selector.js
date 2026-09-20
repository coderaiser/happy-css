export function pseudoClassSelector(path, {write, traverse}) {
    const args = path.get('arguments');
    const [name] = args;
    
    write(`:${name.node.value}`);
    
    if (args.length > 1) {
        write('(');
        traverse(args[1]);
        write(')');
    }
}
