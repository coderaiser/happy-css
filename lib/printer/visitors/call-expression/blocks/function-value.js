const isOperator = (item) => item.node.callee?.name === 'operator';

export function functionValue(path, {write, traverse}) {
    const [name, argsArray, separatorNode] = path.get('arguments');
    const items = argsArray.get('elements');
    const separator = separatorNode?.node.value || ', ';
    
    write(`${name.node.value}(`);
    
    for (const [i, item] of items.entries()) {
        if (i > 0 && !isOperator(item) && !isOperator(items[i - 1]))
            write(separator);
        
        traverse(item);
    }
    
    write(')');
}
