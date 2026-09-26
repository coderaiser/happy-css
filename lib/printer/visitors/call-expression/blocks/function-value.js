const isOperator = (item) => item.node.callee?.name === 'operator';

export function functionValue(path, {write, traverse}) {
    const [name, argsArray] = path.get('arguments');
    const items = argsArray.get('elements');
    
    write(`${name.node.value}(`);
    
    for (const [i, item] of items.entries()) {
        if (i > 0 && !isOperator(item) && !isOperator(items[i - 1]))
            write(', ');
        
        traverse(item);
    }
    
    write(')');
}
