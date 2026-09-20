export function functionValue(path, {write, traverse}) {
    const [name, argsArray] = path.get('arguments');
    const items = argsArray.get('elements');
    
    write(`${name.node.value}(`);
    
    for (const [i, item] of items.entries()) {
        traverse(item);
        
        if (i < items.length - 1)
            write(', ');
    }
    
    write(')');
}
