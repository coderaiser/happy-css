export const dedent = (a, prefixCount = 4) => {
    const result = [];
    const lines = a
        .split('\n')
        .slice(1, -1);
    
    const doublePrefix = prefixCount * 2;
    
    for (const line of lines) {
        result.push(line.slice(doublePrefix));
    }
    
    return result.join('\n');
};
