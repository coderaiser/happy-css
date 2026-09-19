export const definition = (path, {write}) => {
    const args = path.get('arguments');
    const label = args[0].node.value;
    const url = args[1].node.value;
    const title = args.length >= 3 ? args[2].node.value : '';
    
    if (title) {
        write(`[${label}]: ${url} "${title}"`);
        return;
    }
    
    write(`[${label}]: ${url}`);
};
