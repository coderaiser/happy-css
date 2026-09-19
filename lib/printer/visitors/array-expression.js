export const ArrayExpression = (path, {write, traverse}) => {
    const elements = path.get('elements');
    const n = elements.length - 1;
    
    for (const [i, el] of elements.entries()) {
        traverse(el);
        
        if (i < n)
            write('\n');
    }
};
