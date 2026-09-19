export const linkReference = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const label = args.at(-1).node.value;
    
    write('[');
    
    for (const arg of args.slice(0, -1))
        traverse(arg);
    
    write(`][${label}]`);
};
