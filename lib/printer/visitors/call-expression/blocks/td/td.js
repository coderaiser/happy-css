export const td = (path, {traverse}) => {
    const args = path.get('arguments');
    
    for (const arg of args)
        traverse(arg);
};
