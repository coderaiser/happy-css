export const createInlineBlock = (chars) => (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    write(chars);
    
    for (const arg of args)
        traverse(arg);
    
    write(chars);
};
