export function valueList(path, {write, traverse}) {
    const items = path.get('arguments')[0].get('elements');
    
    for (const [i, item] of items.entries()) {
        traverse(item);
        
        if (i < items.length - 1)
            write(' ');
    }
}
